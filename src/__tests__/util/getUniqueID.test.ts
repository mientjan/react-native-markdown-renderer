import getUniqueID from '../../lib/util/getUniqueID';

describe('getUniqueID', () => {
  it('returns a string starting with rnmr_', () => {
    const id = getUniqueID();
    expect(id).toMatch(/^rnmr_/);
  });

  it('returns unique values on successive calls', () => {
    const id1 = getUniqueID();
    const id2 = getUniqueID();
    const id3 = getUniqueID();
    expect(id1).not.toBe(id2);
    expect(id2).not.toBe(id3);
  });

  it('returns valid hex suffix', () => {
    const id = getUniqueID();
    const suffix = id.replace('rnmr_', '');
    expect(suffix).toMatch(/^[0-9a-f]+$/);
  });
});
