import type { ReactElement } from 'react';
import type MarkdownIt from 'markdown-it';
import tokensToAST from './util/tokensToAST';
import { stringToTokens } from './util/stringToTokens';
import { cleanupTokens } from './util/cleanupTokens';
import groupTextTokens from './util/groupTextTokens';
import type { ASTNode } from '../types';

export default function parser(
  source: string,
  renderer: (nodes: ASTNode[]) => ReactElement,
  markdownIt: MarkdownIt
): ReactElement {
  const tokens = stringToTokens(source, markdownIt);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cleaned = cleanupTokens(tokens as any[]);
  const grouped = groupTextTokens(cleaned);

  const astTree = tokensToAST(grouped as any[]);

  return renderer(astTree);
}
