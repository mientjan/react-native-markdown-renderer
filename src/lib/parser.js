import React from "react";
import { View } from "react-native";
import tokensToAST from "./util/tokensToAST";
import { stringToTokens } from "./util/stringToTokens";
import { cleanupTokens } from "./util/cleanupTokens";

/**
 *
 * @param {string} source
 * @param {function} [renderer]
 * @param {AstRenderer} [markdownIt]
 * @return {View}
 */
export function parser(source, renderer, markdownIt) {
  return renderer(
    tokensToAST(cleanupTokens(stringToTokens(source, markdownIt)))
  );
}
