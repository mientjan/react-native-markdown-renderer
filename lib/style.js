import { StyleSheet } from 'react-native';

export const markdownStyles = StyleSheet.create({
  view: {},
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: '500',
  },
  del: {
    backgroundColor: '#000000',
  },
  em: {
    fontStyle: 'italic',
  },
  heading: {},
  heading1: {
    fontSize: 32,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  hr: {
    backgroundColor: '#000000',
    height: 1,
  },
  inlineCode: {
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  list: {
    // flexDirection: 'row',
    // backgroundColor: 'red',
  },
  listItem: {
    flexWrap: 'wrap',
    // backgroundColor: 'green',
  },
  listItemBullet: {
    fontSize: 20,
    lineHeight: 20,
  },
  listItemNumber: {
    fontWeight: 'bold',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  strong: {
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
    // backgroundColor: 'red',
  },
  tableHeader: {
    // backgroundColor: 'red',
    // flexDirection: 'row',
  },
  tableHeaderCell: {
    flex: 1,
    color: '#000000',
    fontWeight: 'bold',
    padding: 5,
    // backgroundColor: 'green',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  tableRowLast: {
    borderColor: 'transparent',
  },
  tableRowCell: {
    flex: 1,
    padding: 5,
  },
  text: {
    color: '#000000',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  a: {
    textDecorationLine: 'underline',
  },
  u: {
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
});
