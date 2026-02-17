import getUniqueID from './getUniqueID';
import getTokenTypeByToken from './getTokenTypeByToken';
import type { ASTNode } from '../../types';

interface TokenInput {
  type?: string;
  tag?: string;
  content?: string;
  attrs?: [string, string][] | null;
  info?: string;
  meta?: unknown;
  block?: boolean;
  markup?: string;
  nesting?: number;
  children?: TokenInput[] | null;
  [key: string]: unknown;
}

function createNode(token: TokenInput, tokenIndex: number): ASTNode {
  const type = getTokenTypeByToken(token);
  const content = token.content || '';

  let attributes: Record<string, string> = {};

  if (token.attrs) {
    attributes = token.attrs.reduce<Record<string, string>>((prev, curr) => {
      const [name, value] = curr;
      return { ...prev, [name]: value };
    }, {});
  }

  return {
    type,
    sourceType: token.type || '',
    sourceInfo: token.info || '',
    sourceMeta: token.meta,
    block: token.block || false,
    markup: token.markup || '',
    key: getUniqueID(),
    content,
    tokenIndex,
    index: 0,
    attributes,
    children: tokensToAST(token.children || null),
  };
}

export default function tokensToAST(tokens: TokenInput[] | null | undefined): ASTNode[] {
  const stack: ASTNode[][] = [];
  let children: ASTNode[] = [];

  if (!tokens || tokens.length === 0) {
    return [];
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const astNode = createNode(token, i);

    if (!(astNode.type === 'text' && astNode.children.length === 0 && astNode.content === '')) {
      astNode.index = children.length;

      if (token.nesting === 1) {
        children.push(astNode);
        stack.push(children);
        children = astNode.children;
      } else if (token.nesting === -1) {
        children = stack.pop()!;
      } else if (token.nesting === 0) {
        children.push(astNode);
      }
    }
  }

  return children;
}
