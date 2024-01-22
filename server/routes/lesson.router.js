const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/chapter/review/:id', (req, res) => {
  const chapterId = req.params.id;
  const userLimit = req.user.size;
  const queryText = `SELECT * FROM user_items
    JOIN items ON items.i_id = user_items.item_id
    WHERE item_chapter_id = ${chapterId}
    AND learned_status = true
    ORDER BY repetition ASC
    LIMIT ${userLimit};`;
  pool.query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /lesson/chapter', error)
      res.sendStatus(500);
  });
});

router.get('/chapter/learn/:id', (req, res) => {
const chapterId = req.params.id;
const userLimit = req.user.size;
const queryText = `SELECT * FROM user_items
  JOIN items ON items.i_id = user_items.item_id
  WHERE item_chapter_id = ${chapterId}
  AND learned_status = false
  LIMIT ${userLimit};`;
  pool.query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /lesson/chapter', error)
      res.sendStatus(500);
  });
});

router.get('/deck/review/:id', (req, res) => {
  const deckId = req.params.id;
  const userLimit = req.user.size;
  const queryText = `SELECT * FROM user_items
    JOIN items ON items.i_id = user_items.item_id
    WHERE item_deck_id = ${deckId}
    AND learned_status = true
    ORDER BY repetition ASC
    LIMIT ${userLimit};`;
  pool.query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /lesson/deck', error)
      res.sendStatus(500);
  });
});

router.get('/deck/learn/:id', (req, res) => {
  const deckId = req.params.id;
  const userLimit = req.user.size;
  const queryText = `SELECT * FROM user_items
    JOIN items ON items.i_id = user_items.item_id
    WHERE item_deck_id = ${deckId}
    AND learned_status = false
    LIMIT ${userLimit};`;
  pool.query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /lesson/deck', error)
      res.sendStatus(500);
  });
});

  module.exports = router;