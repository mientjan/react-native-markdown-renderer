import React from "react"
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import {getUniqueID} from "react-native-markdown-renderer";

const rules = {
	div: (node, children, parents) => {
		console.log('node', node);
		return <View key={node.key}style={{ backgroundColor: 'green', flex: 1, flexDirection: 'row'}}>{children}</View>;
	},
	label: (node, children, parents) => {
		return <Text key={node.key}>{children}</Text>;
	},
	input: (node, children, parents) => {
		return <Text key={node.key}>[{node.attributes.checked ? 'x' : ' - '}]</Text>;
	},
};
export default rules;