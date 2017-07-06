import React from 'react';
import { Linking, Text, View } from 'react-native';
import FitImage from 'react-native-fit-image';

import MarkdownIt from 'markdown-it';

import { markdownStyles } from './lib/style';
import tokenToAST from './lib/tokenToAST';
import { AstRenderer } from './lib/AstGenerator';
import markdownItBlockPlugin from './lib/markdownItBlockPlugin';

/* code is still in beta, thats why im disabling linter */
/* eslint-disable */

const openUrl = url => {
	Linking.openURL(url);
};

const hasParents = (parents, type) => {
	return parents.findIndex(el => el.type === type) > -1;
};

const reactRenderer = new AstRenderer({
	// when unknown elements are introduced, so it wont break
	unknown: (node, children) => {
		return <View>{children}</View>;
	},

	// `root` and `text` are special cases
	root: children => <View children={children} />,
	text: (node, children, parentNodes) => {
		return <Text style={markdownStyles.text}>{node.content}</Text>;
	},
	span: (node, children) => <Text>{children}</Text>,
	strong: (node, children) => {
		return <Text style={[markdownStyles.strong]}>{children}</Text>;
	},

	s: (node, children) => {
		return <Text style={markdownStyles.strikethrough}>{children}</Text>;
	},
	a: (node, children) => {
		return (
			<Text style={markdownStyles.a} onPress={() => openUrl(node.attributes.href)}>{children}</Text>
		);
	},
	em: (node, children) => {
		return <Text style={markdownStyles.em}>{children}</Text>;
	},
	CHECKLIST: (node, children) => {
		return <View style={markdownStyles.em}>{children}</View>;
	},

	// the rest are simply mapping xml tags to components

	h1: (node, children) => {
		return <Text style={[markdownStyles.heading, markdownStyles.heading1]}>{children}</Text>;
	},
	h2: (node, children) => (
		<Text style={[markdownStyles.heading, markdownStyles.heading2]}>{children}</Text>
	),
	h3: (node, children) => (
		<Text style={[markdownStyles.heading, markdownStyles.heading3]}>{children}</Text>
	),
	h4: (node, children) => (
		<Text style={[markdownStyles.heading, markdownStyles.heading4]}>{children}</Text>
	),
	h5: (node, children) => (
		<Text style={[markdownStyles.heading, markdownStyles.heading5]}>{children}</Text>
	),
	h6: (node, children) => (
		<Text style={[markdownStyles.heading, markdownStyles.heading6]}>{children}</Text>
	),

	// ????

	p: (node, children) => <View children={children} style={[markdownStyles.paragraph]} />,

	blockquote: (node, children) => <View>{children}</View>,
	code: (node, children) => <View>{children}</View>,
	pre: (node, children) => <View>{children}</View>,
	ul: (node, children) => {
		return <View style={[markdownStyles.list, { paddingLeft: 20 }]}>{children}</View>;
	},
	ol: (node, children) => {
		return <View style={[markdownStyles.list, { paddingLeft: 20 }]}>{children}</View>;
	},
	li: (node, children, parents) => {
		if (hasParents(parents, 'CHECKLIST')) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ marginLeft: -10, marginRight: 10, lineHeight: 40 }}>{'\u2713'}</Text>
					<View style={[markdownStyles.listItem]}>{children}</View>
				</View>
			);
		}

		if (hasParents(parents, 'ul')) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ marginLeft: -10, marginRight: 10, lineHeight: 40 }}>{'\u00B7'}</Text>
					<View style={[markdownStyles.listItem]}>{children}</View>
				</View>
			);
		}

		if (hasParents(parents, 'ol')) {
			return (
				<View style={{ flexDirection: 'row' }}>
					<Text style={{ width: 20, lineHeight: 40 }}>{node.index + 1}</Text>
					<View style={[markdownStyles.listItem]}>{children}</View>
				</View>
			);
		}

		return <View style={[markdownStyles.listItem]}>{children}</View>;
	},
	table: (node, children) => <View style={[markdownStyles.table]}>{children}</View>,
	thead: (node, children) => <View style={[markdownStyles.tableHeader]}>{children}</View>,
	tbody: (node, children) => <View>{children}</View>,
	th: (node, children) => {
		return <View style={[markdownStyles.tableHeaderCell]}>{children}</View>;
	},
	tr: (node, children, parentNodes) => {
		return <View style={[markdownStyles.tableRow]}>{children}</View>;
	},
	td: (node, children, parentNodes) => {
		return <View style={[markdownStyles.tableRowCell]}>{children}</View>;
	},
	hr: (node, children) => <View style={[markdownStyles.hr]}>{children}</View>,
	br: (node, children) => <Text>{'\n\n'}</Text>,
	img: (node, children) => {
		return <FitImage source={{ uri: node.attributes.src }} />;
	},
});

let md = MarkdownIt().use(markdownItBlockPlugin, 'CHECKLIST');

function convertToTokens(source) {
	let result = [];
	try {
		result = md.parse(source, {});
	} catch (err) {}
	return result;
}

/**
 *
 * @param source
 * @param {AstRenderer} [renderer]
 * @returns {XML}
 */
export default function markdown(source, renderer = reactRenderer) {
	const tokens = convertToTokens(source);
	const asttree = tokenToAST(tokens);

	return <View>{renderer.render(asttree)}</View>;
}
