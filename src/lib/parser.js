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

  tokens = tokens.reduce((acc, curr) => {
    if (curr.children && curr.children.length > 0) {
      console.log(curr);
      // acc.push({
      //   ...curr,
      //   children: null,
      //   nesting: 1,
      // });

      while (curr.children.length) {
        acc.push(curr.children.shift());
      }

      // acc.push({
      //   ...curr,
      //   children: null,
      //   nesting: -1,
      // });
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);

  console.log(tokens);

  tokens = cleanupTokens(tokens);
  tokens = groupTextTokens(tokens);

  const astTree = tokensToAST(tokens);

  return renderer(astTree);
}
