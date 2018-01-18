import getIsTextType from './getIsTextType';
import Token from './Token';

class Stack {
  constructor() {
    this.data = [];
    this.count = 0;
  }

  add(token) {
    this.count += 1 + token.nesting;
    this.data.push(token);
  }
}

export default function groupTextTokens(tokens) {
  const result = [];

  let hasGroup = false;
  tokens.forEach(token => {
    if (getIsTextType(token.tag || token.type) && !hasGroup) {
      hasGroup = true;
      result.push(new Token('textgroup', 1));
    }

    if (!getIsTextType(token.tag || token.type) && hasGroup) {
      hasGroup = false;
      result.push(new Token('textgroup', -1));
    }

    result.push(token);
  });

  return result;
}
