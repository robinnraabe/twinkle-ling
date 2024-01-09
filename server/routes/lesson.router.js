const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/chapter/review/:id', (req, res) => {
    console.log('GET /chapters');
    const chapterId = req.params.id;
    const queryText = `SELECT * FROM user_chapters
      WHERE chapter_id = ${chapterId}
      AND WHERE learned > 0`;
    pool.query(queryText)
      .then((result) => {
          console.log(result.rows);
          res.send(result.rows);
      }).catch((error) => {
          console.log('Error in GET /lesson', error)
          res.sendStatus(500);
      });
  });

  router.get('/chapter/learn/:id', (req, res) => {
    console.log('GET /chapters');
    const chapterId = req.params.id;
    const queryText = `SELECT * FROM user_chapters
      WHERE chapter_id = ${chapterId}
      AND WHERE learned < total`;
    pool.query(queryText)
      .then((result) => {
          console.log(result.rows);
          res.send(result.rows);
      }).catch((error) => {
          console.log('Error in GET /lesson', error)
          res.sendStatus(500);
      });
  });

  module.exports = router;