import React from 'react';
import { View } from 'react-native';
import tokensToAST from './util/tokensToAST';
import removeInlineTokens from './util/removeInlineTokens';
import groupTextTokens from './util/groupTextTokens';

export function stringToTokens(source, markdownIt) {
  let result = [];
  try {
    result = markdownIt.parse(source, {});
  } catch (err) {
    console.warn(err);
  }

  return result;
}

/**
 *
 * @param {string} source
 * @param {function} [renderer]
 * @param {AstRenderer} [markdownIt]
 * @return {View}
 */
export function parser(source, renderer, markdownIt) {
  const tokens = groupTextTokens(removeInlineTokens(stringToTokens(source, markdownIt)));
  const asttree = tokensToAST(tokens);

  return renderer(asttree);
}
