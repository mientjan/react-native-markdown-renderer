import React from "react";
import { View } from "react-native";
import tokensToAST from "./util/tokensToAST";
import removeInlineTokens from "./util/removeInlineTokens";
import groupTextTokens from "./util/groupTextTokens";
import getTokenTypeByToken from "./util/getTokenTypeByToken";

export function stringToTokens(source, markdownIt) {
  let result = [];
  try {
    result = markdownIt.parse(source, {});
  } catch (err) {
    console.warn(err);
  }

  result.forEach(token => (token.type = getTokenTypeByToken(token)));

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
  const tokens = groupTextTokens(
    removeInlineTokens(stringToTokens(source, markdownIt))
  );
  const asttree = tokensToAST(tokens);

  return renderer(asttree);
}
