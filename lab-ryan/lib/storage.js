'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');

let storage = module.exports = {};

const cache = {};

storage.setItem = (data) => {
  data.id = uuid.v1();
  cache[data.id] = data;
  // TODO:  now that it has an id save it to ../data/${id} as json
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
  .then(() => console.log(cache));
  };
};

storage.fetchItem = (id) => {
  console.log('cache', cache);
  console.log('id', id);
  // check if the ../data/${id } file exits and if so read it and parse the json
  let result = fs.readJson(`${__dirname}/../data/${id}`);
  if(result)
    return Promise.resolve(result);
  return Promise.reject(new Error('not found'));
};

storage.updateItem = (data) => {
  if(data.id){
    fs.writeJson(`${__dirname}/../data/${data.id}`, data);
    return Promise.resolve(data);
  }
  return Promise.reject(new Error('data must have id'));
};

storage.deleteItem = (id) => {
  if (id){
    fs.remove(`${__dirname}/../data/${id}`)
    .then(() => {
      console.log('article removed')
    })
    .catch((err) => {
      console.error(err);
    });
    return Promise.resolve();
  }
  return Promise.reject(new Error('not found'));
