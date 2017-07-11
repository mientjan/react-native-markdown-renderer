import React from 'react';

let uuid = new Date().getTime();

/**
 *
 */
export class AstRenderer {
  /**
     *
	 * @return {string}
	 */
  static getUniqueID() {
    uuid++;
    return uuid.toString(16);
  }

  /**
   *
   * @param {Object.<string, function>} renderFunctions
   */
  constructor(renderFunctions) {
    this._renderFunctions = renderFunctions;
  }

  /**
     *
	 * @param {string} type
	 * @return {string}
	 */
  getRenderFunction = type => {
    const renderFunction = this._renderFunctions[type];
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
      return renderFunction(node, [], parentNodes);
    }

    const children = node.children.map(value => {
      return this.renderNode(value, parents);
    });

    return renderFunction(node, children, parentNodes);
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
