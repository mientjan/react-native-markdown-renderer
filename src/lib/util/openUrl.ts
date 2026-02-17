import { Linking } from 'react-native';

export default function openUrl(url: string): void {
  if (url) {
    Linking.openURL(url);
  }
}
