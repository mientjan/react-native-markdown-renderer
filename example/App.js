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

import MarkdownIt from 'markdown-it';

const md = MarkdownIt({
	typographer: true,
	linkify: true,
});

md.linkify.tlds('.py', false);  // disables .py as top level domain
        // Reload with full tlds list
md.linkify.tlds('onion', true)            // Add unofficial `.onion` domain
md.linkify.add('git:', 'http:')           // Add `git:` protocol as "alias"
md.linkify.add('ftp:', null)              // Disable `ftp:` ptotocol
md.linkify.set({ fuzzyIP: true });        // Enable IPs in fuzzy links (without schema)

md.linkify.add('@', {
	validate: function (text, pos, self) {
		var tail = text.slice(pos);

		if (!self.re.twitter) {
			self.re.twitter =  new RegExp(
				'^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')'
			);
		}
		if (self.re.twitter.test(tail)) {
			// Linkifier allows punctuation chars before prefix,
			// but we additionally disable `@` ("@@mention" is invalid)
			if (pos >= 2 && tail[pos - 2] === '@') {
				return false;
			}
			return tail.match(self.re.twitter)[0].length;
		}
		return 0;
	},
	normalize: function (match) {
		match.url = 'https://twitter.com/' + match.url.replace(/^@/, '');
	}
});

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
      <Markdown markdownit={md} children={linkedimg} />
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
    routes: [{ key: 'all', title: 'All' }, { key: 'linkedimg', title: 'Linked Images' }],
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
}
