import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

import FitImage from 'react-native-fit-image';
import { markdownStyles } from './style';
import AstRenderer from './AstRenderer';

const defaultRenderFunctions = {
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parents, styles) => {
    return (
      <View key={AstRenderer.getUniqueID()}>
        {children}
      </View>
    );
  },

  // `root` is a special case.
  root: (children, styles) =>
    <View key={AstRenderer.getUniqueID()} style={[markdownStyles.view, styles.view]}>
      {children}
    </View>,
  text: (node, children, parents, styles) => {
    return (
      <Text key={AstRenderer.getUniqueID()} style={[markdownStyles.text, styles.text]}>
        {node.content}
      </Text>
    );
  },
  span: (node, children, parents, styles) =>
    <Text key={AstRenderer.getUniqueID()} style={[markdownStyles.span, styles.span]}>
      {children}
    </Text>,

  strong: (node, children, parents, styles) => {
    return (
      <Text key={AstRenderer.getUniqueID()} style={[markdownStyles.strong, styles.strong]}>
        {children}
      </Text>
    );
  },

  s: (node, children, parents, styles) => {
    return (
      <Text style={[markdownStyles.strikethrough, styles.strikethrough]}>
        {children}
      </Text>
    );
  },
  a: (node, children, parents, styles) => {
    return (
      <Text style={[markdownStyles.a, styles.a]} onPress={() => AstRenderer.openUrl(node.attributes.href)}>
        {children}
      </Text>
    );
  },
  em: (node, children, parents, styles) => {
    return (
      <Text key={AstRenderer.getUniqueID()} style={[markdownStyles.em, styles.em]}>
        {children}
      </Text>
    );
  },

  h1: (node, children, parents, styles) =>
    <Text
      key={AstRenderer.getUniqueID()}
      style={[markdownStyles.heading, styles.heading, markdownStyles.heading1, styles.heading1]}>
      {children}
    </Text>,
  h2: (node, children, parents, styles) =>
    <Text
      key={AstRenderer.getUniqueID()}
      style={[markdownStyles.heading, styles.heading, markdownStyles.heading2, styles.heading2]}
    >
      {children}
    </Text>,
  h3: (node, children, parents, styles) =>
    <Text
      key={AstRenderer.getUniqueID()}
      style={[markdownStyles.heading, styles.heading, markdownStyles.heading3, styles.heading3]}
    >
      {children}
    </Text>,
  h4: (node, children, parents, styles) =>
    <Text
      key={AstRenderer.getUniqueID()}
      style={[markdownStyles.heading, styles.heading, markdownStyles.heading4, styles.heading4]}
    >
      {children}
    </Text>,
  h5: (node, children, parents, styles) =>
    <Text
      key={AstRenderer.getUniqueID()}
      style={[markdownStyles.heading, styles.heading, markdownStyles.heading5, styles.heading5]}>
      {children}
    </Text>,
  h6: (node, children, parents, styles) =>
    <Text
      key={AstRenderer.getUniqueID()}
      style={[markdownStyles.heading, styles.heading, markdownStyles.heading6, styles.heading6]}
    >
      {children}
    </Text>,

  p: (node, children, parents, styles) =>
    <View key={AstRenderer.getUniqueID()} style={[markdownStyles.paragraph, styles.paragraph]}>
      {children}
    </View>,

  blockquote: (node, children, parents, styles) =>
    <View key={AstRenderer.getUniqueID()} style={[markdownStyles.blockquote, styles.blockquote]}>
      {children}
    </View>,
  code: (node, children, parents, styles) =>
    <View key={AstRenderer.getUniqueID()} style={[markdownStyles.code, styles.code]}>
      {children}
    </View>,
  pre: (node, children, parents, styles) =>
    <View key={AstRenderer.getUniqueID()} style={[markdownStyles.pre, styles.pre]}>
      {children}
    </View>,
  ul: (node, children, parents, styles) => {
    return (
      <View
        key={AstRenderer.getUniqueID()}
        style={[markdownStyles.list, styles.list, markdownStyles.listUnordered, styles.listUnordered]}
      >
        {children}
      </View>
    );
  },
  ol: (node, children, parents, styles) => {
    return (
      <View
        key={AstRenderer.getUniqueID()}
        style={[markdownStyles.list, styles.list, markdownStyles.listOrdered, styles.listOrdered]}
      >
        {children}
      </View>
    );
  },
  li: (node, children, parents, styles) => {
    if (AstRenderer.hasParents(parents, 'ul')) {
      return (
        <View key={AstRenderer.getUniqueID()} style={[markdownStyles.listUnorderedItem, styles.listUnorderedItem]}>
          <Text style={[markdownStyles.listUnorderedDot, styles.listUnorderedDot]}>
            {'\u00B7'}
          </Text>
          <View style={[markdownStyles.listItem, styles.listItem]}>
            {children}
          </View>
        </View>
      );
    }

    if (AstRenderer.hasParents(parents, 'ol')) {
      return (
        <View key={AstRenderer.getUniqueID()} style={[markdownStyles.listOrderedItem, styles.listOrderedItem]}>
          <Text style={[markdownStyles.listOrderedIndex, styles.listOrderedIndex]}>
            {node.index + 1}
          </Text>
          <View style={[markdownStyles.listItem, styles.listItem]}>
            {children}
          </View>
        </View>
      );
    }

    return (
      <View key={AstRenderer.getUniqueID()} style={[markdownStyles.listItem, styles.listItem]}>
        {children}
      </View>
    );
  },
  table: (node, children, parents, styles) =>
    <View key={AstRenderer.getUniqueID()} style={[markdownStyles.table, styles.table]}>
      {children}
    </View>,
  thead: (node, children, parents, styles) =>
    <View key={AstRenderer.getUniqueID()} style={[markdownStyles.tableHeader, styles.tableHeader]}>
      {children}
    </View>,
  tbody: (node, children, parents, styles) =>
    <View key={AstRenderer.getUniqueID()} style={[markdownStyles.tableBody, styles.tableBody]}>
      {children}
    </View>,
  th: (node, children, parents, styles) => {
    return (
      <View key={AstRenderer.getUniqueID()} style={[markdownStyles.tableHeaderCell, styles.tableHeaderCell]}>
        {children}
      </View>
    );
  },
  tr: (node, children, parents, styles) => {
    return (
      <View key={AstRenderer.getUniqueID()} style={[markdownStyles.tableRow, styles.tableRow]}>
        {children}
      </View>
    );
  },
  td: (node, children, parents, styles) => {
    return (
      <View key={AstRenderer.getUniqueID()} style={[markdownStyles.tableRowCell, styles.tableRowCell]}>
        {children}
      </View>
    );
  },
  hr: (node, children, parents, styles) => {
    return <View key={AstRenderer.getUniqueID()} style={[markdownStyles.hr, styles.hr]} />;
  },
  br: (node, children, parents, styles) =>
    <Text key={AstRenderer.getUniqueID()}  style={[markdownStyles.br, styles.br]} >
      {'\n'}
    </Text>,
  img: (node, children, parents, styles) => {
    return <FitImage key={AstRenderer.getUniqueID()} source={{ uri: node.attributes.src }} />;
  },
};

export default defaultRenderFunctions;
