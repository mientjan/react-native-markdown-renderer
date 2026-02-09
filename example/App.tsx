import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Markdown from 'react-native-markdown-renderer';

const copy = `# React Native Markdown Renderer

## Features

This library renders **Markdown** in *React Native* using native components.

### Supported elements

- **Bold** and *italic* text
- ~~Strikethrough~~
- [Links](https://github.com)
- Inline \`code\`

### Lists

1. First ordered item
2. Second ordered item
3. Third ordered item

- Unordered item A
- Unordered item B
- Unordered item C

### Code block

\`\`\`
const greeting = "Hello, Markdown!";
console.log(greeting);
\`\`\`

### Blockquote

> Markdown is a lightweight markup language that you can use
> to add formatting elements to plaintext text documents.

### Table

| Feature       | Status |
|---------------|--------|
| Headings      | Done   |
| Bold / Italic | Done   |
| Links         | Done   |
| Images        | Done   |
| Tables        | Done   |
| Code blocks   | Done   |

---

*Rendered with react-native-markdown-renderer v4*
`;

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Markdown>{copy}</Markdown>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
