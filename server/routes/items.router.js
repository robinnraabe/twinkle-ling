const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  const chapterId = req.params.id;
  const queryText = `SELECT * FROM items
    WHERE chapter_id = ${chapterId}`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /items', error)
      res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  const itemValues = [
    req.body.chapter_id,
    req.body.item,
    req.body.description,
    req.body.tags,
    req.body.hints
  ]
  const queryText = `INSERT INTO "items" (chapter_id, item, description, tags, hints)
    VALUES ($1, $2, $3, $4, $5);`;

  pool.query(queryText, itemValues)
    .then(result => {
      res.sendStatus(201);
    }).catch((error) => {
      console.log('Error posting new item: ', error);
      res.sendStatus(500);
    });
  });

module.exports = router;