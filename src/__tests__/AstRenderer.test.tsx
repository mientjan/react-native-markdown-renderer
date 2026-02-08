import React from 'react';
import { create } from 'react-test-renderer';
import AstRenderer, { rootRenderRule } from '../lib/AstRenderer';
import type { ASTNode, MarkdownStyles } from '../types';

const mockStyles: MarkdownStyles = {
  root: { flex: 1 },
  text: {},
  strong: { fontWeight: 'bold' },
};

function makeNode(overrides: Partial<ASTNode> = {}): ASTNode {
  return {
    type: 'text',
    sourceType: 'text',
    sourceInfo: '',
    sourceMeta: null,
    block: false,
    markup: '',
    key: 'test-key-1',
    content: 'hello',
    tokenIndex: 0,
    index: 0,
    attributes: {},
    children: [],
    ...overrides,
  };
}

describe('rootRenderRule', () => {
  it('wraps children in a View with styles.root', () => {
    const tree = create(rootRenderRule([React.createElement('Text', { key: '1' }, 'child')], mockStyles));
    const root = tree.toJSON() as any;
    expect(root.type).toBe('View');
  });
});

describe('AstRenderer', () => {
  const textRule = jest.fn((node: ASTNode, children: any[], parent: any[], styles: any) => {
    return React.createElement('Text', { key: node.key }, node.content);
  });

  const strongRule = jest.fn((node: ASTNode, children: any[], parent: any[], styles: any) => {
    return React.createElement('Text', { key: node.key, style: styles.strong }, children);
  });

  const rules = {
    text: textRule,
    strong: strongRule,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getRenderFunction returns the rule for a known type', () => {
    const renderer = new AstRenderer(rules, mockStyles);
    expect(renderer.getRenderFunction('text')).toBe(textRule);
  });

  it('getRenderFunction throws for an unknown type', () => {
    const renderer = new AstRenderer(rules, mockStyles);
    expect(() => renderer.getRenderFunction('unknown_type')).toThrow('unknown_type renderRule not defined');
  });

  it('renderNode calls the correct render function for the node type', () => {
    const renderer = new AstRenderer(rules, mockStyles);
    const node = makeNode({ type: 'text', content: 'hello' });
    renderer.renderNode(node, []);
    expect(textRule).toHaveBeenCalledTimes(1);
  });

  it('renderNode passes (node, children, parentNodes, styles) to the render function', () => {
    const renderer = new AstRenderer(rules, mockStyles);
    const node = makeNode({ type: 'text', content: 'test' });
    renderer.renderNode(node, []);
    expect(textRule).toHaveBeenCalledWith(node, [], [], mockStyles);
  });

  it('renderNode for text nodes passes empty children array', () => {
    const renderer = new AstRenderer(rules, mockStyles);
    const node = makeNode({ type: 'text', content: 'test' });
    renderer.renderNode(node, []);
    expect(textRule).toHaveBeenCalledWith(node, [], expect.any(Array), mockStyles);
  });

  it('renderNode recursively renders child nodes', () => {
    const renderer = new AstRenderer(rules, mockStyles);
    const childNode = makeNode({ type: 'text', key: 'child-1', content: 'child text' });
    const parentNode = makeNode({ type: 'strong', key: 'parent-1', children: [childNode] });
    renderer.renderNode(parentNode, []);
    expect(strongRule).toHaveBeenCalledTimes(1);
    expect(textRule).toHaveBeenCalledTimes(1);
  });

  it('render maps all top-level nodes and wraps in rootRenderRule', () => {
    const renderer = new AstRenderer(rules, mockStyles);
    const node = makeNode({ type: 'text', content: 'hello' });
    const result = renderer.render([node]);
    const tree = create(result);
    const root = tree.toJSON() as any;
    expect(root.type).toBe('View');
    expect(root.children).toHaveLength(1);
  });
});
