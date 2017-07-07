import React from 'react';
import { Linking, View } from 'react-native';

import MarkdownIt from 'markdown-it';
import tokenToAST from './lib/tokenToAST';
import { AstRenderer } from './lib/AstGenerator';
import defaultRenderFunctions from './lib/defaultRenderFunctions';

let md = MarkdownIt();

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
export default function markdown(source, renderer) {
	const tokens = convertToTokens(source);
	const asttree = tokenToAST(tokens);

	return <View>{renderer.render(asttree)}</View>;
}