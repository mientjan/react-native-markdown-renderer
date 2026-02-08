import type { ReactNode } from 'react';

export interface ASTNode {
  type: string;
  sourceType: string;
  sourceInfo: string;
  sourceMeta: unknown;
  block: boolean;
  markup: string;
  key: string;
  content: string;
  tokenIndex: number;
  index: number;
  attributes: Record<string, string>;
  children: ASTNode[];
}

export type RenderFunction = (
  node: ASTNode,
  children: ReactNode[],
  parentNodes: ASTNode[],
  styles: MarkdownStyles
) => ReactNode;

export interface RenderRules {
  [name: string]: RenderFunction;
}

export type MarkdownStyles = Record<string, unknown>;
