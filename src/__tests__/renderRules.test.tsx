import React from 'react';
import { create } from 'react-test-renderer';
import renderRules from '../lib/renderRules';
import type { ASTNode, MarkdownStyles } from '../types';

const mockStyles: MarkdownStyles = {
  text: {},
  strong: { fontWeight: 'bold' },
  link: { textDecorationLine: 'underline' },
  image: { flex: 1 },
  codeBlock: {},
  codeInline: {},
  em: { fontStyle: 'italic' },
  headingContainer: {},
  heading: {},
  heading1: { fontSize: 32 },
  heading2: { fontSize: 24 },
  heading3: { fontSize: 18 },
  heading4: { fontSize: 16 },
  heading5: { fontSize: 13 },
  heading6: { fontSize: 11 },
  paragraph: {},
  hardbreak: {},
  blockquote: {},
  list: {},
  listUnordered: {},
  listOrdered: {},
  listItem: {},
  listUnorderedItem: {},
  listUnorderedItemIcon: {},
  listOrderedItem: {},
  listOrderedItemIcon: {},
  table: {},
  tableHeader: {},
  tableHeaderCell: {},
  tableRow: {},
  tableRowCell: {},
  hr: {},
  strikethrough: {},
  blocklink: {},
  pre: {},
};

function makeNode(overrides: Partial<ASTNode> = {}): ASTNode {
  return {
    type: 'text',
    sourceType: 'text',
    sourceInfo: '',
    sourceMeta: null,
    block: false,
    markup: '',
    key: 'test-key',
    content: 'test content',
    tokenIndex: 0,
    index: 0,
    attributes: {},
    children: [],
    ...overrides,
  };
}

describe('renderRules', () => {
  const expectedRuleKeys = [
    'text',
    'strong',
    'em',
    'link',
    'image',
    'heading1',
    'heading2',
    'heading3',
    'heading4',
    'heading5',
    'heading6',
    'paragraph',
    'blockquote',
    'code_inline',
    'fence',
    'code_block',
    'list_item',
    'bullet_list',
    'ordered_list',
    'table',
    'thead',
    'tbody',
    'tr',
    'td',
    'th',
    'hr',
    'softbreak',
    'hardbreak',
    'textgroup',
    'blocklink',
    'unknown',
    'inline',
    'span',
    's',
    'pre',
  ];

  it('has all expected rule keys', () => {
    for (const key of expectedRuleKeys) {
      expect(renderRules).toHaveProperty(key);
    }
  });

  it('each rule is a function', () => {
    for (const key of expectedRuleKeys) {
      expect(typeof renderRules[key]).toBe('function');
    }
  });

  it('text rule renders a Text with content', () => {
    const node = makeNode({ type: 'text', content: 'hello world' });
    const result = renderRules.text(node, [], [], mockStyles);
    const tree = create(result as React.ReactElement);
    const json = tree.toJSON() as any;
    expect(json.type).toBe('Text');
    expect(json.children).toContain('hello world');
  });

  it('strong rule renders a Text with bold style', () => {
    const node = makeNode({ type: 'strong', key: 'strong-1' });
    const result = renderRules.strong(node, ['bold text'], [], mockStyles);
    const tree = create(result as React.ReactElement);
    const json = tree.toJSON() as any;
    expect(json.type).toBe('Text');
    expect(json.props.style).toEqual({ fontWeight: 'bold' });
  });

  it('link rule renders a Text with onPress handler', () => {
    const node = makeNode({ type: 'link', key: 'link-1', attributes: { href: 'https://example.com' } });
    const result = renderRules.link(node, ['click me'], [], mockStyles);
    const tree = create(result as React.ReactElement);
    const json = tree.toJSON() as any;
    expect(json.type).toBe('Text');
    expect(json.props.onPress).toBeDefined();
  });

  it('image rule renders an Image with source uri from attributes', () => {
    const node = makeNode({ type: 'image', key: 'img-1', attributes: { src: 'https://example.com/img.png' } });
    const result = renderRules.image(node, [], [], mockStyles);
    const tree = create(result as React.ReactElement);
    const json = tree.toJSON() as any;
    expect(json.type).toBe('Image');
    expect(json.props.source).toEqual({ uri: 'https://example.com/img.png' });
  });
});
