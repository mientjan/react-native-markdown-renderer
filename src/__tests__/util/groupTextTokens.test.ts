import groupTextTokens from '../../lib/util/groupTextTokens';

describe('groupTextTokens', () => {
  it('wraps consecutive non-block tokens in textgroup open/close tokens', () => {
    const tokens = [
      { type: 'text', block: false },
      { type: 'strong', block: false },
    ];
    const result = groupTextTokens(tokens as any);
    expect(result[0]).toMatchObject({ type: 'textgroup', nesting: 1 });
    expect(result[1]).toMatchObject({ type: 'text' });
    expect(result[2]).toMatchObject({ type: 'strong' });
  });

  it('does not wrap block tokens', () => {
    const tokens = [{ type: 'paragraph', block: true }];
    const result = groupTextTokens(tokens as any);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ type: 'paragraph' });
  });

  it('handles mixed block and non-block sequences', () => {
    const tokens = [
      { type: 'text', block: false },
      { type: 'image', block: true },
      { type: 'text', block: false },
    ];
    const result = groupTextTokens(tokens as any);
    // textgroup_open, text, textgroup_close, image, textgroup_open, text
    expect(result[0]).toMatchObject({ type: 'textgroup', nesting: 1 });
    expect(result[1]).toMatchObject({ type: 'text' });
    expect(result[2]).toMatchObject({ type: 'textgroup', nesting: -1 });
    expect(result[3]).toMatchObject({ type: 'image' });
    expect(result[4]).toMatchObject({ type: 'textgroup', nesting: 1 });
    expect(result[5]).toMatchObject({ type: 'text' });
  });

  it('handles all-block input (no textgroup wrappers)', () => {
    const tokens = [
      { type: 'paragraph', block: true },
      { type: 'heading', block: true },
    ];
    const result = groupTextTokens(tokens as any);
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ type: 'paragraph' });
    expect(result[1]).toMatchObject({ type: 'heading' });
  });

  it('handles all-inline input (single textgroup wrapper)', () => {
    const tokens = [
      { type: 'text', block: false },
      { type: 'em', block: false },
      { type: 'text', block: false },
    ];
    const result = groupTextTokens(tokens as any);
    expect(result[0]).toMatchObject({ type: 'textgroup', nesting: 1 });
    expect(result).toHaveLength(4); // open + 3 tokens
  });
});
