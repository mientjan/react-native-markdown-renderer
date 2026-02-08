import hasParents from '../../lib/util/hasParents';

describe('hasParents', () => {
  it('returns true when parent array contains matching type', () => {
    const parents = [{ type: 'blockquote' }, { type: 'paragraph' }];
    expect(hasParents(parents, 'blockquote')).toBe(true);
  });

  it('returns false when parent array does not contain matching type', () => {
    const parents = [{ type: 'blockquote' }, { type: 'paragraph' }];
    expect(hasParents(parents, 'heading')).toBe(false);
  });

  it('returns false for empty parent array', () => {
    expect(hasParents([], 'blockquote')).toBe(false);
  });
});
