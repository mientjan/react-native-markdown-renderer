import getTokenTypeByToken from './getTokenTypeByToken';
import flattenInlineTokens from './flattenInlineTokens';

interface CleanupToken {
  type: string;
  tag?: string;
  nesting?: number;
  block?: boolean;
  children?: CleanupToken[] | null;
  [key: string]: unknown;
}

export function cleanupTokens<T extends CleanupToken>(tokens: T[]): T[] {
  let result = flattenInlineTokens(tokens);
  result.forEach((token) => {
    token.type = getTokenTypeByToken(token);

    // set image and hardbreak to block elements
    if (token.type === 'image' || token.type === 'hardbreak') {
      token.block = true;
    }
  });

  /**
   * changing a link token to a blocklink to fix issue where link tokens with
   * nested non text tokens breaks component
   */
  const stack: T[] = [];
  result = result.reduce<T[]>((acc, token) => {
    if (token.type === 'link' && token.nesting === 1) {
      stack.push(token);
    } else if (stack.length > 0 && token.type === 'link' && token.nesting === -1) {
      if (stack.some((stackToken) => stackToken.block)) {
        stack[0].type = 'blocklink';
        stack[0].block = true;
        token.type = 'blocklink';
        token.block = true;
      }

      stack.push(token);

      while (stack.length) {
        acc.push(stack.shift()!);
      }
    } else if (stack.length > 0) {
      stack.push(token);
    } else {
      acc.push(token);
    }

    return acc;
  }, []);

  return result;
}
