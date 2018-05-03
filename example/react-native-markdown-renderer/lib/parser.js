import React from 'react';
import { View } from 'react-native';
import tokensToAST from './util/tokensToAST';
import { stringToTokens } from './util/stringToTokens';
import { cleanupTokens } from './util/cleanupTokens';
import groupTextTokens from './util/groupTextTokens';

/**
 *
 * @param {string} source
 * @param {function} [renderer]
 * @param {AstRenderer} [markdownIt]
 * @return {View}
 */
export function parser(source, renderer, markdownIt) {

  let tokens = stringToTokens(source, markdownIt);
  tokens = cleanupTokens(tokens);

  // console.log(JSON.stringify(tokens));
  tokens = groupTextTokens(tokens);

  const astTree = tokensToAST(tokens);
  console.log(astTree);

  return renderer(astTree);
}
