import React from 'react';

const recursivePropUpdate = (children, getProps) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(
      children,
      getProps(children),
      recursivePropUpdate(children.props.children, getProps)
    );
  }
  if (Array.isArray(children)) {
    return React.Children.map(children, child =>
      recursivePropUpdate(child, getProps)
    );
  }
  return children;
};

/**
 *
 * @param Array<any> children
 * @param Array<number> styles
 * @param {string} type
 */
export default function applyStyle(children, styles, type) {
  return children.map(child => {
    if (child.type.displayName !== type) return child;
    return recursivePropUpdate(child, element => {
      return {
        style: [element.props.style, styles],
      };
    });
  });
}
