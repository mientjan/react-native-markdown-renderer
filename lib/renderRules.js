import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

import FitImage from 'react-native-fit-image';
import AstRenderer from './AstRenderer';
import getUniqueID from "./util/getUniqueID";
import openUrl from "./util/openUrl";
import hasParents from "./util/hasParents";

const renderRules = {
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parent, styles) => {
    return (
      <View key={getUniqueID()}>
        <Text>Unknown Node: {node.type}</Text> {children}
      </View>
    );
  },

  // `root` is a special case.
  root: children =>
    <View key={getUniqueID()}>
      {children}
    </View>,

  textgroup: (node, children, parent, styles) => {
    return <Text key={getUniqueID()}>{children}</Text>;
  },
  inline: (node, children, parent, styles) => {
    return <Text key={getUniqueID()}>{children}</Text>;
  },

  text: (node, children, parent, styles) => {
    return (
      <Text key={getUniqueID()} style={styles.text}>
        {node.content}
      </Text>
    );
  },
  span: (node, children, parent, styles) => {
      return (
          <Text key={getUniqueID()}>
		      {children}
          </Text>
      )
  },

  strong: (node, children, parent, styles) => {
    return (
      <Text key={getUniqueID()} style={styles.strong}>
        {children}
      </Text>
    );
  },

  s: (node, children, parent, styles) => {
    return (
      <Text key={getUniqueID()} style={styles.strikethrough}>
        {children}
      </Text>
    );
  },
  a: (node, children, parent, styles) => {
    return (
      <Text
        key={getUniqueID()}
        style={styles.a}
        onPress={() => openUrl(node.attributes.href)}
      >
        {children}
      </Text>
    );
  },
  em: (node, children, parent, styles) => {
    return (
      <Text key={getUniqueID()} style={styles.em}>
        {children}
      </Text>
    );
  },

  h1: (node, children, parent, styles) =>
    <Text key={getUniqueID()} style={[styles.heading, styles.heading1]}>
      {children}
    </Text>,
  h2: (node, children, parent, styles) =>
    <Text key={getUniqueID()} style={[styles.heading, styles.heading2]}>
      {children}
    </Text>,
  h3: (node, children, parent, styles) =>
    <Text key={getUniqueID()} style={[styles.heading, styles.heading3]}>
      {children}
    </Text>,
  h4: (node, children, parent, styles) =>
    <Text key={getUniqueID()} style={[styles.heading, styles.heading4]}>
      {children}
    </Text>,
  h5: (node, children, parent, styles) =>
    <Text key={getUniqueID()} style={[styles.heading, styles.heading5]}>
      {children}
    </Text>,
  h6: (node, children, parent, styles) =>
    <Text key={getUniqueID()} style={[styles.heading, styles.heading6]}>
      {children}
    </Text>,

  p: (node, children, parent, styles) =>
    <View key={getUniqueID()} style={styles.paragraph}>
      {children}
    </View>,

  blockquote: (node, children, parent, styles) =>
    <View key={getUniqueID()} style={styles.blockquote}>
      {children}
    </View>,
  code: (node, children, parent, styles) =>
    <View key={getUniqueID()} style={styles.code}>
      {children}
    </View>,
  pre: (node, children, parent, styles) =>
    <View key={getUniqueID()} style={styles.pre}>
      {children}
    </View>,
  ul: (node, children, parent, styles) => {
    return (
      <View
        key={getUniqueID()}
        style={[styles.list, styles.listUnordered]}
      >
        {children}
      </View>
    );
  },
  ol: (node, children, parent, styles) => {
    return (
      <View
        key={getUniqueID()}
        style={[styles.list, styles.listOrdered]}
      >
        {children}
      </View>
    );
  },
  li: (node, children, parent, styles) => {
    if (hasParents(parent, 'ul')) {
      return (
        <View key={getUniqueID()} style={styles.listUnorderedItem}>
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
        <View key={getUniqueID()} style={styles.listOrderedItem}>
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
      <View key={getUniqueID()} style={[styles.listItem]}>
        {children}
      </View>
    );
  },
  table: (node, children, parent, styles) =>
    <View key={getUniqueID()} style={[styles.table]}>
      {children}
    </View>,
  thead: (node, children, parent, styles) =>
    <View key={getUniqueID()} style={[styles.tableHeader]}>
      {children}
    </View>,
  tbody: (node, children, parent, styles) =>
    <View key={getUniqueID()}>
      {children}
    </View>,
  th: (node, children, parent, styles) => {
    return (
      <View key={getUniqueID()} style={[styles.tableHeaderCell]}>
        {children}
      </View>
    );
  },
  tr: (node, children, parent, styles) => {
    return (
      <View key={getUniqueID()} style={[styles.tableRow]}>
        {children}
      </View>
    );
  },
  td: (node, children, parent, styles) => {
    return (
      <View key={getUniqueID()} style={[styles.tableRowCell]}>
        {children}
      </View>
    );
  },
  hr: (node, children, parent, styles) => {
    return <View key={getUniqueID()} style={[styles.hr]} />;
  },
  br: (node, children, parent, styles) =>
    <Text key={getUniqueID()}>
      {'\n'}
    </Text>,
  img: (node, children, parent, styles) => {
    return <FitImage key={getUniqueID()} source={{ uri: node.attributes.src }} />;
  },
};

export default renderRules;
