import type MarkdownIt from 'markdown-it';
import type MdToken from 'markdown-it/lib/token.mjs';

export function stringToTokens(source: string, markdownIt: MarkdownIt): MdToken[] {
  let result: MdToken[] = [];
  try {
    result = markdownIt.parse(source, {});
  } catch (err) {
    console.warn(err);
  }

  return result;
}
