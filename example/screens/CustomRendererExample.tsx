import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Markdown, {
  AstRenderer,
  renderRules,
  styles as defaultMarkdownStyles,
} from 'react-native-markdown-renderer';

const customStyles = {
  ...defaultMarkdownStyles,
  heading: {
    fontWeight: '600' as const,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  heading1: {
    fontSize: 32,
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
};

const renderer = new AstRenderer(renderRules, customStyles);

const copy = `# h1 Heading 8-)
## h2 Heading 8-)
### h3 Heading 8-)

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
`;

export default function CustomRendererExample() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Markdown renderer={renderer}>{copy}</Markdown>
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
