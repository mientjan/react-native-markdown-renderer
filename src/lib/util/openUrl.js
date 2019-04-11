import { Platform } from 'react-native';
import SafariView from 'react-native-safari-view';
import { ANIMATIONS_SLIDE, CustomTabs } from 'react-native-custom-tabs';

export default function openUrl(url) {
  if (url) {
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
      });
    } else {
      CustomTabs.openURL(url, {
        animations: ANIMATIONS_SLIDE,
      });
    }
  }
}
