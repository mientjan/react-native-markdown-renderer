import getTokenTypeByToken from '../../lib/util/getTokenTypeByToken';

describe('getTokenTypeByToken', () => {
  it('strips _open suffix and appends heading level', () => {
    expect(getTokenTypeByToken({ type: 'heading_open', tag: 'h1' })).toBe('heading1');
  });

  it('strips _close suffix and appends heading level', () => {
    expect(getTokenTypeByToken({ type: 'heading_close', tag: 'h1' })).toBe('heading1');
  });

  it('appends heading level from tag h2', () => {
    expect(getTokenTypeByToken({ type: 'heading_open', tag: 'h2' })).toBe('heading2');
  });

  it('appends heading level from tag h6', () => {
    expect(getTokenTypeByToken({ type: 'heading_open', tag: 'h6' })).toBe('heading6');
  });

  it('returns type as-is for non-heading tokens', () => {
    expect(getTokenTypeByToken({ type: 'paragraph_open' })).toBe('paragraph');
  });

  it('strips _open/_close from non-heading types', () => {
    expect(getTokenTypeByToken({ type: 'blockquote_open' })).toBe('blockquote');
    expect(getTokenTypeByToken({ type: 'blockquote_close' })).toBe('blockquote');
  });

  it('returns "unknown" when token has no type', () => {
    expect(getTokenTypeByToken({})).toBe('unknown');
  });
});
