'use strict';

const router = require('../lib/router.js');

const Article = require('../model/article.js');

router.post('/api/articles', (req, res) => {
  if(!req.body.title || !req.body.author)
    return res.sendStatus(400);
  let body = req.body;
  new Article(body.title, body.author)
.save()
.then(article => res.sendJSON(200, article));
})
.catch(err => {res.sendStatus(500);
});
router.get('/api/articles', (req,res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);
  Article.findById(req.url.query.id)
    .then(article => res.sendJSON(200, article))
    .catch(err => {
      console.error(err);
      res.sendStatus(404);
    });
});

router.put('/api/articles', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Article.findById(req.url.query.id)
 .then(article => {
   article.title = req.body.title;
   article.author = req.body.author;
   return article.update();
 })
 .then(article => res.sendJSON(202, article))
 .catch(err => res.sendStatus(404));
});
router.delete('/api/articles', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);

  Article.findById(req.url.query.id)
   .then(article => {
     return article.delete();
   })
   .then(article => res.sendJSON(200, article))
   .catch(err => res.sendStatus(404));
});
