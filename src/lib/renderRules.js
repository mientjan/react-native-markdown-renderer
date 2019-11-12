import React from 'react';
import {Text, TouchableWithoutFeedback, View, Platform} from 'react-native';

import FitImage from 'react-native-fit-image';
import openUrl from './util/openUrl';
import hasParents from './util/hasParents';
import applyStyle from './util/applyStyle';
import PlatformEnum from './data/PlatformEnum';

const renderRules = {
  root: (node, children, parent, styles) => (
    <View key={node.key} style={styles.root}>
      {children}
    </View>
  ),
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parent, styles) => {
    return (
      <View key={node.key}>
        <Text>{node.type}</Text>
      </View>
    );
  },
  textgroup: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.text}>
        {children}
      </Text>
    );
  },
  inline: (node, children, parent, styles) => {
    return <Text key={node.key}>{children}</Text>;
  },
  text: (node, children, parent, styles, styleOverride = {}) => {
    return (
      <Text key={node.key} style={{...styles.text, ...styleOverride}}>
        {node.content}
      </Text>
    );
  },
  span: (node, children, parent, styles) => {
    return <Text key={node.key}>{children}</Text>;
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
  // a
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
  // a with a non text element nested inside
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
  em: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.em}>
        {children}
      </Text>
    );
  },
  heading1: (node, children, parent, styles) => (
    <View key={node.key} style={styles.headingContainer}>
      {applyStyle(children, [styles.heading, styles.heading1], 'Text')}
    </View>
  ),
  heading2: (node, children, parent, styles) => (
    <View key={node.key} style={styles.headingContainer}>
      {applyStyle(children, [styles.heading, styles.heading2], 'Text')}
    </View>
  ),
  heading3: (node, children, parent, styles) => (
    <View key={node.key} style={styles.headingContainer}>
      {applyStyle(children, [styles.heading, styles.heading3], 'Text')}
    </View>
  ),
  heading4: (node, children, parent, styles) => (
    <View key={node.key} style={styles.headingContainer}>
      {applyStyle(children, [styles.heading, styles.heading4], 'Text')}
    </View>
  ),
  heading5: (node, children, parent, styles) => (
    <View key={node.key} style={styles.headingContainer}>
      {applyStyle(children, [styles.heading, styles.heading5], 'Text')}
    </View>
  ),
  heading6: (node, children, parent, styles) => (
    <View key={node.key} style={styles.headingContainer}>
      {applyStyle(children, [styles.heading, styles.heading6], 'Text')}
    </View>
  ),
  paragraph: (node, children, parent, styles) => (
    <View key={node.key} style={styles.paragraph}>
      {children}
    </View>
  ),
  hardbreak: (node, children, parent, styles) => (
    <Text key={node.key} style={styles.hardbreak}>
      {'\n'}
    </Text>
  ),
  blockquote: (node, children, parent, styles) => (
    <View key={node.key} style={styles.blockquote}>
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
  code_block: (node, children, parent, styles) => {
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
  },
  fence: (node, children, parent, styles) => {
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
  },
  pre: (node, children, parent, styles) => (
    <View key={node.key} style={styles.pre}>
      {children}
    </View>
  ),
  // ul
  bullet_list: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={[styles.list, styles.listUnordered]}>
        {children}
      </View>
    );
  },
  ordered_list: (node, children, parent, styles) => {
    return (
      <View key={node.key} style={[styles.list, styles.listOrdered]}>
        {children}
      </View>
    );
  },
  // li
  list_item: (node, children, parent, styles) => {
    if (hasParents(parent, 'bullet_list')) {
      return (
        <View key={node.key} style={styles.listUnorderedItem}>
          <Text style={[styles.text, styles.listUnorderedItemIcon]}>
            {Platform.select({
              [PlatformEnum.ANDROID]: '\u2022',
              [PlatformEnum.IOS]: '\u00B7',
            })}
          </Text>
          <View style={[styles.listItem]}>{children}</View>
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
        <View key={node.key} style={styles.listOrderedItem}>
          <Text style={[styles.text, styles.listOrderedItemIcon]}>
            {listItemNumber}
            {node.markup}
          </Text>
          <View style={[styles.listItem]}>{children}</View>
        </View>
      );
    }

    return (
      <View key={node.key} style={[styles.listItem]}>
        {children}
      </View>
    );
  },
  table: (node, children, parent, styles) => (
    <View key={node.key} style={[styles.table]}>
      {children}
    </View>
  ),
  thead: (node, children, parent, styles) => (
    <View key={node.key} style={[styles.tableHeader]}>
      {children}
    </View>
  ),
  tbody: (node, children, parent, styles) => (
    <View key={node.key}>{children}</View>
  ),
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
      <View key={node.key} style={styles.tableRowCell}>
        {children}
      </View>
    );
  },
  hr: (node, children, parent, styles) => {
    return <View key={node.key} style={[styles.hr]} />;
  },
  // br
  softbreak: (node, children, parent, styles) => (
    <Text key={node.key}>{'\n'}</Text>
  ),
  image: (node, children, parent, styles) => {
    const {src, alt} = node.attributes;
    const imageProps = {
      indicator: true,
      key: node.key,
      style: styles.image,
      source: {
        uri: src,
      },
    };
    if (alt) {
      imageProps.accessible = true;
      imageProps.accessibilityLabel = alt;
    }
    return <FitImage {...imageProps} />;
  },
};

export default renderRules;
