const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('GET /items');
    const chapterId = req.params.id;
    const queryText = `SELECT * FROM items
        WHERE chapter_id = ${chapterId}`;
    pool.query(queryText)
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /items', error)
        res.sendStatus(500);
    });
});

router.post('/', (req, res, next) => {
    const itemValues = [
        req.body.item,
        req.body.description,
        req.body.tags,
        req.body.hint
    ]
    const queryText = `INSERT INTO "items" (item, description, tags, hint)
      VALUES ($1, $2, $3, $4);`;

    pool.query(queryText, itemValues)
      .then(result => {
        res.sendStatus(201);
      }).catch((error) => {
        console.log('Error posting new item: ', error);
        res.sendStatus(500);
      });
  });

module.exports = router;