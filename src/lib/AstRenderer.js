import getUniqueID from './util/getUniqueID';
import convertAdditionalStyles from './util/convertAdditionalStyles';
/**
 *
 */
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
  ) {
    this._renderRules = renderRules;
    this._style = style;
    this._onLinkPress = onLinkPress;
    this._maxTopLevelChildren = maxTopLevelChildren;
    this._topLevelMaxExceededItem = topLevelMaxExceededItem;
    this._allowedImageHandlers = allowedImageHandlers;
    this._defaultImageHandler = defaultImageHandler;

    // this is all the style props that are unique to <Text> components as of 07/Nov/2019
    this._textStyleProps = [
      'textShadowOffset',
      'color',
      'fontSize',
      'fontStyle',
      'fontWeight',
      'lineHeight',
      'textAlign',
      'textDecorationLine',
      'textShadowColor',
      'fontFamily',
      'textShadowRadius',
      'includeFontPadding',
      'textAlignVertical',
      'fontVariant',
      'letterSpacing',
      'textDecorationColor',
      'textDecorationStyle',
      'textTransform',
      'writingDirection',
    ];
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
  renderNode = (node, parentNodes) => {
    const renderFunction = this.getRenderFunction(node.type);

    const parents = [...parentNodes];
    parents.unshift(node);

    if (node.type === 'text') {
      // we build up a style object for text types, this effectively grabs the styles from parents and
      // applies them in order of priority parent (most) to child (least) priority
      // so that if we overwride the text style, it does not overwrite a header1 style, for instance.
      const styleObj = {};

      for (let a = 0; a < parentNodes.length; a++) {
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
          refStyle = {...refStyle, ...this._style[parentNodes[a].type]};
        }

        // then work out if any of them are text styles that should be used in the end.
        const arr = Object.keys(refStyle);

        for (let b = 0; b < arr.length; b++) {
          if (this._textStyleProps.includes(arr[b])) {
            styleObj[arr[b]] = refStyle[arr[b]];
          }
        }
      }

      return renderFunction(node, [], parentNodes, this._style, styleObj);
    }

    const children = node.children.map(value => {
      return this.renderNode(value, parents);
    });

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

    return renderFunction(node, children, parentNodes, this._style);
  };

  /**
   *
   * @param nodes
   * @return {*}
   */
  render = nodes => {
    let children = nodes.map(value => this.renderNode(value, []));
    const root = {type: 'root', key: getUniqueID()};

    if (
      this._maxTopLevelChildren &&
      children.length > this._maxTopLevelChildren
    ) {
      children = children.slice(0, this._maxTopLevelChildren);
      children.push(this._topLevelMaxExceededItem);
    }

    return this.getRenderFunction(root.type)(root, children, null, this._style);
  };
}
