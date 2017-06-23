'use strict';

const router = require('../lib/router.js');

const Article = require('../lib/model/article.js');

router.post('/api/articles', (req, res) => {
  if(!req.body.title)
    return res.sendStatus(400);
});
new Article(req.body.title, req.body.author)
.save()
.then(article => res.sendJSON(200, article))
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
