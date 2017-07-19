import React from 'react';
import { View } from 'react-native';
import MarkdownIt from 'markdown-it';

/**
 *
 * @param {{type: string, tag:string, content: string, children: *, attrs: Array}} token
 * @param {number} tokenIndex
 * @return {{type: string, content, tokenIndex: *, index: number, attributes: {}, children: *}}
 */
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
      const [name, value] = curr;
      return { ...prev, [name]: value };
    }, {});
  }

  return {
    type,
    content,
    tokenIndex,
    index: 0,
    attributes,
    children: tokenToAST(token.children),
  };
}

/**
 *
 * @param {Array<{type: string, tag:string, content: string, children: *, attrs: Array}>}tokens
 * @return {Array}
 */
export function tokensToAST(tokens) {
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

let md = MarkdownIt();

export function stringToTokens(source, mdit = md) {
  let result = [];
  try {
    result = mdit.parse(source, {});
  } catch (err) {}
  return result;
}

/**
 *
 * @param source
 * @param {AstRenderer} [renderer]
 * @returns {View}
 */
export function parser(source, renderer, converter = stringToTokens) {
  const tokens = converter(source);
  const asttree = tokensToAST(tokens);

  return <View>{renderer.render(asttree)}</View>;
}
