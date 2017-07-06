function createNode(token, tokenIndex) {
  let type = 'root';

  if (token) {
    if (!token.tag) {
      type = token.type;
    } else {
      type = token.tag;
    }
  }

  const content = token.content;
  let attributes = {};

  if (token.attrs) {
    attributes = token.attrs.reduce((prev, curr) => {
      return { ...prev, [curr[0]]: curr[1] };
    }, {});
  }

  return {
    type,
    content,
    tokenIndex,
    index: 0,
    attributes,
    children: parseTokens(token.children),
  };
}

function parseTokens(tokens) {
  const stack = [];
  let children = [];

  if (!tokens || tokens.length === 0) {
    return [];
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const astNode = createNode(token, i);

    if (!(astNode.type === 'text' && astNode.children.length === 0 && astNode.content === '')) {
      astNode.index = children.length;
      if (token.nesting === 1) {
        children.push(astNode);
        stack.push(children);
        children = astNode.children;
      } else if (token.nesting === -1) {
        children = stack.pop();
      } else if (token.nesting === 0) {
        if (astNode.type === 'inline') {
          for (let j = 0; j < astNode.children.length; j++) {
            children.push(astNode.children[j]);
          }
        } else {
          children.push(astNode);
        }
      }
    }
  }

  return children;
}

export default function tokenToAST(tokens) {
  return parseTokens(tokens);
}
