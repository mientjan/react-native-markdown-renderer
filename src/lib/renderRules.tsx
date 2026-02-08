import React from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import type { ReactNode } from 'react';

import openUrl from './util/openUrl';
import hasParents from './util/hasParents';
import applyStyle from './util/applyStyle';
import type { ASTNode, RenderRules, MarkdownStyles } from '../types';

const renderRules: RenderRules = {
  unknown: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key}>
        <Text>{node.type}</Text>
      </View>
    );
  },

  textgroup: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.text as any}>
        {children}
      </Text>
    );
  },

  inline: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return <Text key={node.key}>{children}</Text>;
  },

  text: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return <Text key={node.key}>{node.content}</Text>;
  },

  span: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return <Text key={node.key}>{children}</Text>;
  },

  strong: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.strong as any}>
        {children}
      </Text>
    );
  },

  s: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.strikethrough as any}>
        {children}
      </Text>
    );
  },

  link: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.link as any} onPress={() => openUrl(node.attributes.href)}>
        {children}
      </Text>
    );
  },

  blocklink: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <TouchableWithoutFeedback key={node.key} onPress={() => openUrl(node.attributes.href)}>
        <View style={styles.image as any}>{children}</View>
      </TouchableWithoutFeedback>
    );
  },

  em: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.em as any}>
        {children}
      </Text>
    );
  },

  heading1: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={styles.headingContainer as any}>
        {applyStyle(children as any, [styles.heading, styles.heading1], 'Text')}
      </View>
    );
  },

  heading2: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={styles.headingContainer as any}>
        {applyStyle(children as any, [styles.heading, styles.heading2], 'Text')}
      </View>
    );
  },

  heading3: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={styles.headingContainer as any}>
      {applyStyle(children as any, [styles.heading, styles.heading3], 'Text')}
    </View>
  ),

  heading4: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={styles.headingContainer as any}>
      {applyStyle(children as any, [styles.heading, styles.heading4], 'Text')}
    </View>
  ),

  heading5: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={styles.headingContainer as any}>
      {applyStyle(children as any, [styles.heading, styles.heading5], 'Text')}
    </View>
  ),

  heading6: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={styles.headingContainer as any}>
      {applyStyle(children as any, [styles.heading, styles.heading6], 'Text')}
    </View>
  ),

  paragraph: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={styles.paragraph as any}>
      {children}
    </View>
  ),

  hardbreak: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={styles.hardbreak as any} />
  ),

  blockquote: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={styles.blockquote as any}>
      {children}
    </View>
  ),

  code_inline: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.codeInline as any}>
        {node.content}
      </Text>
    );
  },

  code_block: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.codeBlock as any}>
        {node.content}
      </Text>
    );
  },

  fence: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.codeBlock as any}>
        {node.content}
      </Text>
    );
  },

  pre: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={styles.pre as any}>
      {children}
    </View>
  ),

  bullet_list: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={[styles.list as any, styles.listUnordered as any]}>
        {children}
      </View>
    );
  },

  ordered_list: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={[styles.list as any, styles.listOrdered as any]}>
        {children}
      </View>
    );
  },

  list_item: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    if (hasParents(parent, 'bullet_list')) {
      return (
        <View key={node.key} style={styles.listUnorderedItem as any}>
          <Text style={styles.listUnorderedItemIcon as any}>{'\u00B7'}</Text>
          <View style={[styles.listItem as any]}>{children}</View>
        </View>
      );
    }

    if (hasParents(parent, 'ordered_list')) {
      return (
        <View key={node.key} style={styles.listOrderedItem as any}>
          <Text style={styles.listOrderedItemIcon as any}>
            {node.index + 1}
            {node.markup}
          </Text>
          <View style={[styles.listItem as any]}>{children}</View>
        </View>
      );
    }

    return (
      <View key={node.key} style={[styles.listItem as any]}>
        {children}
      </View>
    );
  },

  table: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={[styles.table as any]}>
      {children}
    </View>
  ),

  thead: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key} style={[styles.tableHeader as any]}>
      {children}
    </View>
  ),

  tbody: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <View key={node.key}>{children}</View>
  ),

  th: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={[styles.tableHeaderCell as any]}>
        {children}
      </View>
    );
  },

  tr: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={[styles.tableRow as any]}>
        {children}
      </View>
    );
  },

  td: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={[styles.tableRowCell as any]}>
        {children}
      </View>
    );
  },

  hr: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return <View key={node.key} style={[styles.hr as any]} />;
  },

  softbreak: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => (
    <Text key={node.key}>{'\n'}</Text>
  ),

  image: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return <Image key={node.key} style={styles.image as any} source={{ uri: node.attributes.src }} />;
  },
};

export default renderRules;
