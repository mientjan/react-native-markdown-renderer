/**
 *
 */
export default class AstRenderer {

	/**
     *
	 * @param {Object.<string, function>} renderRules
	 * @param {any} style
	 */
  constructor(renderRules, style) {
    this._renderRules = renderRules;
    this._style = style;
  }

  /**
     *
	 * @param {string} type
	 * @return {string}
	 */
  getRenderFunction = type => {
    const renderFunction = this._renderRules[type];
    if (!renderFunction) {
      throw new Error(`${type} renderer not defined`);
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
      return renderFunction(node, [], parentNodes, this._style);
    }

    const children = node.children.map(value => {
      return this.renderNode(value, parents);
    });

    return renderFunction(node, children, parentNodes, this._style);
  };

  /**
   *
   * @param nodes
   * @return {*}
   */
  render = nodes => {
    const children = nodes.map(value => {
      return this.renderNode(value, []);
    });
    const renderFunction = this.getRenderFunction('root');
    return renderFunction(children);
  };
}
