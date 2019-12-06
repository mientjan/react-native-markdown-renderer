import React from 'react';
import {Text, TouchableWithoutFeedback, View, Platform} from 'react-native';
import FitImage from 'react-native-fit-image';

import openUrl from './util/openUrl';
import hasParents from './util/hasParents';
import removeTextStyleProps from './util/removeTextStyleProps';

const codeBlockAndFence = (node, children, parent, styles) => {
  // we trim new lines off the end of code blocks because the parser sends an extra one.
  let {content} = node;

  if (
    typeof node.content === 'string' &&
    node.content.charAt(node.content.length - 1) === '\n'
  ) {
    content = node.content.substring(0, node.content.length - 1);
  }

  return (
    <Text key={node.key} style={styles.codeBlock}>
      {content}
    </Text>
  );
};

const renderRules = {
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parent, styles) => {
    return null;
  },
  root: (node, children, parent, styles) => (
    <View key={node.key} style={removeTextStyleProps(styles.root)}>
      {children}
    </View>
  ),
  text: (node, children, parent, styles, styleOverride = {}) => {
    return (
      <Text key={node.key} style={[styles.text, styleOverride]}>
        {node.content}
      </Text>
    );
  },
  textgroup: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.textGroup}>
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
  link: (node, children, parent, styles, onLinkPress) => {
    return (
      <Text
        key={node.key}
        style={styles.link}
        onPress={() => openUrl(node.attributes.href, onLinkPress)}>
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
  blocklink: (node, children, parent, styles, onLinkPress) => {
    return (
      <TouchableWithoutFeedback
        key={node.key}
        onPress={() => openUrl(node.attributes.href, onLinkPress)}
        style={styles.blocklink}>
        <View style={styles.image}>{children}</View>
      </TouchableWithoutFeedback>
    );
  },
  heading1: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={removeTextStyleProps({
        ...styles.headingContainer,
        ...styles.heading,
        ...styles.heading1,
      })}>
      {children}
    </View>
  ),
  heading2: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={removeTextStyleProps({
        ...styles.headingContainer,
        ...styles.heading,
        ...styles.heading2,
      })}>
      {children}
    </View>
  ),
  heading3: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={removeTextStyleProps({
        ...styles.headingContainer,
        ...styles.heading,
        ...styles.heading3,
      })}>
      {children}
    </View>
  ),
  heading4: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={removeTextStyleProps({
        ...styles.headingContainer,
        ...styles.heading,
        ...styles.heading4,
      })}>
      {children}
    </View>
  ),
  heading5: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={removeTextStyleProps({
        ...styles.headingContainer,
        ...styles.heading,
        ...styles.heading5,
      })}>
      {children}
    </View>
  ),
  heading6: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={removeTextStyleProps({
        ...styles.headingContainer,
        ...styles.heading,
        ...styles.heading6,
      })}>
      {children}
    </View>
  ),
  paragraph: (node, children, parent, styles) => (
    <View key={node.key} style={removeTextStyleProps(styles.paragraph)}>
      {children}
    </View>
  ),
  hardbreak: (node, children, parent, styles) => (
    <Text key={node.key} style={styles.hardbreak}>
      {'\n'}
    </Text>
  ),
  softbreak: (node, children, parent, styles) => (
    <Text key={node.key}>{'\n'}</Text>
  ),
  blockquote: (node, children, parent, styles) => (
    <View key={node.key} style={removeTextStyleProps(styles.blockquote)}>
      {children}
    </View>
  ),
  code_inline: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.codeInline}>
        {node.content}
      </Text>
    );
  },
  code_block: codeBlockAndFence,
  fence: codeBlockAndFence,
  pre: (node, children, parent, styles) => (
    <View key={node.key} style={removeTextStyleProps(styles.pre)}>
      {children}
    </View>
  ),
  bullet_list: (node, children, parent, styles) => {
    return (
      <View
        key={node.key}
        style={removeTextStyleProps({...styles.list, ...styles.listUnordered})}>
        {children}
      </View>
    );
  },
  ordered_list: (node, children, parent, styles) => {
    return (
      <View
        key={node.key}
        style={removeTextStyleProps({...styles.list, ...styles.listOrdered})}>
        {children}
      </View>
    );
  },
  list_item: (node, children, parent, styles, styleOverride = {}) => {
    if (hasParents(parent, 'bullet_list')) {
      return (
        <View
          key={node.key}
          style={removeTextStyleProps(styles.listUnorderedItem)}>
          <Text style={[styles.listUnorderedItemIcon, styleOverride]}>
            {Platform.select({
              android: '\u2022',
              ios: '\u00B7',
            })}
          </Text>
          <View style={removeTextStyleProps(styles.listItem)}>{children}</View>
        </View>
      );
    }

    if (hasParents(parent, 'ordered_list')) {
      const orderedListIndex = parent.findIndex(
        el => el.type === 'ordered_list',
      );

      const orderedList = parent[orderedListIndex];
      let listItemNumber;

      if (orderedList.attributes && orderedList.attributes.start) {
        listItemNumber = orderedList.attributes.start + node.index;
      } else {
        listItemNumber = node.index + 1;
      }

      return (
        <View
          key={node.key}
          style={removeTextStyleProps(styles.listOrderedItem)}>
          <Text style={[styles.listOrderedItemIcon, styleOverride]}>
            {listItemNumber}
            {node.markup}
          </Text>
          <View style={removeTextStyleProps(styles.listItem)}>{children}</View>
        </View>
      );
    }

    return (
      <View key={node.key} style={removeTextStyleProps(styles.listItem)}>
        {children}
      </View>
    );
  },
  table: (node, children, parent, styles) => (
    <View key={node.key} style={removeTextStyleProps(styles.table)}>
      {children}
    </View>
  ),
  thead: (node, children, parent, styles) => (
    <View key={node.key} style={removeTextStyleProps(styles.tableHeader)}>
      {children}
    </View>
  ),
  tbody: (node, children, parent, styles) => (
    <View key={node.key}>{children}</View>
  ),
  th: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={removeTextStyleProps(styles.tableHeaderCell)}>
        {children}
      </View>
    );
  },
  tr: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={removeTextStyleProps(styles.tableRow)}>
        {children}
      </View>
    );
  },
  td: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={removeTextStyleProps(styles.tableRowCell)}>
        {children}
      </View>
    );
  },
  hr: (node, children, parent, styles) => {
    return <View key={node.key} style={removeTextStyleProps(styles.hr)} />;
  },
  image: (
    node,
    children,
    parent,
    styles,
    allowedImageHandlers,
    defaultImageHandler,
  ) => {
    const {src, alt} = node.attributes;

    // we check that the source starts with at least one of the elements in allowedImageHandlers
    const show =
      allowedImageHandlers.filter(value => {
        return src.toLowerCase().startsWith(value.toLowerCase());
      }).length > 0;

    if (show === false && defaultImageHandler === null) {
      return null;
    }

    const imageProps = {
      indicator: true,
      key: node.key,
      style: removeTextStyleProps(styles.image),
      source: {
        uri: show === true ? src : `${defaultImageHandler}${src}`,
      },
    };

    if (alt) {
      imageProps.accessible = true;
      imageProps.accessibilityLabel = alt;
    }

    return <FitImage {...imageProps} />;
  },
  // it seems these are never used?
  inline: (node, children, parent, styles) => {
    return <Text key={node.key}>{children}</Text>;
  },
  span: (node, children, parent, styles) => {
    return <Text key={node.key}>{children}</Text>;
  },
};

export default renderRules;
