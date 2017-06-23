'use strict';

const storage  = require('../lib/storage.js');

class Article {
  constructor(title, author, id){
    this.title = title;
    this.author = author;
    this.id = id;
  }
  save(){
    return storage.setItem(this);
  }
  update(){
    return storage.updateItem(this);
  }
  delete() {
    return storage.deleteItem(this.id);
  }
}
Article.findById = (id) => {
  return storage.fetchItem(id)
  .then(data => {
    return new Article(data.content, id);
  });
};

module.exports = Article;
