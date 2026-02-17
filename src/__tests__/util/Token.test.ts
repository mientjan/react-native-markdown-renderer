import Token from '../../lib/util/Token';

describe('Token', () => {
  it('constructs with type and defaults', () => {
    const token = new Token('text');
    expect(token.type).toBe('text');
    expect(token.nesting).toBe(0);
    expect(token.children).toBeNull();
    expect(token.block).toBe(false);
  });

  it('constructs with all args specified', () => {
    const children = [new Token('child')];
    const token = new Token('heading', 1, children, true);
    expect(token.type).toBe('heading');
    expect(token.nesting).toBe(1);
    expect(token.children).toBe(children);
    expect(token.block).toBe(true);
  });

  it('stores properties correctly', () => {
    const token = new Token('textgroup', -1);
    expect(token.type).toBe('textgroup');
    expect(token.nesting).toBe(-1);
  });
});
