import React from 'react';
import type { ReactNode, ReactElement } from 'react';
import { View } from 'react-native';
import getUniqueID from './util/getUniqueID';
import type { ASTNode, RenderRules, RenderFunction, MarkdownStyles } from '../types';

export function rootRenderRule(children: ReactNode[], styles: MarkdownStyles): ReactElement {
  return (
    <View key={getUniqueID()} style={styles.root as any}>
      {children}
    </View>
  );
}

export default class AstRenderer {
  private _renderRules: RenderRules;
  private _style: MarkdownStyles;

  constructor(renderRules: RenderRules, style?: MarkdownStyles) {
    this._renderRules = renderRules;
    this._style = style || {};
  }

  getRenderFunction = (type: string): RenderFunction => {
    const renderFunction = this._renderRules[type];

    if (!renderFunction) {
      throw new Error(`${type} renderRule not defined example: <Markdown rules={renderRules}>`);
    }
    return renderFunction;
  };

  renderNode = (node: ASTNode, parentNodes: ASTNode[]): ReactNode => {
    const renderFunction = this.getRenderFunction(node.type);

    const parents = [...parentNodes];
    parents.unshift(node);

    if (node.type === 'text') {
      return renderFunction(node, [], parentNodes, this._style);
    }

    const children = node.children.map((value) => {
      return this.renderNode(value, parents);
    });

    return renderFunction(node, children, parentNodes, this._style);
  };

  render = (nodes: ASTNode[]): ReactElement => {
    const children = nodes.map((value) => this.renderNode(value, []));
    return rootRenderRule(children, this._style);
  };
}
