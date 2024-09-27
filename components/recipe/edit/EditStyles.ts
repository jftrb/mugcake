import { StyleSheet } from "react-native";

export const editStyles = StyleSheet.create({
  sectionTitle: {
    paddingTop: 4,
  },
  contentList: {
    gap: 6,
  },
  contentItemContainer: {
    flexDirection: 'row', 
    flex: 1,
  },
  contentMultiLineEdit: {
    borderWidth: 0.5, 
    flex: 1
  },
  deleteButtonPressArea: {
    marginLeft: 6,
  },
  deleteButton: {
    marginRight: 12, 
    alignSelf: 'flex-start',
  },
})