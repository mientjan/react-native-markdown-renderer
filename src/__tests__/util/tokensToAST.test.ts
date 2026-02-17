import tokensToAST from '../../lib/util/tokensToAST';

describe('tokensToAST', () => {
  it('returns empty array for null input', () => {
    expect(tokensToAST(null)).toEqual([]);
  });

  it('returns empty array for undefined input', () => {
    expect(tokensToAST(undefined)).toEqual([]);
  });

  it('returns empty array for empty array input', () => {
    expect(tokensToAST([])).toEqual([]);
  });

  it('creates flat nodes for nesting=0 tokens', () => {
    const tokens = [
      { type: 'text', nesting: 0, content: 'hello', block: false, children: null },
    ];
    const result = tokensToAST(tokens as any);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('text');
    expect(result[0].content).toBe('hello');
  });

  it('nests children between nesting=1 (open) and nesting=-1 (close) tokens', () => {
    const tokens = [
      { type: 'paragraph_open', tag: 'p', nesting: 1, block: true, children: null },
      { type: 'text', nesting: 0, content: 'hello', block: false, children: null },
      { type: 'paragraph_close', tag: 'p', nesting: -1, block: true, children: null },
    ];
    const result = tokensToAST(tokens as any);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('paragraph');
    expect(result[0].children).toHaveLength(1);
    expect(result[0].children[0].content).toBe('hello');
  });

  it('sets key, type, content, attributes, tokenIndex, index on each node', () => {
    const tokens = [
      { type: 'text', nesting: 0, content: 'test', block: false, children: null },
    ];
    const result = tokensToAST(tokens as any);
    const node = result[0];
    expect(node.key).toMatch(/^rnmr_/);
    expect(node.type).toBe('text');
    expect(node.content).toBe('test');
    expect(node.attributes).toEqual({});
    expect(node.tokenIndex).toBe(0);
    expect(node.index).toBe(0);
  });

  it('converts attrs array to attributes object', () => {
    const tokens = [
      {
        type: 'link_open',
        nesting: 1,
        block: false,
        children: null,
        attrs: [['href', 'https://example.com']],
      },
      { type: 'text', nesting: 0, content: 'link', block: false, children: null },
      { type: 'link_close', nesting: -1, block: false, children: null },
    ];
    const result = tokensToAST(tokens as any);
    expect(result[0].attributes).toEqual({ href: 'https://example.com' });
  });

  it('filters out empty text nodes', () => {
    const tokens = [
      { type: 'text', nesting: 0, content: '', block: false, children: null },
      { type: 'text', nesting: 0, content: 'hello', block: false, children: null },
    ];
    const result = tokensToAST(tokens as any);
    expect(result).toHaveLength(1);
    expect(result[0].content).toBe('hello');
  });

  it('recursively processes token.children', () => {
    const tokens = [
      {
        type: 'image',
        nesting: 0,
        content: 'alt text',
        block: true,
        children: [{ type: 'text', nesting: 0, content: 'alt text', block: false, children: null }],
      },
    ];
    const result = tokensToAST(tokens as any);
    expect(result[0].children).toHaveLength(1);
    expect(result[0].children[0].content).toBe('alt text');
  });
});
