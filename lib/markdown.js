import React from 'react';
import { Linking, Text, View } from 'react-native';
import FitImage from 'react-native-fit-image';

import MarkdownIt from 'markdown-it';

import { markdownStyles } from './markdown/style';
import tokenToAST from './markdown/tokenToAST';
import { AstRenderer } from './markdown/AstGenerator';
import markdownItBlockPlugin from './markdown/markdownItBlockPlugin';


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
 * @returns {XML}
 */
export default function markdown(source, renderer = reactRenderer) {
  const tokens = convertToTokens(source);
  const asttree = tokenToAST(tokens);

  return <View>{renderer.render(asttree)}</View>;
}
