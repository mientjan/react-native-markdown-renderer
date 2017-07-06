import { StyleSheet } from 'react-native';
import colors from '../../common/colors';
import fonts from '../../common/fonts';
// import metrics from '../../common/metrics';

export const markdownStyles = StyleSheet.create({
  view: {},
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: '500',
  },
  del: {
    backgroundColor: colors.BLACK,
  },
  em: {
    fontStyle: 'italic',
  },
  heading: {
    fontFamily: fonts.NEUEHAASUNICAPRO_REGULAR,
  },
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
    backgroundColor: colors.GREY,
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
    borderColor: colors.BLACK,
    borderRadius: 3,
    // backgroundColor: 'red',
  },
  tableHeader: {
    // backgroundColor: 'red',
    // flexDirection: 'row',
  },
  tableHeaderCell: {
    flex: 1,
    color: colors.BLACK,
    fontWeight: 'bold',
    padding: 5,
    // backgroundColor: 'green',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: colors.BLACK,
    flexDirection: 'row',
  },
  tableRowLast: {
    borderColor: colors.TRANSPARENT,
  },
  tableRowCell: {
    flex: 1,
    padding: 5,
  },
  text: {
    fontFamily: fonts.NEUEHAASUNICAPRO_REGULAR,
    color: colors.BLACK,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  a: {
    textDecorationLine: 'underline',
  },
  u: {
    borderColor: colors.AM_BRAND_BLUE,
    borderBottomWidth: 1,
  },
});
