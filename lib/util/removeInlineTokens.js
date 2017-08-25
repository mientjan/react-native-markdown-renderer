export default function removeInlineTokens(tokens) {
	const result = [];
	if (!tokens) {
		return result;
	}

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];

		if (token.type === 'inline') {
			if (token.children && token.children.length > 0) {
				removeInlineTokens(token.children).forEach(item => result.push(item));
			}
		} else {
			result.push(token);
		}
	}

	return result;
}