/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {Platform, Picker, ScrollView, StyleSheet, Text, View} from "react-native";

import Markdown, {
  AstRenderer,
  getUniqueID,
  PluginContainer,
  renderRules,
  styles,
} from './react-native-markdown-renderer';
//
import markdownItCheckbox from 'markdown-it-checkbox';
import copyAll from './src/copyAll';
import customMarkdownStyle from './src/customMarkdownStyle';
import copyAllCheckboxPlugin from './src/copyAllCheckboxPlugin';
import pluginRules from './src/pluginRules';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

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
        return (
          <Markdown
            rules={pluginRules}
            plugins={[new PluginContainer(markdownItCheckbox, { divWrap: true })]}
            style={customMarkdownStyle}
            children={copyAllCheckboxPlugin}
          />
        );
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
          {this.list.map((val, index) => <Picker.Item key={val.description} label={val.description} value={index} />)}
        </Picker>

        <ScrollView>{this.getView(this.state.view)}</ScrollView>
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
