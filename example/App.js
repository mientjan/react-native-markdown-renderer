import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Picker } from 'react-native';
import Markdown, {
	AstRenderer,
	styles,
	renderRules,
	getUniqueID, PluginContainer,
} from 'react-native-markdown-renderer';
import markdownItCheckbox from 'markdown-it-checkbox';
import copyAll from './src/copyAll';
import customMarkdownStyle from './src/customMarkdownStyle';
import copyAllCheckboxPlugin from "./src/copyAllCheckboxPlugin";
import pluginRules from "./src/pluginRules";

const rules = {
  h1: (node, children, parents) => {
    return <Text key={getUniqueID()} style={{ backgroundColor: 'red' }}>{children}</Text>;
  },
  // added custom block element defined by plugin
  block: (node, children, parents) => {
    return <Text key={getUniqueID()} style={{ backgroundColor: 'green' }}>{children}</Text>;
  },
};

/**
 * i'm overriding the default h1 render function.
 */
const renderer = new AstRenderer(
  {
    ...renderRules,
    ...rules,
  },
  styles
);

export default class App extends Component {
  state = {
    view: 5,
  };

  list = [
    { description: 'default' },
    { description: 'custom renderer' },
    { description: 'custom style sheet' },
    { description: 'custom rules' },
    { description: 'custom rules & styles' },
    { description: 'plugins (checkbox)' },
  ];

  getView(value) {
    switch (value) {
      case 0: {
        return <Markdown children={copyAll} />;
      }
      case 1: {
        return <Markdown renderer={renderer.render} children={copyAll} />;
      }
      case 2: {
        return <Markdown style={customMarkdownStyle} children={copyAll} />;
      }
      case 3: {
        return <Markdown rules={rules} children={copyAll} />;
      }
      case 4: {
        return <Markdown rules={rules} style={customMarkdownStyle} children={copyAll} />;
      }
      case 5: {
        return <Markdown rules={pluginRules} plugins={[new PluginContainer(markdownItCheckbox, {divWrap: true})]} style={customMarkdownStyle} children={copyAllCheckboxPlugin} />;
      }
      default: {
        return <Markdown># Text</Markdown>;
      }
    }
  }

  render() {
    return (
      <View style={styleSheet.container}>
        <Picker
          selectedValue={this.state.view}
          onValueChange={(itemValue, itemIndex) => this.setState({ view: itemIndex })}
        >
          {this.list.map((val, index) =>
            <Picker.Item key={val.description} label={val.description} value={index} />
          )}
        </Picker>

        <ScrollView>
          {this.getView(this.state.view)}
        </ScrollView>
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
