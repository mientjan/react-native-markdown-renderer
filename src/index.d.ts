/// <reference types="react" />
/// <reference types="react-native" />

import React, { Component } from "react";
import { View } from "react-native";

declare class Markdown extends Component<object, object> {}

declare function getUniqueID(): string;
declare function openUrl(url: string): void;

declare function hasParents(parents: Array<any>, type: string): boolean;

declare function renderFunction(
  node: any,
  children: Array<Component>,
  parent: Component,
  styles: any
): Component;

declare interface renderRules {
  [name: string]: renderFunction;
}

declare class AstRenderer {
  constructor(renderRules: renderRules, style: any);
  getRenderFunction(type: string): renderFunction;
  renderNode(node: any, parentNodes: Array<any>): Component;
  render(nodes: Array<any>): View;
}

declare interface markdownToken {}

declare function parser(
  source: string,
  renderer: (any) => View,
  parser: { parse: (value: string, options: any) => Array<markdownToken> }
): any;

declare function stringToTokens(): any;
declare function tokensToAST(): any;
declare function MarkdownIt(): any;
declare function PluginContainer(): any;
declare function blockPlugin(): any;
declare function styles(): any;

export {
  getUniqueID,
  openUrl,
  hasParents,
  renderRules,
  AstRenderer,
  parser,
  stringToTokens,
  tokensToAST,
  MarkdownIt,
  PluginContainer,
  blockPlugin,
  styles
};

export default Markdown;
