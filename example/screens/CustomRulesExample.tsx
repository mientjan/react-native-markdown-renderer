import { ScrollView, StyleSheet, SafeAreaView, Text } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import type { ASTNode, RenderRules, MarkdownStyles } from 'react-native-markdown-renderer';
import type { ReactNode } from 'react';

const rules: Partial<RenderRules> = {
  heading1: (node: ASTNode, children: ReactNode[], _parent: ASTNode[], styles: MarkdownStyles) => (
    <Text key={node.key} style={[styles.heading as any, styles.heading1 as any]}>
      [{children}]
    </Text>
  ),
  heading2: (node: ASTNode, children: ReactNode[], _parent: ASTNode[], styles: MarkdownStyles) => (
    <Text key={node.key} style={[styles.heading as any, styles.heading2 as any]}>
      [{children}]
    </Text>
  ),
  heading3: (node: ASTNode, children: ReactNode[], _parent: ASTNode[], styles: MarkdownStyles) => (
    <Text key={node.key} style={[styles.heading as any, styles.heading3 as any]}>
      [{children}]
    </Text>
  ),
};

const copy = `# h1 Heading 8-)
## h2 Heading 8-)
### h3 Heading 8-)

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
`;

export default function CustomRulesExample() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Markdown rules={rules}>{copy}</Markdown>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
});
