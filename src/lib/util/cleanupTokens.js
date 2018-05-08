import getTokenTypeByToken from './getTokenTypeByToken';
import removeInlineTokens from './removeInlineTokens';
import getIsTextType from './getIsTextType';

export function cleanupTokens(tokens) {
  tokens = removeInlineTokens(tokens);
  tokens.forEach(token => (token.type = getTokenTypeByToken(token)));

  /**
   * changing a link token to a blocklink to fix issue where link tokens with
   * nested non text tokens breaks component
   */
  const stack = [];
  tokens = tokens.reduce((acc, token, index) => {
    if (token.type === 'link' && token.nesting === 1) {
      stack.push(token);
    } else if (stack.length > 0 && token.type === 'link' && token.nesting === -1) {
      if (stack.some(stackToken => !getIsTextType(stackToken.type))) {
        stack[0].type = 'blocklink';
        token.type = 'blocklink';
      }

      stack.push(token);

      while (stack.length) {
        acc.push(stack.shift());
      }
    } else if (stack.length > 0) {
      stack.push(token);
    } else {
      acc.push(token);
    }

    return acc;
  }, []);

  return tokens;
}
