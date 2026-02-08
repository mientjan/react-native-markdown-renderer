import Token from './Token';

interface GroupableToken {
  block?: boolean;
  [key: string]: unknown;
}

export default function groupTextTokens<T extends GroupableToken>(tokens: T[]): (T | Token)[] {
  const result: (T | Token)[] = [];

  let hasGroup = false;
  tokens.forEach((token) => {
    if (!token.block && !hasGroup) {
      hasGroup = true;
      result.push(new Token('textgroup', 1));
      result.push(token);
    } else if (!token.block && hasGroup) {
      result.push(token);
    } else if (token.block && hasGroup) {
      hasGroup = false;
      result.push(new Token('textgroup', -1));
      result.push(token);
    } else {
      result.push(token);
    }
  });

  return result;
}
