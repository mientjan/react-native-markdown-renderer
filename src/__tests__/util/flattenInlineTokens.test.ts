import flattenTokens from '../../lib/util/flattenInlineTokens';

describe('flattenInlineTokens', () => {
  it('flattens inline tokens by extracting their children', () => {
    const tokens = [
      {
        type: 'inline',
        children: [{ type: 'text', children: null }, { type: 'strong_open', children: null }],
      },
    ];
    const result = flattenTokens(tokens as any);
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('text');
    expect(result[1].type).toBe('strong_open');
  });

  it('preserves non-inline tokens as-is', () => {
    const tokens = [
      { type: 'paragraph_open', children: null },
      { type: 'paragraph_close', children: null },
    ];
    const result = flattenTokens(tokens as any);
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('paragraph_open');
  });

  it('handles nested inline tokens recursively', () => {
    const tokens = [
      {
        type: 'inline',
        children: [
          {
            type: 'inline',
            children: [{ type: 'text', children: null }],
          },
        ],
      },
    ];
    const result = flattenTokens(tokens as any);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('text');
  });

  it('returns empty array for empty input', () => {
    expect(flattenTokens([])).toEqual([]);
  });
});
