/// <reference types="react" />
/// <reference types="react-native" />
/// <reference types="markdownIt" />

import React, { Component } from "react";
import {View, StyleSheet, RegisteredStyle} from "react-native";
import * as MarkdownIt from "markdown-it";

declare class Markdown extends Component<object, object> {}

export declare function getUniqueID(): string;
export declare function openUrl(url: string): void;

export declare function hasParents(parents: Array<any>, type: string): boolean;

interface IRenderFunction {
  (
    node: any,
    children: Array<Component>,
    parent: Component,
    styles: any
  ): Component;
}

interface renderRules {
  [name: string]: IRenderFunction;
}

interface IMarkdownParser {
  parse: (value: string, options: any) => Array<MarkdownIt.Token>;
}

interface IHashMap<T> {
  [index: string]: T
}

interface IASTNode {
	type:string;
	sourceType: string; // original source token name
	key: string;
	content: string;
	tokenIndex: number;
	index: number;
	attributes: IHashMap<string|number|any>;
	children: Array<IASTNode>,
}

export declare class AstRenderer {
  constructor(renderRules: renderRules, style: any);
  getRenderFunction(type: string): IRenderFunction;
  renderNode(node: any, parentNodes: ReadonlyArray<any>): Component;
  render(nodes: Array<any>): View;
}

export declare function parser(
  source: string,
  renderer: (any) => View,
  parser: IMarkdownParser
): any;

export declare function stringToTokens(
  source: string,
  markdownIt: IMarkdownParser
): Array<MarkdownIt.Token>;

export declare function tokensToAST(tokens: ReadonlyArray<MarkdownIt.Token>): Array<IASTNode>;

interface PluginContainerResult<A> {
	[index: number]: any;
	0: A;
}

export declare class PluginContainer<A> {
	constructor<A>(plugin: A, ...options:Array<any>);
	toArray(): [A, any];
}

export declare function blockPlugin(md: any, name: string, options: object): any;

export declare var styles: any;

// export {
//   getUniqueID,
//   openUrl,
//   hasParents,
//   renderRules,
//   AstRenderer,
//   parser,
//   stringToTokens,
//   tokensToAST,
//   MarkdownIt,
//   PluginContainer,
//   blockPlugin,
//   styles
// };

export default Markdown;
