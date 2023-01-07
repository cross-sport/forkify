export default class Like {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    this.persisData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);

    this.likes.splice(index, 1);
    this.persisData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1; //თუ მოძებნა ინდექსი და -1 განსხვავებული იყო დააბრუნებს true თუ არადა false
  }

  persisData() {
    localStorage.setItem("like", JSON.stringify(this.likes)); //localstorage ჩასმა
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem("like"));
    if (storage) this.likes = storage;
  }

  getLikeNumber() {
    return this.likes.length;
  }
}
