import React from 'react';
import { View } from 'react-native';
import MarkdownIt from 'markdown-it';
import tokensToAST from './util/tokensToAST';
import removeInlineTokens from './util/removeInlineTokens';
import groupTextTokens from './util/groupTextTokens';

let md = MarkdownIt();

export function stringToTokens(source, markdownIt = md) {
  let result = [];
  try {
    result = md.parse(source, {});
  } catch (err) {}
  return result;
}

/**
 *
 * @param {string} source
 * @param {AstRenderer} [renderer]
 * @param {AstRenderer} [markdownIt]
 * @return {View}
 */
export function parser(source, renderer, markdownIt = md) {
  const tokens = groupTextTokens(removeInlineTokens(stringToTokens(source, markdownIt)));
  const asttree = tokensToAST(tokens);

  return <View>{renderer.render(asttree)}</View>;
}
