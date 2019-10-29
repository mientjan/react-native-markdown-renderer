import { StyleSheet } from 'react-native'

export default function mergeStyleSheets(styleSheet1, styleSheet2) {
  const mergedStyles = {}
  Object.keys(styleSheet1).forEach(key => {
    if (styleSheet2[key]) {
      mergedStyles[key] = StyleSheet.flatten([styleSheet1[key], styleSheet2[key]])
    } else {
      mergedStyles[key] = StyleSheet.flatten(styleSheet1[key])
    }
  });
  Object.keys(styleSheet2).filter(key => !styleSheet1[key]).forEach(key => {
    mergedStyles[key] = StyleSheet.flatten(styleSheet2[key])
  });
  return StyleSheet.create(mergedStyles);
}
