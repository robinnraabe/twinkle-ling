const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/chapter/review/:id', (req, res) => {
  const chapterId = req.params.id;
  const queryText = `SELECT * FROM user_chapters
    WHERE chapter_id = ${chapterId}
    AND WHERE learning_status = review;`;
  pool.query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /lesson/chapter', error)
      res.sendStatus(500);
  });
});

// need to get items where chapter_id matches? AND where learned of user_chapters < total

router.get('/chapter/learn/:id', (req, res) => {
const chapterId = req.params.id;
const queryText = `SELECT * FROM user_chapters
  WHERE chapter_id = ${chapterId}
  AND WHERE learned < total;`;
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
  const queryText = `SELECT * FROM chapters
    WHERE deck_id = ${deckId}
    AND WHERE learned < total;`;
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
  const queryText = `SELECT * FROM user_chapters
    WHERE deck_id = ${deckId}
    AND WHERE learned < total;`;
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