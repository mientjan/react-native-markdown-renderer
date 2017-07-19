import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { parser, stringToTokens, tokensToAST } from './lib/parser';
import defaultRenderFunctions from './lib/defaultRenderFunctions';
import AstRenderer from './lib/AstRenderer';
import MarkdownIt from 'markdown-it';

export {
  defaultRenderFunctions,
  AstRenderer,
  parser,
  stringToTokens,
  tokensToAST,
  MarkdownIt
};

/**
 * Base Markdown component
 * @author Mient-jan Stelling
 */
export default class Markdown extends Component {
  /**
	 * Definition of the prop types
	 */
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderer: PropTypes.instanceOf(AstRenderer),
  };

  /**
	 * Default Props
	 */
  static defaultProps = {
    renderer: new AstRenderer(defaultRenderFunctions),
  };

  copy = '';

  /**
   * Only when the copy changes will the markdown render again.
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const copy = nextProps.children instanceof Array
      ? nextProps.children.join('')
      : nextProps.children;

    if (copy !== this.copy) {
      this.copy = copy;
      return true;
    }

    return false;
  }

  getCopyFromProps() {
    return this.props.children instanceof Array
      ? this.props.children.join('')
      : this.props.children;
  }

  /**
   *
   * @return {View}
   */
  render() {
    const copy = (this.copy = this.getCopyFromProps());
    const { renderer } = this.props;

    return parser(copy, renderer);
  }
}
