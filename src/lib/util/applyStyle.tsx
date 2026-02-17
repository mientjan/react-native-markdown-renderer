import React from 'react';
import type { ReactElement } from 'react';
import { Text } from 'react-native';

export default function applyStyle(
  children: ReactElement[],
  styles: unknown | unknown[],
  type: string
): ReactElement[] {
  const styleArray = Array.isArray(styles) ? styles : [styles];

  return children.map((child) => {
    if (child == null) {
      return child;
    }
    const displayName = (child.type as { displayName?: string })?.displayName;
    if (displayName === type) {
      return <Text key={child.key} {...child.props} style={[].concat(child.props.style, styleArray as never[])} />;
    }

    return child;
  });
}
