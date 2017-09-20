import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

import FitImage from 'react-native-fit-image';
import getUniqueID from './util/getUniqueID';
import openUrl from './util/openUrl';
import hasParents from './util/hasParents';

const renderRules = {
  // when unknown elements are introduced, so it wont break
  unknown: (node, children, parent, styles) => {
    return (
      <View key={node.key}>
        <Text>unknown {node.type}</Text> {children}
      </View>
    );
  },
};

export default renderRules;
