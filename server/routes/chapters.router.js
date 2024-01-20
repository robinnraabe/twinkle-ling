const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
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
    VALUES ($1, $2) 
    RETURNING id;`;

  pool.query(queryText, chapterValues)
    .then(result => {
      const chapterId = result.rows[0].id;
      const userChaptersQuery = `INSERT INTO "user_chapters" 
        (chapter_id, user_id)
        VALUES ($1, $2);`;
  
      const userChapterValues = [chapterId, req.body.user_id];   

      pool.query(userChaptersQuery, userChapterValues)
        .then(result => {
          res.sendStatus(201);
        })
        .catch('Error in POST /chapters/userChapters', error => {
          console.log(error);
          res.sendStatus(500)
      })
    })
    .catch(error => {
      console.log('Error in POST /chapters', error);
      res.sendStatus(500)
  });
});

// This updates the learned count for the selected user_chapter
router.put('/learned/:id', (req, res) => {
  const queryValues = [req.body.learned, req.body.userId, req.params.id];
  const queryText = `UPDATE user_chapters SET learned = $1 WHERE user_id = $2 AND chapter_id = $3;`;

  pool.query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in PUT /chapters/learned', error);
      res.sendStatus(500);
    });
})

router.put('/total/add/:id', (req, res) => {
  const queryText = `UPDATE chapters SET total = total + 1 WHERE id = $1;`;

  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in PUT /chapters/total', error);
      res.sendStatus(500);
    });
})

router.put('/total/subtract/:id', (req, res) => {
  const queryText = `UPDATE chapters SET total = total - 1 WHERE id = $1;`;

  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in PUT /chapters/total', error);
      res.sendStatus(500);
    });
})

router.put('/edit/:id', (req, res) => {
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

router.put('/update', (req, res) => {
  const queryValues = [req.body.title, req.body.chapterId];

  const queryText = `UPDATE "chapters" 
    SET title = $1 WHERE "id" = $2;`;

  pool.query(queryText, queryValues)
    .then((result) => {
      console.log('Successfully updated chapter');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in PUT /chapters/update', error);
      res.sendStatus(500);
  });
});

router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM user_chapters WHERE chapter_id = $1;`;

  pool.query(queryText, [req.params.id])
    .then((result) => {
      const secondQuery = `DELETE FROM chapters WHERE "id" = $1;`;
      pool.query(secondQuery, [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error in DELETE /chapters', error);
        res.sendStatus(500);
    })})
    .catch((error) => {
      console.log('Error in DELETE /chapters', error);
      res.sendStatus(500);
  });
})

module.exports = router;