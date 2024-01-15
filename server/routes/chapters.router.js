const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
  console.log('GET /chapters');
  const deckId = req.params.id;

  const queryText = `SELECT * FROM user_chapters
  JOIN chapters ON chapters.id = user_chapters.chapter_id
  WHERE deck_id = ${deckId}
  ORDER BY title;`;

  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET /chapters', error)
      res.sendStatus(500);
  });
});

// This adds a new deck to the database
router.post('/', (req, res) => {
  const chapterValues = [
    req.body.deck_id,
    req.body.title,
    req.body.learned,
    req.body.reviewed,
    req.body.total,
    req.body.edit
  ]
  const queryText = `INSERT INTO "chapters" (deck_id, title, edit)
    VALUES ($1, $2, $3)`;

  pool.query(queryText, chapterValues)
    .then(result => {
      res.sendStatus(201);
    }).catch(error => {
      console.log('Error in POST /chapters: ', error);
      res.sendStatus(500)
  });
});

router.put('/:id', (req, res) => {
  const queryText = `UPDATE user_chapters SET "edit" = NOT "edit" WHERE "chapter_id" = $1;`;

  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in PUT /chapters', error);
      res.sendStatus(500);
  });
})

router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM chapters WHERE "id" = $1;`;

  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in DELETE /chapters', error);
      res.sendStatus(500);
  });
})

module.exports = router;