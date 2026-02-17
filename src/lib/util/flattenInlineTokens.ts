interface FlattenableToken {
  type: string;
  children?: FlattenableToken[] | null;
  [key: string]: unknown;
}

export default function flattenTokens<T extends FlattenableToken>(tokens: T[]): T[] {
  return tokens.reduce<T[]>((acc, curr) => {
    if (curr.type === 'inline' && curr.children && curr.children.length > 0) {
      const children = flattenTokens(curr.children as T[]);
      while (children.length) {
        acc.push(children.shift()!);
      }
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);
}
