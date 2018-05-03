import { Linking } from 'react-native';

export default function openUrl(url) {
  if (url) {
    Linking.openURL(url);
  }
}
