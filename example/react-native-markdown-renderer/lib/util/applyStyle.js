import React, { Component } from 'react';
import { Text } from 'react-native';

/**
 *
 * @param Array<any> children
 * @param Array<number> styles
 * @param {string} type
 */
export default function applyStyle(children, styles, type) {
  if (!(styles instanceof Array)) {
    styles = [styles];
  }

  return children.map(child => {
    if (child.type.displayName === type) {
      return <Text key={child.key} {...child.props} style={[].concat(child.props.style, styles)} />;
    }

    return child;
  });
}
