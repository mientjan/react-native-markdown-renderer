/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { Platform, Picker, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';

import Markdown, {
  AstRenderer,
  getUniqueID,
  PluginContainer,
  renderRules,
  styles,
} from './react-native-markdown-renderer';
//
import markdownItCheckbox from 'markdown-it-checkbox';
import { TabViewAnimated, SceneMap, TabBar } from 'react-native-tab-view';

import copyAll from './src/copyAll';
import customMarkdownStyle from './src/customMarkdownStyle';
import copyAllCheckboxPlugin from './src/copyAllCheckboxPlugin';
import pluginRules from './src/pluginRules';
import all from './src/copy/all';
import linkedimg from './src/copy/linkedimg';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const rules = {
  // added custom block element defined by plugin
  block: (node, children, parents, style) => {
    return (
      <Text key={getUniqueID()} style={{ backgroundColor: 'green' }}>
        {children}
      </Text>
    );
  },

  checkbox: (node, children, parents, style) => {
    return (
      <Text key={getUniqueID()} style={{ backgroundColor: 'green' }}>
        {children}
      </Text>
    );
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

const routes = {
  all: () => (
    <ScrollView>
      <Markdown
        children={all}
        style={StyleSheet.create({
          foo: {
            color: 'red',
          },
        })}
        rules={{
          foo: (node, children, parent, styles) => (
            <Text key={node.key} style={styles.foo}>
              {node.content}
            </Text>
          ),
        }}
        plugins={[
          new PluginContainer(
            (md, name, options) => {
              const parse = state => {
                const Token = state.Token;

                for (let i = 0; i < state.tokens.length; i++) {
                  const block = state.tokens[i];
                  if (block.type !== 'inline') {
                    continue;
                  }

                  for (let j = 0; j < block.children.length; j++) {
                    const token = block.children[j];
                    if (token.type !== 'text') {
                      continue;
                    }

                    if (token.content === name) {
                      const newToken = new Token(name, '', token.nesting);

                      newToken.content = token.content;
                      block.children = md.utils.arrayReplaceAt(block.children, j, [newToken]);
                    }
                  }
                }
              };

              md.core.ruler.after('inline', name, parse);
            },
            'foo',
            {}
          ),
        ]}
      />
    </ScrollView>
  ),
  linkedimg: () => (
    <ScrollView>
      <Markdown children={linkedimg} />
    </ScrollView>
  ),
};

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class App extends Component {
  state = {
    index: 0,
    routes: [{ key: 'linkedimg', title: 'Linked Images' }],
  };

  handleChangeValue = (itemValue, itemIndex) => {
    this.setState({ view: itemIndex });
  };

  handleIndexChange = index => this.setState({ index });
  renderHeader = props => <TabBar {...props} />;
  renderScene = SceneMap(routes);

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }

  render3() {
    let currentView = this.state.view;

    return (
      <View style={styleSheet.container}>
        <Text>{currentView}</Text>
        <Picker selectedValue={currentView} onValueChange={this.handleChangeValue}>
          {this.list.map((val, index) => <Picker.Item key={val.description} label={val.description} value={index} />)}
        </Picker>
        <ScrollView>{this.getView(currentView)}</ScrollView>
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
