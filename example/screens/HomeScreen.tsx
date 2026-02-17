import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

const examples = [
  {
    name: 'BasicExample' as const,
    title: 'Basic Markdown',
    description: 'Render markdown with default settings',
  },
  {
    name: 'MarkdownFileExample' as const,
    title: 'Markdown from File',
    description: 'Load and render a .md file asset',
  },
  {
    name: 'CustomStylesExample' as const,
    title: 'Custom Styles',
    description: 'Override default heading styles',
  },
  {
    name: 'CustomRulesExample' as const,
    title: 'Custom Rules',
    description: 'Replace render rules for headings',
  },
  {
    name: 'CustomRendererExample' as const,
    title: 'Custom Renderer',
    description: 'Provide a custom AstRenderer instance',
  },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      {examples.map((ex) => (
        <TouchableOpacity
          key={ex.name}
          style={styles.card}
          onPress={() => navigation.navigate(ex.name)}
        >
          <Text style={styles.title}>{ex.title}</Text>
          <Text style={styles.description}>{ex.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d0d7de',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#656d76',
  },
});
