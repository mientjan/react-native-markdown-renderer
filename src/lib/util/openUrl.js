import { Linking } from 'react-native';

export default function openUrl(url){
	Linking.openURL(url);
};