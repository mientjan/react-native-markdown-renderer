import { cleanupTokens } from '../../lib/util/cleanupTokens';

describe('cleanupTokens', () => {
  it('maps token types via getTokenTypeByToken', () => {
    const tokens = [{ type: 'paragraph_open', block: true, nesting: 1, children: null }];
    const result = cleanupTokens(tokens as any);
    expect(result[0].type).toBe('paragraph');
  });

  it('sets block: true on image tokens', () => {
    const tokens = [{ type: 'image', block: false, nesting: 0, children: null }];
    const result = cleanupTokens(tokens as any);
    expect(result[0].block).toBe(true);
  });

  it('sets block: true on hardbreak tokens', () => {
    const tokens = [{ type: 'hardbreak', block: false, nesting: 0, children: null }];
    const result = cleanupTokens(tokens as any);
    expect(result[0].block).toBe(true);
  });

  it('converts link to blocklink when link contains a block-level token', () => {
    const tokens = [
      { type: 'link_open', nesting: 1, block: false, children: null },
      { type: 'image', nesting: 0, block: false, children: null },
      { type: 'link_close', nesting: -1, block: false, children: null },
    ];
    const result = cleanupTokens(tokens as any);
    // image becomes block, which triggers blocklink conversion
    expect(result[0].type).toBe('blocklink');
    expect(result[0].block).toBe(true);
    expect(result[2].type).toBe('blocklink');
    expect(result[2].block).toBe(true);
  });

  it('preserves normal links without block children', () => {
    const tokens = [
      { type: 'link_open', nesting: 1, block: false, children: null },
      { type: 'text', nesting: 0, block: false, children: null, content: 'hello' },
      { type: 'link_close', nesting: -1, block: false, children: null },
    ];
    const result = cleanupTokens(tokens as any);
    expect(result[0].type).toBe('link');
    expect(result[2].type).toBe('link');
  });
});
