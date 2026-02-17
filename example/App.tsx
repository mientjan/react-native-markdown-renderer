import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import BasicExample from './screens/BasicExample';
import CustomStylesExample from './screens/CustomStylesExample';
import CustomRulesExample from './screens/CustomRulesExample';
import CustomRendererExample from './screens/CustomRendererExample';
import MarkdownFileExample from './screens/MarkdownFileExample';

export type RootStackParamList = {
  Home: undefined;
  BasicExample: undefined;
  CustomStylesExample: undefined;
  CustomRulesExample: undefined;
  CustomRendererExample: undefined;
  MarkdownFileExample: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Markdown Examples' }}
          />
          <Stack.Screen
            name="BasicExample"
            component={BasicExample}
            options={{ title: 'Basic' }}
          />
          <Stack.Screen
            name="MarkdownFileExample"
            component={MarkdownFileExample}
            options={{ title: 'From .md File' }}
          />
          <Stack.Screen
            name="CustomStylesExample"
            component={CustomStylesExample}
            options={{ title: 'Custom Styles' }}
          />
          <Stack.Screen
            name="CustomRulesExample"
            component={CustomRulesExample}
            options={{ title: 'Custom Rules' }}
          />
          <Stack.Screen
            name="CustomRendererExample"
            component={CustomRendererExample}
            options={{ title: 'Custom Renderer' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}
