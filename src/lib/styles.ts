import { Platform, StyleSheet } from 'react-native';
import PlatformEnum from './data/PlatformEnum';

const monospaceFont = Platform.select({
  [PlatformEnum.IOS]: 'Menlo',
  [PlatformEnum.ANDROID]: 'monospace',
  default: 'monospace',
});

export const styles = StyleSheet.create({
  root: {},
  view: {},
  codeBlock: {
    backgroundColor: '#f6f8fa',
    padding: 16,
    borderRadius: 6,
    fontFamily: monospaceFont,
    fontSize: 13.6,
    lineHeight: 20,
    marginBottom: 16,
  },
  codeInline: {
    backgroundColor: 'rgba(175,184,193,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    fontFamily: monospaceFont,
    fontSize: 13.6,
  },
  del: {
    textDecorationLine: 'line-through',
  },
  em: {
    fontStyle: 'italic',
  },
  headingContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 16,
  },
  heading: {
    fontWeight: '600',
  },
  heading1: {
    fontSize: 32,
    lineHeight: 40,
  },
  heading1Container: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d8dee4',
  },
  heading2: {
    fontSize: 24,
    lineHeight: 30,
  },
  heading2Container: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d8dee4',
  },
  heading3: {
    fontSize: 20,
    lineHeight: 25,
  },
  heading4: {
    fontSize: 16,
    lineHeight: 20,
  },
  heading5: {
    fontSize: 14,
    lineHeight: 18,
  },
  heading6: {
    fontSize: 13.6,
    lineHeight: 17,
    color: '#656d76',
  },
  hr: {
    backgroundColor: '#d0d7de',
    height: 4,
    marginTop: 24,
    marginBottom: 24,
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: '#d0d7de',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inlineCode: {
    borderRadius: 6,
    backgroundColor: 'rgba(175,184,193,0.2)',
    fontFamily: monospaceFont,
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 13.6,
  },
  list: {
    marginBottom: 16,
  },
  listItem: {
    flex: 1,
    flexWrap: 'wrap',
  },
  listUnordered: {},
  listUnorderedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  listUnorderedItemIcon: {
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 24,
  },
  listUnorderedItemText: {
    fontSize: 16,
    lineHeight: 24,
  },
  listOrdered: {},
  listOrderedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  listOrderedItemIcon: {
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 24,
  },
  listOrderedItemText: {
    lineHeight: 24,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  hardbreak: {
    width: '100%',
    height: 1,
  },
  strong: {
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#d0d7de',
    marginBottom: 16,
  },
  tableHeader: {
    backgroundColor: '#f6f8fa',
  },
  tableHeaderCell: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#d0d7de',
    fontWeight: '600',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#d0d7de',
    flexDirection: 'row',
  },
  tableRowCell: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#d0d7de',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  link: {
    color: '#0969da',
  },
  blocklink: {
    flex: 1,
    borderColor: '#d0d7de',
    borderBottomWidth: 1,
  },
  u: {
    borderColor: '#d0d7de',
    borderBottomWidth: 1,
  },
  image: {
    flex: 1,
  },
  pre: {
    marginBottom: 16,
  },
});
