import React from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import type { ReactNode } from 'react';

import openUrl from './util/openUrl';
import hasParents from './util/hasParents';
import applyStyle from './util/applyStyle';
import type { ASTNode, RenderRules, MarkdownStyles } from '../types';

function trimTrailingNewline(content: string): string {
  if (content.length > 0 && content.charAt(content.length - 1) === '\n') {
    return content.substring(0, content.length - 1);
  }
  return content;
}

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

  link: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles, ...args: unknown[]) => {
    const onLinkPress = args[0] as ((url: string) => boolean | void) | undefined;
    const handlePress = () => {
      const url = node.attributes.href;
      if (onLinkPress) {
        onLinkPress(url);
      } else {
        openUrl(url);
      }
    };
    return (
      <Text key={node.key} style={styles.link as any} onPress={handlePress}>
        {children}
      </Text>
    );
  },

  blocklink: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles, ...args: unknown[]) => {
    const onLinkPress = args[0] as ((url: string) => boolean | void) | undefined;
    const handlePress = () => {
      const url = node.attributes.href;
      if (onLinkPress) {
        onLinkPress(url);
      } else {
        openUrl(url);
      }
    };
    return (
      <TouchableWithoutFeedback key={node.key} onPress={handlePress}>
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
      <View key={node.key} style={[styles.headingContainer as any, styles.heading1Container as any]}>
        {applyStyle(children as any, [styles.heading, styles.heading1], 'Text')}
      </View>
    );
  },

  heading2: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={[styles.headingContainer as any, styles.heading2Container as any]}>
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
    <Text key={node.key}>{'\n'}</Text>
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
        {trimTrailingNewline(node.content)}
      </Text>
    );
  },

  fence: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.codeBlock as any}>
        {trimTrailingNewline(node.content)}
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
      const orderedListParent = parent.find((el) => el.type === 'ordered_list');
      const startNumber = orderedListParent?.attributes?.start
        ? parseInt(orderedListParent.attributes.start, 10)
        : 1;
      const listItemNumber = startNumber + node.index;

      return (
        <View key={node.key} style={styles.listOrderedItem as any}>
          <Text style={styles.listOrderedItemIcon as any}>
            {listItemNumber}
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

  image: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles, ...args: unknown[]) => {
    const allowedImageHandlers = (args[0] as string[] | undefined) ?? [
      'data:image/png;base64', 'data:image/gif;base64', 'data:image/jpeg;base64', 'https://', 'http://',
    ];
    const defaultImageHandler = args.length > 1 ? (args[1] as string | null) : 'http://';

    let { src } = node.attributes;

    const isAllowed = allowedImageHandlers.some((handler) => src.startsWith(handler));

    if (!isAllowed) {
      if (defaultImageHandler == null) {
        return null;
      }
      src = `${defaultImageHandler}${src}`;
    }

    return (
      <Image
        key={node.key}
        style={styles.image as any}
        source={{ uri: src }}
        accessible={!!node.attributes.alt}
        accessibilityLabel={node.attributes.alt || undefined}
      />
    );
  },

  html_block: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <View key={node.key} style={styles.htmlBlock as any}>
        <Text>{node.content}</Text>
      </View>
    );
  },

  html_inline: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.htmlInline as any}>
        {node.content}
      </Text>
    );
  },

  u: (node: ASTNode, children: ReactNode[], parent: ASTNode[], styles: MarkdownStyles) => {
    return (
      <Text key={node.key} style={styles.u as any}>
        {children}
      </Text>
    );
  },
};

export default renderRules;
