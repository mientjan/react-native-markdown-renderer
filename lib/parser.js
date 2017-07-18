import React from 'react';
import { View } from 'react-native';

import MarkdownIt from 'markdown-it';
import tokensToAST from './tokensToAST';

let md = MarkdownIt();

export function markdownToTokens(source) {
  let result = [];
  try {
    result = md.parse(source, {});
  } catch (err) {}
  return result;
}

/**
 *
 * @param source
 * @param {AstRenderer} [renderer]
 * @returns {View}
 */
export function parser(source, renderer, converter = markdownToTokens) {

  const tokens = converter(source);
  const asttree = tokensToAST(tokens);

  return <View>{renderer.render(asttree)}</View>;
}
