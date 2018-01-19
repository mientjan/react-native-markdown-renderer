export default function removeInlineTokens(tokens) {
  const result = tokens.reduce((curr, token) => {
    if (token.type === 'inline') {
      if (token.children && token.children.length > 0) {
        let filtered = removeInlineTokens(token.children);

        curr = [...curr, ...filtered];
      } else {
      }
    } else {
      curr = [...curr, token];
    }

    return curr;
  }, []);

  return result;
}
