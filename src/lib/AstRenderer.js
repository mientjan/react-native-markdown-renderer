import {StyleSheet} from 'react-native';

import getUniqueID from './util/getUniqueID';
import convertAdditionalStyles from './util/convertAdditionalStyles';

import textStyleProps from './data/textStyleProps';

export default class AstRenderer {
  /**
   *
   * @param {Object.<string, function>} renderRules
   * @param {any} style
   */
  constructor(
    renderRules,
    style,
    onLinkPress,
    maxTopLevelChildren,
    topLevelMaxExceededItem,
    allowedImageHandlers,
    defaultImageHandler,
    debugPrintTree,
  ) {
    this._renderRules = renderRules;
    this._style = style;
    this._onLinkPress = onLinkPress;
    this._maxTopLevelChildren = maxTopLevelChildren;
    this._topLevelMaxExceededItem = topLevelMaxExceededItem;
    this._allowedImageHandlers = allowedImageHandlers;
    this._defaultImageHandler = defaultImageHandler;
    this._debugPrintTree = debugPrintTree;
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
        `${type} renderRule not defined example: <Markdown rules={renderRules}>`,
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
  renderNode = (node, parentNodes, isRoot = false) => {
    const renderFunction = this.getRenderFunction(node.type);
    const parents = [...parentNodes];

    if (this._debugPrintTree === true) {
      let str = '';

      for (let a = 0; a < parents.length; a++) {
        str = str + '-';
      }

      console.log(`${str}${node.type}`);
    }

    parents.unshift(node);

    // calculate the children first
    let children = node.children.map(value => {
      return this.renderNode(value, parents);
    });

    // text node type is a special case because it is always the 'last' element in a chain

    if (
      node.type === 'text' ||
      node.type === 'list_item' ||
      node.type === 'code_inline' ||
      node.type === 'code_block' ||
      node.type === 'fence'
    ) {
      // we build up a style object for text types, this effectively grabs the styles from parents and
      // applies them in order of priority parent (most) to child (least) priority
      // so that if we overwride the text style, it does not overwrite a header1 style, for instance.
      const styleObj = {};

      for (let a = parentNodes.length - 1; a > -1; a--) {
        // grab and additional attributes specified by markdown-it
        let refStyle = {};

        if (
          parentNodes[a].attributes &&
          parentNodes[a].attributes.style &&
          typeof parentNodes[a].attributes.style === 'string'
        ) {
          refStyle = convertAdditionalStyles(parentNodes[a].attributes.style);
        }

        // combine in specific styles for the object
        if (this._style[parentNodes[a].type]) {
          refStyle = {
            ...refStyle,
            ...StyleSheet.flatten(this._style[parentNodes[a].type]),
          };
        }

        // then work out if any of them are text styles that should be used in the end.
        const arr = Object.keys(refStyle);

        for (let b = 0; b < arr.length; b++) {
          if (textStyleProps.includes(arr[b])) {
            styleObj[arr[b]] = refStyle[arr[b]];
          }
        }
      }

      return renderFunction(node, children, parentNodes, this._style, styleObj);
    }

    // render any special types of nodes that have different renderRule function signatures

    if (node.type === 'link' || node.type === 'blocklink') {
      return renderFunction(
        node,
        children,
        parentNodes,
        this._style,
        this._onLinkPress,
      );
    }

    if (node.type === 'image') {
      return renderFunction(
        node,
        children,
        parentNodes,
        this._style,
        this._allowedImageHandlers,
        this._defaultImageHandler,
      );
    }

    // cull top level children

    if (
      isRoot === true &&
      this._maxTopLevelChildren &&
      children.length > this._maxTopLevelChildren
    ) {
      children = children.slice(0, this._maxTopLevelChildren);
      children.push(this._topLevelMaxExceededItem);
    }

    // render anythign else that has a normal signature

    return renderFunction(node, children, parentNodes, this._style);
  };

  /**
   *
   * @param nodes
   * @return {*}
   */
  render = nodes => {
    const root = {type: 'root', key: getUniqueID(), children: nodes};
    return this.renderNode(root, [], true);
  };
}
