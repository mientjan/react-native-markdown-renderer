import React, { Component, PropTypes } from "react";
import { Text, View } from "react-native";
import getUniqueID from "./util/getUniqueID";

export function rootRenderRule(children, styles) {
  return <View key={getUniqueID()} style={styles.root}>{children}</View>;
}

/**
 *
 */
export default class AstRenderer {
  /**
   *
   * @param {Object.<string, function>} renderRules
   * @param {any} style
   */
  constructor(renderRules, style, onLinkPress, testID) {
    this._renderRules = renderRules;
    this._style = style;
    this._onLinkPress = onLinkPress;
    this._testID = testID
  }

  /**
   *
   * @param {string} type
   * @return {string}
   */
  getRenderFunction = type => {
    const renderFunction = this._renderRules[type];

    if (!renderFunction) {
      throw new Error(
        `${type} renderRule not defined example: <Markdown rules={renderRules}>`
      );
    }
    return renderFunction;
  };

  /**
   *
   * @param node
   * @param parentNodes
   * @return {*}
   */
  renderNode = (node, parentNodes) => {
    const renderFunction = this.getRenderFunction(node.type);

    const parents = [...parentNodes];
    parents.unshift(node);

    if (node.type === "text") {
      return renderFunction(node, [], parentNodes, this._style, this._testID);
    }

    const children = node.children.map(value => {
      return this.renderNode(value, parents, this._testID);
    });

    if (node.type === "link" || node.type === "blocklink") {
      return renderFunction(node, children, parentNodes, this._style, this._onLinkPress, this._testID);
    }

    return renderFunction(node, children, parentNodes, this._style, this._testID);
  };

  /**
   *
   * @param nodes
   * @return {*}
   */
  render = nodes => {
    const children = nodes.map(value => this.renderNode(value, []));
    return rootRenderRule(children, this._style);
  };
}
