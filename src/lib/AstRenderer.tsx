import React from 'react';
import type { ReactNode, ReactElement } from 'react';
import { Text, View } from 'react-native';
import getUniqueID from './util/getUniqueID';
import type { ASTNode, RenderRules, RenderFunction, MarkdownStyles, AstRendererOptions } from '../types';

export function rootRenderRule(children: ReactNode[], styles: MarkdownStyles): ReactElement {
  return (
    <View key={getUniqueID()} style={styles.root as any}>
      {children}
    </View>
  );
}

const DEFAULT_ALLOWED_IMAGE_HANDLERS = [
  'data:image/png;base64',
  'data:image/gif;base64',
  'data:image/jpeg;base64',
  'https://',
  'http://',
];
const DEFAULT_IMAGE_HANDLER = 'http://';

export default class AstRenderer {
  private _renderRules: RenderRules;
  private _style: MarkdownStyles;
  private _onLinkPress?: (url: string) => boolean | void;
  private _debugPrintTree: boolean;
  private _maxTopLevelChildren: number | null;
  private _topLevelMaxExceededItem: ReactNode;
  private _allowedImageHandlers: string[];
  private _defaultImageHandler: string | null;

  constructor(renderRules: RenderRules, style?: MarkdownStyles, options?: AstRendererOptions) {
    this._renderRules = renderRules;
    this._style = style || {};
    this._onLinkPress = options?.onLinkPress;
    this._debugPrintTree = options?.debugPrintTree ?? false;
    this._maxTopLevelChildren = options?.maxTopLevelChildren ?? null;
    this._topLevelMaxExceededItem = options?.topLevelMaxExceededItem ?? (
      <Text key="maxTopLevelChildren">...</Text>
    );
    this._allowedImageHandlers = options?.allowedImageHandlers ?? DEFAULT_ALLOWED_IMAGE_HANDLERS;
    this._defaultImageHandler = options?.defaultImageHandler ?? DEFAULT_IMAGE_HANDLER;
  }

  getRenderFunction = (type: string): RenderFunction => {
    const renderFunction = this._renderRules[type];

    if (!renderFunction) {
      const fallback = this._renderRules['unknown'];
      if (!fallback) {
        throw new Error(
          `${type} renderRule not defined and no "unknown" fallback rule exists. Add a rule via <Markdown rules={{${type}: ...}}>`
        );
      }
      return fallback;
    }
    return renderFunction;
  };

  renderNode = (node: ASTNode, parentNodes: ASTNode[]): ReactNode => {
    if (this._debugPrintTree) {
      const prefix = '-'.repeat(parentNodes.length);
      console.log(`${prefix}${node.type}`);
    }

    const renderFunction = this.getRenderFunction(node.type);

    const parents = [...parentNodes];
    parents.unshift(node);

    if (node.type === 'text') {
      return renderFunction(node, [], parentNodes, this._style);
    }

    const children = node.children.map((value) => {
      return this.renderNode(value, parents);
    });

    if (node.type === 'link' || node.type === 'blocklink') {
      return renderFunction(node, children, parentNodes, this._style, this._onLinkPress);
    }

    if (node.type === 'image') {
      return renderFunction(
        node, children, parentNodes, this._style,
        this._allowedImageHandlers, this._defaultImageHandler
      );
    }

    return renderFunction(node, children, parentNodes, this._style);
  };

  render = (nodes: ASTNode[]): ReactElement => {
    let children = nodes.map((value) => this.renderNode(value, []));

    if (this._maxTopLevelChildren != null && children.length > this._maxTopLevelChildren) {
      children = children.slice(0, this._maxTopLevelChildren);
      children.push(this._topLevelMaxExceededItem);
    }

    return rootRenderRule(children, this._style);
  };
}
