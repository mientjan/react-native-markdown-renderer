import React from 'react';
import { create } from 'react-test-renderer';
import { TouchableWithoutFeedback } from 'react-native';
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
  htmlBlock: { marginBottom: 16 },
  htmlInline: {},
  u: { textDecorationLine: 'underline' },
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
    'html_block',
    'html_inline',
    'u',
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

  it('html_block rule renders raw HTML content in a View', () => {
    const node = makeNode({ type: 'html_block', content: '<div>test</div>' });
    const result = renderRules.html_block(node, [], [], mockStyles);
    const tree = create(result as React.ReactElement);
    const json = tree.toJSON() as any;
    expect(json.type).toBe('View');
    expect(json.children[0].type).toBe('Text');
    expect(json.children[0].children).toContain('<div>test</div>');
  });

  it('html_inline rule renders raw HTML content as inline Text', () => {
    const node = makeNode({ type: 'html_inline', content: '<br>' });
    const result = renderRules.html_inline(node, [], [], mockStyles);
    const tree = create(result as React.ReactElement);
    const json = tree.toJSON() as any;
    expect(json.type).toBe('Text');
    expect(json.children).toContain('<br>');
  });

  it('u rule renders children with underline style', () => {
    const node = makeNode({ type: 'u', key: 'u-1' });
    const result = renderRules.u(node, ['underlined text'], [], mockStyles);
    const tree = create(result as React.ReactElement);
    const json = tree.toJSON() as any;
    expect(json.type).toBe('Text');
    expect(json.props.style).toEqual({ textDecorationLine: 'underline' });
  });

  describe('onLinkPress', () => {
    it('link rule uses custom onLinkPress when provided', () => {
      const onLinkPress = jest.fn();
      const node = makeNode({ type: 'link', key: 'link-1', attributes: { href: 'https://example.com' } });
      const result = renderRules.link(node, ['click me'], [], mockStyles, onLinkPress);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      json.props.onPress();
      expect(onLinkPress).toHaveBeenCalledWith('https://example.com');
    });

    it('blocklink rule uses custom onLinkPress when provided', () => {
      const onLinkPress = jest.fn();
      const node = makeNode({ type: 'blocklink', key: 'bl-1', attributes: { href: 'https://test.com' } });
      const result = renderRules.blocklink(node, ['content'], [], mockStyles, onLinkPress);
      const tree = create(result as React.ReactElement);
      const touchable = tree.root.findByType(TouchableWithoutFeedback);
      touchable.props.onPress();
      expect(onLinkPress).toHaveBeenCalledWith('https://test.com');
    });

    it('link rule falls back to default openUrl when onLinkPress is not provided', () => {
      const node = makeNode({ type: 'link', key: 'link-2', attributes: { href: 'https://example.com' } });
      const result = renderRules.link(node, ['click me'], [], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.props.onPress).toBeDefined();
    });
  });

  describe('hardbreak', () => {
    it('renders as Text with newline instead of View', () => {
      const node = makeNode({ type: 'hardbreak', key: 'hb-1' });
      const result = renderRules.hardbreak(node, [], [], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.type).toBe('Text');
      expect(json.children).toContain('\n');
    });
  });

  describe('code block trailing newline', () => {
    it('code_block trims trailing newline from content', () => {
      const node = makeNode({ type: 'code_block', key: 'cb-1', content: 'console.log("hello")\n' });
      const result = renderRules.code_block(node, [], [], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.children).toContain('console.log("hello")');
      expect(json.children).not.toContain('console.log("hello")\n');
    });

    it('fence trims trailing newline from content', () => {
      const node = makeNode({ type: 'fence', key: 'f-1', content: 'const x = 1;\n' });
      const result = renderRules.fence(node, [], [], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.children).toContain('const x = 1;');
      expect(json.children).not.toContain('const x = 1;\n');
    });

    it('code_block preserves content without trailing newline', () => {
      const node = makeNode({ type: 'code_block', key: 'cb-2', content: 'no newline' });
      const result = renderRules.code_block(node, [], [], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.children).toContain('no newline');
    });
  });

  describe('ordered list start attribute', () => {
    it('uses start attribute from parent ordered_list', () => {
      const orderedListParent = makeNode({
        type: 'ordered_list',
        key: 'ol-1',
        attributes: { start: '5' },
      });
      const node = makeNode({
        type: 'list_item',
        key: 'li-1',
        index: 0,
        markup: '.',
      });
      const result = renderRules.list_item(node, ['item text'], [orderedListParent], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = JSON.stringify(tree.toJSON());
      expect(json).toContain('5');
    });

    it('computes correct number for non-first items with start offset', () => {
      const orderedListParent = makeNode({
        type: 'ordered_list',
        key: 'ol-1',
        attributes: { start: '10' },
      });
      const node = makeNode({
        type: 'list_item',
        key: 'li-2',
        index: 2,
        markup: '.',
      });
      const result = renderRules.list_item(node, ['item text'], [orderedListParent], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = JSON.stringify(tree.toJSON());
      expect(json).toContain('12');
    });

    it('defaults to 1-based numbering when no start attribute', () => {
      const orderedListParent = makeNode({
        type: 'ordered_list',
        key: 'ol-1',
        attributes: {},
      });
      const node = makeNode({
        type: 'list_item',
        key: 'li-3',
        index: 0,
        markup: '.',
      });
      const result = renderRules.list_item(node, ['item text'], [orderedListParent], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = JSON.stringify(tree.toJSON());
      expect(json).toContain('1');
    });
  });

  describe('image accessibility and URL validation', () => {
    it('adds accessibilityLabel from alt attribute', () => {
      const node = makeNode({
        type: 'image',
        key: 'img-a11y',
        attributes: { src: 'https://example.com/img.png', alt: 'A nice photo' },
      });
      const result = renderRules.image(node, [], [], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.props.accessibilityLabel).toBe('A nice photo');
      expect(json.props.accessible).toBe(true);
    });

    it('does not set accessible when no alt text', () => {
      const node = makeNode({
        type: 'image',
        key: 'img-no-alt',
        attributes: { src: 'https://example.com/img.png' },
      });
      const result = renderRules.image(node, [], [], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.props.accessible).toBe(false);
    });

    it('prepends defaultImageHandler for unrecognized URL schemes', () => {
      const node = makeNode({
        type: 'image',
        key: 'img-ftp',
        attributes: { src: 'ftp://example.com/img.png' },
      });
      const result = renderRules.image(node, [], [], mockStyles);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.props.source.uri).toBe('http://ftp://example.com/img.png');
    });

    it('uses custom allowedImageHandlers from args', () => {
      const node = makeNode({
        type: 'image',
        key: 'img-custom',
        attributes: { src: 'custom://img.png' },
      });
      const allowedHandlers = ['custom://'];
      const result = renderRules.image(node, [], [], mockStyles, allowedHandlers, null);
      const tree = create(result as React.ReactElement);
      const json = tree.toJSON() as any;
      expect(json.props.source.uri).toBe('custom://img.png');
    });

    it('returns null when defaultImageHandler is null and URL is not allowed', () => {
      const node = makeNode({
        type: 'image',
        key: 'img-null',
        attributes: { src: 'ftp://example.com/img.png' },
      });
      const result = renderRules.image(node, [], [], mockStyles, ['https://'], null);
      expect(result).toBeNull();
    });
  });
});
