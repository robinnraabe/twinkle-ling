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

// This adds a new chapter to the database
router.post('/', (req, res) => {
  const chapterValues = [
    req.body.deck_id,
    req.body.title
  ]
  const queryText = `INSERT INTO "chapters" (deck_id, title)
    VALUES ($1, $2);`;

  pool.query(queryText, chapterValues)
    .then(result => {
      console.log(result);
      const chapterId = result.rows[0].id;
      const userChaptersQuery = `INSERT INTO "user_chapters" 
        (chapter_id, user_id)
        VALUES ($1, $2);`;

      const userId = req.body.user_id;   
      const userChapterValues = [chapterId, userId];   

      pool.query(userChaptersQuery, userChapterValues)
        .then(result => {
          res.sendStatus(201);
        }).catch('Error in POST /chapters/userChapters', error => {
          console.log(error);
          res.sendStatus(500)
      })
      res.sendStatus(201);
    }).catch(error => {
      console.log('Error in POST /chapters', error);
      res.sendStatus(500)
    });
});

// This updates the learned + total count for the selected chapter
router.put('/learned/:id', (req, res) => {
  const queryValues = [req.body.learned, req.body.total, req.body.userId, req.params.id];
  const queryText = `UPDATE user_chapters SET learned = $1, total = $2 WHERE user_id = $3 AND chapter_id = $4;`;

  pool.query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in PUT /chapters/learned', error);
      res.sendStatus(500);
    });
})

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
  console.log('Request to delete chapter', req.params.id);
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