import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import MarkdownIt from 'markdown-it';
import tokenToAST from './tokenToAST';
import { AstRenderer } from './AstRenderer';

let md = MarkdownIt();

function convertToTokens(source) {
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
export default function markdownParser(source, renderer) {

  const tokens = convertToTokens(source);
  const asttree = tokenToAST(tokens);

  return <View>{renderer.render(asttree)}</View>;
}
