const textTypes = [
	'text',
	'span',
	'strong',
	'a',
	's',
	'em',
	// 'h1',
	// 'h2',
	// 'h3',
	// 'h4',
	// 'h5',
	// 'h6',
	// 'h7',
	// 'h8',
	// 'h9',
	'br',
];

/**
 *
 * @param node
 * @return {boolean}
 */
export default function getIsTextType(type) {
	return textTypes.indexOf(type) > -1;
}