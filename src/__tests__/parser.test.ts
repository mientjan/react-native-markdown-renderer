import MarkdownIt from 'markdown-it';
import parser from '../lib/parser';
import type { ASTNode } from '../types';

const md = MarkdownIt({ typographer: true });

describe('parser', () => {
  it('parses "# Hello" and calls renderer with AST containing a heading1 node', () => {
    const renderer = jest.fn((nodes: ASTNode[]) => {
      return null as any;
    });
    parser('# Hello', renderer, md);
    expect(renderer).toHaveBeenCalledTimes(1);
    const nodes = renderer.mock.calls[0][0] as ASTNode[];
    const headingNode = nodes.find((n) => n.type === 'heading1');
    expect(headingNode).toBeDefined();
  });

  it('parses "**bold**" and produces strong node', () => {
    const renderer = jest.fn((nodes: ASTNode[]) => null as any);
    parser('**bold**', renderer, md);
    const nodes = renderer.mock.calls[0][0] as ASTNode[];
    // The bold text should be nested inside paragraph > textgroup > strong
    function findType(nodes: ASTNode[], type: string): ASTNode | undefined {
      for (const node of nodes) {
        if (node.type === type) return node;
        const found = findType(node.children, type);
        if (found) return found;
      }
      return undefined;
    }
    expect(findType(nodes, 'strong')).toBeDefined();
  });

  it('parses empty string and calls renderer with empty array', () => {
    const renderer = jest.fn((nodes: ASTNode[]) => null as any);
    parser('', renderer, md);
    expect(renderer).toHaveBeenCalledWith([]);
  });

  it('tokens flow through the full pipeline', () => {
    const renderer = jest.fn((nodes: ASTNode[]) => null as any);
    parser('Hello world', renderer, md);
    expect(renderer).toHaveBeenCalledTimes(1);
    const nodes = renderer.mock.calls[0][0] as ASTNode[];
    expect(nodes.length).toBeGreaterThan(0);
    // Should have paragraph node
    expect(nodes.some((n) => n.type === 'paragraph')).toBe(true);
  });
});
