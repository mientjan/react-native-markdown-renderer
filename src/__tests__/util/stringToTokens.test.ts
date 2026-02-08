import MarkdownIt from 'markdown-it';
import { stringToTokens } from '../../lib/util/stringToTokens';

describe('stringToTokens', () => {
  const md = MarkdownIt({ typographer: true });

  it('parses simple markdown string via markdownIt.parse()', () => {
    const tokens = stringToTokens('# Hello', md);
    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens[0].type).toBe('heading_open');
  });

  it('returns empty array for empty string', () => {
    const tokens = stringToTokens('', md);
    expect(tokens).toEqual([]);
  });

  it('returns empty array on parse error', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const brokenMd = {
      parse() {
        throw new Error('parse error');
      },
    } as unknown as MarkdownIt;
    const result = stringToTokens('test', brokenMd);
    expect(result).toEqual([]);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
