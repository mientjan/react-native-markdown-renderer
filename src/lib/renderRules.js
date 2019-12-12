import React from 'react';
import {Text, TouchableWithoutFeedback, View, Platform} from 'react-native';
import FitImage from 'react-native-fit-image';

import openUrl from './util/openUrl';
import hasParents from './util/hasParents';

const codeBlockAndFence = (
  node,
  children,
  parent,
  styles,
  inheritedStyles = {},
) => {
  // we trim new lines off the end of code blocks because the parser sends an extra one.
  let {content} = node;

  if (
    typeof node.content === 'string' &&
    node.content.charAt(node.content.length - 1) === '\n'
  ) {
    content = node.content.substring(0, node.content.length - 1);
  }

  return (
    <Text key={node.key} style={[inheritedStyles, styles.codeBlock]}>
      {content}
    </Text>
  );
};

const renderRules = {
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parent, styles) => null,
  root: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_root}>
      {children}
    </View>
  ),
  text: (node, children, parent, styles, inheritedStyles = {}) => (
    <Text key={node.key} style={[inheritedStyles, styles.text]}>
      {node.content}
    </Text>
  ),
  textgroup: (node, children, parent, styles) => (
    <Text key={node.key} style={styles.textGroup}>
      {children}
    </Text>
  ),
  strong: (node, children, parent, styles) => (
    <Text key={node.key} style={styles.strong}>
      {children}
    </Text>
  ),
  s: (node, children, parent, styles) => (
    <Text key={node.key} style={styles.strikethrough}>
      {children}
    </Text>
  ),
  link: (node, children, parent, styles, onLinkPress) => (
    <Text
      key={node.key}
      style={styles.link}
      onPress={() => openUrl(node.attributes.href, onLinkPress)}>
      {children}
    </Text>
  ),
  em: (node, children, parent, styles) => (
    <Text key={node.key} style={styles.em}>
      {children}
    </Text>
  ),
  blocklink: (node, children, parent, styles, onLinkPress) => (
    <TouchableWithoutFeedback
      key={node.key}
      onPress={() => openUrl(node.attributes.href, onLinkPress)}
      style={styles.blocklink}>
      <View style={styles.image}>{children}</View>
    </TouchableWithoutFeedback>
  ),
  heading1: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={[
        styles._VIEW_SAFE_headingContainer,
        styles._VIEW_SAFE_heading,
        styles._VIEW_SAFE_heading1,
      ]}>
      {children}
    </View>
  ),
  heading2: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={[
        styles._VIEW_SAFE_headingContainer,
        styles._VIEW_SAFE_heading,
        styles._VIEW_SAFE_heading2,
      ]}>
      {children}
    </View>
  ),
  heading3: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={[
        styles._VIEW_SAFE_headingContainer,
        styles._VIEW_SAFE_heading,
        styles._VIEW_SAFE_heading3,
      ]}>
      {children}
    </View>
  ),
  heading4: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={[
        styles._VIEW_SAFE_headingContainer,
        styles._VIEW_SAFE_heading,
        styles._VIEW_SAFE_heading4,
      ]}>
      {children}
    </View>
  ),
  heading5: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={[
        styles._VIEW_SAFE_headingContainer,
        styles._VIEW_SAFE_heading,
        styles._VIEW_SAFE_heading5,
      ]}>
      {children}
    </View>
  ),
  heading6: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={[
        styles._VIEW_SAFE_headingContainer,
        styles._VIEW_SAFE_heading,
        styles._VIEW_SAFE_heading6,
      ]}>
      {children}
    </View>
  ),
  paragraph: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_paragraph}>
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
    <View key={node.key} style={styles._VIEW_SAFE_blockquote}>
      {children}
    </View>
  ),
  code_inline: (node, children, parent, styles, inheritedStyles = {}) => (
    <Text key={node.key} style={[inheritedStyles, styles.codeInline]}>
      {node.content}
    </Text>
  ),
  code_block: codeBlockAndFence,
  fence: codeBlockAndFence,
  pre: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_pre}>
      {children}
    </View>
  ),
  bullet_list: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={[styles._VIEW_SAFE_list, styles._VIEW_SAFE_listUnordered]}>
      {children}
    </View>
  ),
  ordered_list: (node, children, parent, styles) => (
    <View
      key={node.key}
      style={[styles._VIEW_SAFE_list, styles._VIEW_SAFE_listOrdered]}>
      {children}
    </View>
  ),
  list_item: (node, children, parent, styles, inheritedStyles = {}) => {
    if (hasParents(parent, 'bullet_list')) {
      return (
        <View key={node.key} style={styles._VIEW_SAFE_listUnorderedItem}>
          <Text style={[inheritedStyles, styles.listUnorderedItemIcon]}>
            {Platform.select({
              android: '\u2022',
              ios: '\u00B7',
              default: '\u2022',
            })}
          </Text>
          <View style={styles._VIEW_SAFE_listItem}>{children}</View>
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
        <View key={node.key} style={styles._VIEW_SAFE_listOrderedItem}>
          <Text style={[inheritedStyles, styles.listOrderedItemIcon]}>
            {listItemNumber}
            {node.markup}
          </Text>
          <View style={styles._VIEW_SAFE_listItem}>{children}</View>
        </View>
      );
    }

    return (
      <View key={node.key} style={styles._VIEW_SAFE_listItem}>
        {children}
      </View>
    );
  },
  table: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_table}>
      {children}
    </View>
  ),
  thead: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_tableHeader}>
      {children}
    </View>
  ),
  tbody: (node, children, parent, styles) => (
    <View key={node.key}>{children}</View>
  ),
  th: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_tableHeaderCell}>
      {children}
    </View>
  ),
  tr: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_tableRow}>
      {children}
    </View>
  ),
  td: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_tableRowCell}>
      {children}
    </View>
  ),
  hr: (node, children, parent, styles) => (
    <View key={node.key} style={styles._VIEW_SAFE_hr} />
  ),
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
      style: styles._VIEW_SAFE_image,
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
  inline: (node, children, parent, styles) => (
    <Text key={node.key}>{children}</Text>
  ),
  span: (node, children, parent, styles) => (
    <Text key={node.key}>{children}</Text>
  ),
};

export default renderRules;
