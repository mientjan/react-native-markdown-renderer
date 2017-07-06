import React from 'react';

let uuid = new Date().getTime();

export class AstRenderer {
  static getUniqueID() {
    uuid++;

    return uuid.toString(16);
  }

  constructor(renderFns) {
    this.renderFns = renderFns;

    // if(!this.renderFns['default'])
    // {
    //   throw new Error('no default defined in AstRenderer settings')
    // }
  }
  // Lookup render function with error handling
  renderFn = type => {
    const renderFn = this.renderFns[type];
    if (!renderFn) {
      throw new Error(`${type} renderer not defined`);
    }
    return renderFn;
  };
  renderNode = (node, parentNodes) => {
    const renderFn = this.renderFn(node.type);

    const parents = [...parentNodes];
    parents.unshift(node);

    if (node.type === 'text') {
      return renderFn(node, [], parentNodes);
    }

    const children = node.children.map(value => {
      return this.renderNode(value, parents);
    });
    return renderFn(node, children, parentNodes);
  };
  render = nodes => {
    const children = nodes.map(value => {
      return this.renderNode(value, []);
    });
    const renderFn = this.renderFn('root');
    return renderFn(children);
  };
}

export class AstNode {
  constructor(element, props, children, styles) {
    this.element = element;
    this.props = props;
    this.children = children;
    this.styles = styles;
  }

  create() {
    return React.createElement(
      this.element,
      {
        props: this.props,
        style: this.styles,
      },
      this.children.map(el => el.create())
    );
  }
}
