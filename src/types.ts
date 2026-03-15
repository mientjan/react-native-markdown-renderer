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
  styles: MarkdownStyles,
  ...args: unknown[]
) => ReactNode;

export interface RenderRules {
  [name: string]: RenderFunction;
}

export type MarkdownStyles = Record<string, unknown>;

export interface AstRendererOptions {
  onLinkPress?: (url: string) => boolean | void;
  debugPrintTree?: boolean;
  maxTopLevelChildren?: number | null;
  topLevelMaxExceededItem?: ReactNode;
  allowedImageHandlers?: string[];
  defaultImageHandler?: string | null;
}
