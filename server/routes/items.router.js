const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This gets all items for the selected chapter
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

// This gets items in the same language for study session
router.get('/language/:id', (req, res) => {
  const languageId = req.params.id;
  const queryText = `SELECT * FROM items
    WHERE language_id = ${languageId}`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /items/language', error)
      res.sendStatus(500);
  });
});

// This updates all items' 'learned_status' to false in the selected chapter
// then updates all items' 'repetition' to 0 in the selected chapter
router.put('/reset/learned', (req, res) => {
  const chapterId = req.body.params.chapterId;
  const userId = req.body.params.userId;
  const queryText = `UPDATE user_items SET "learned_status" = false
    WHERE "item_chapter_id" = ${chapterId}
    AND "item_user_id" = ${userId};`;
  pool.query(queryText)
    .then(result => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('Error in PUT /items/reset/learned', error);
      res.sendStatus(500);
  });
});

router.put('/reset/repetition', (req, res) => {
  const chapterId = req.body.params.chapterId;
  const userId = req.body.params.userId;
  const queryText = `UPDATE user_items SET "repetition" = 0 
  WHERE "item_chapter_id" = ${chapterId}
  AND "item_user_id" = ${userId};`;
  pool.query(queryText)
  .then(result => {
    res.sendStatus(201);
  }).catch(error => {
    console.log('Error in PUT /items/reset/repetition', error);
    res.sendStatus(500)
  })
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