import uniqid from "uniqid";
export default class List {
  constructor() {
    this.list = [];
  }

  addItems(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.list.push(item);
    return item;
  }

  clearList() {
    this.list = [];
  }

  deleteItem(id) {
    const index = this.list.forEach((el) => el.id === id);
    this.list.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.list.find((el) => el.id === id).count = newCount;
  }
}
