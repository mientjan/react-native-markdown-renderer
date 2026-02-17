import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { Asset } from 'expo-asset';
import Markdown from 'react-native-markdown-renderer';

/* eslint-disable @typescript-eslint/no-require-imports */
const mdAsset = require('../example_test.md');

export default function MarkdownFileExample() {
  const [copy, setCopy] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const asset = Asset.fromModule(mdAsset);
      await asset.downloadAsync();
      const uri = asset.localUri || asset.uri;
      const response = await fetch(uri);
      setCopy(await response.text());
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {copy ? <Markdown>{copy}</Markdown> : <Text>Loading...</Text>}
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
