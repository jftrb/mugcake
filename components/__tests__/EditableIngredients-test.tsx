import { addEmptyItem } from "../recipe/edit/EditableIngredients";

describe('testing extending a list', () => {
  test('Adding a new item to empty list should result in length of 1', () => {
    const createItem = () => {return ''}
    const newList = addEmptyItem(Array<string>(), createItem)
    expect(newList.length).toBe(1);
  });
});