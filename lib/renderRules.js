import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

import FitImage from 'react-native-fit-image';
import getUniqueID from './util/getUniqueID';
import openUrl from './util/openUrl';
import hasParents from './util/hasParents';
import getIsTextType from './util/getIsTextType';

const renderRules = {
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parent, styles) => {
    return (
      <View key={node.key}>
        <Text>unknown {node.type}</Text> {children}
      </View>
    );
  },

  // `root` is a special case.
  root: children =>
    <View key={getUniqueID()}>
      {children}
    </View>,

  textgroup: (node, children, parent, styles) => {
    return <Text key={node.key}>{children}</Text>;
  },
  inline: (node, children, parent, styles) => {
    return <Text key={node.key}>{children}</Text>;
  },

  text: (node, children, parent, styles) => {
    const length = parent.length;
    if (length > 0 && getIsTextType(parent[length - 1].type)) {
      return (
        <Text key={node.key}>
          {node.content}
        </Text>
      );
    }

    return (
      <Text key={node.key} style={styles.text}>
        {node.content}
      </Text>
    );
  },
  span: (node, children, parent, styles) => {
    return (
      <Text key={node.key}>
        {children}
      </Text>
    );
  },

  strong: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.strong}>
        {children}
      </Text>
    );
  },

  s: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.strikethrough}>
        {children}
      </Text>
    );
  },
  a: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.a} onPress={() => openUrl(node.attributes.href)}>
        {children}
      </Text>
    );
  },
  em: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.em}>
        {children}
      </Text>
    );
  },

  h1: (node, children, parent, styles) =>
    <Text key={node.key} style={[styles.heading, styles.heading1]}>
      {children}
    </Text>,
  h2: (node, children, parent, styles) =>
    <Text key={node.key} style={[styles.heading, styles.heading2]}>
      {children}
    </Text>,
  h3: (node, children, parent, styles) =>
    <Text key={node.key} style={[styles.heading, styles.heading3]}>
      {children}
    </Text>,
  h4: (node, children, parent, styles) =>
    <Text key={node.key} style={[styles.heading, styles.heading4]}>
      {children}
    </Text>,
  h5: (node, children, parent, styles) =>
    <Text key={node.key} style={[styles.heading, styles.heading5]}>
      {children}
    </Text>,
  h6: (node, children, parent, styles) =>
    <Text key={node.key} style={[styles.heading, styles.heading6]}>
      {children}
    </Text>,

  p: (node, children, parent, styles) =>
    <View key={node.key} style={styles.paragraph}>
      {children}
    </View>,

  blockquote: (node, children, parent, styles) =>
    <View key={node.key} style={styles.blockquote}>
      {children}
    </View>,
  code: (node, children, parent, styles) => {
    switch (node.sourceType) {
      case 'code_inline': {
        return (
          <Text key={node.key} style={styles.codeInline}>
            {node.content}
          </Text>
        );
        break;
      }
      case 'code_block': {
        return (
          <Text key={node.key} style={styles.codeBlock}>
            {node.content}
          </Text>
        );
        break;
      }
      case 'fence': {
        return (
          <Text key={node.key} style={styles.codeBlock}>
            {node.content}
          </Text>
        );
        break;
      }
    }

    return (
      <View key={node.key} style={styles.codeInline}>
        {children}
      </View>
    );
  },
  pre: (node, children, parent, styles) =>
    <View key={node.key} style={styles.pre}>
      {children}
    </View>,
  ul: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={[styles.list, styles.listUnordered]}>
        {children}
      </View>
    );
  },
  ol: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={[styles.list, styles.listOrdered]}>
        {children}
      </View>
    );
  },
  li: (node, children, parent, styles) => {
    if (hasParents(parent, 'ul')) {
      return (
        <View key={node.key} style={styles.listUnorderedItem}>
          <Text style={styles.listUnorderedItemIcon}>
            {'\u00B7'}
          </Text>
          <View style={[styles.listItem]}>
            {children}
          </View>
        </View>
      );
    }

    if (hasParents(parent, 'ol')) {
      return (
        <View key={node.key} style={styles.listOrderedItem}>
          <Text style={styles.listOrderedItemIcon}>
            {node.index + 1}
          </Text>
          <View style={[styles.listItem]}>
            {children}
          </View>
        </View>
      );
    }

    return (
      <View key={node.key} style={[styles.listItem]}>
        {children}
      </View>
    );
  },
  table: (node, children, parent, styles) =>
    <View key={node.key} style={[styles.table]}>
      {children}
    </View>,
  thead: (node, children, parent, styles) =>
    <View key={node.key} style={[styles.tableHeader]}>
      {children}
    </View>,
  tbody: (node, children, parent, styles) =>
    <View key={node.key}>
      {children}
    </View>,
  th: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={[styles.tableHeaderCell]}>
        {children}
      </View>
    );
  },
  tr: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={[styles.tableRow]}>
        {children}
      </View>
    );
  },
  td: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={[styles.tableRowCell]}>
        {children}
      </View>
    );
  },
  hr: (node, children, parent, styles) => {
    return <View key={node.key} style={[styles.hr]} />;
  },
  br: (node, children, parent, styles) =>
    <Text key={node.key}>
      {'\n'}
    </Text>,
  img: (node, children, parent, styles) => {
    return <FitImage key={node.key} source={{ uri: node.attributes.src }} />;
  },
};

export default renderRules;
