import getIsTextType from './getIsTextType';
import Token from "./Token";

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

  if (!tokens) {
    return result;
  }

  let currentStack = new Stack();
  const stacks = [];

  for (var i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (getIsTextType(token.tag || token.type)) {
      if (token.nesting === 1) {
        currentStack.add(token);
        stacks.push(currentStack);
        currentStack = new Stack();
      } else if (token.nesting === -1) {
        currentStack.add(token);
        currentStack = stacks.pop();
      } else if (token.nesting === 0) {
        currentStack.add(token);
      }
    } else {
      if (currentStack.count > 1) {
        result.push(new Token('textgroup', 1));

        while (currentStack.data.length) {
          result.push(currentStack.data.shift());
        }

        result.push(new Token('textgroup', -1));
      } else if (currentStack.count === 1) {
        while (currentStack.data.length) {
          result.push(currentStack.data.shift());
        }
      }

      result.push(token);
    }
  }

  return result;
}
