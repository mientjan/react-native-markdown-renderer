import React, { PureComponent } from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import MarkdownIt from "markdown-it";
import PluginContainer from "./plugin/PluginContainer";
import AstRenderer from "./AstRenderer";

export default class ImageComponent extends PureComponent {
  static propTypes = {
    scaling: PropTypes.oneOf(["strict"]).isRequired,
    uri: PropTypes.string.isRequired
  };

  /**
   * Default Props
   */
  static defaultProps = {};

  ref = null;

  constructor(props) {
    super(props);

    this.state = {};
  }

  onLoad = () => {
    console.log(this.ref);
  };
  onLoadStart = () => {};

  render() {
    return (
      <Image
        ref={ref => (this.ref = ref)}
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        style={{ width: 50, height: 50 }}
        source={{
          uri: this.props.uri
        }}
      />
    );
  }
}
