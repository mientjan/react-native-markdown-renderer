import { StyleSheet } from 'react-native';

/**
 *
 */
const customMarkdownStyle = StyleSheet.create({
	view: {},
	codeBlock: {
		fontFamily: 'Courier',
		fontWeight: '500',
	},
	del: {
		backgroundColor: '#000000',
	},
	em: {
		fontStyle: 'italic',
	},
	heading: {},
	heading1: {
		fontSize: 32,
		backgroundColor: "#FFCC00"
	},
	text: {},
	strikethrough: {
		textDecorationLine: 'line-through',
		color: '#FF0000'
	},
	a: {
		textDecorationLine: 'underline',
		color: '#FF0000'
	},
	u: {
		borderColor: '#000000',
		borderBottomWidth: 1,
	},

	strong: {
		fontSize: 50,
		fontFamily: 'Courier',
	}
});

export default customMarkdownStyle;