const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This gets the number of unlearned items in the selected chapter
router.get('/progress', (req, res) => {
  const userId = req.query.userId;
  const chapterId = req.query.chapterId;
  const queryText = `SELECT COUNT(item_id) FROM user_items
    WHERE item_user_id = ${userId}
    AND item_chapter_id = ${chapterId}
    AND learned_status = true;`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows[0].count);
    }).catch((error) => {
      console.log('Error in COUNT /items/progress', error)
      res.sendStatus(500);
  });
});
  
// This gets the number of unlearned items in the selected chapter
router.get('/total', (req, res) => {
  const userId = req.query.userId;
  const chapterId = req.query.chapterId;
  const queryText = `SELECT COUNT(item_id) FROM user_items
    WHERE item_user_id = ${userId} 
    AND item_chapter_id = ${chapterId}`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows[0].count);
    }).catch((error) => {
      console.log('Error in COUNT /items/total', error)
      res.sendStatus(500);
  });
});

// This gets the data for the UserPage chart
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const queryText = `SELECT * FROM user_data
    WHERE user_id = ${userId}
    ORDER BY date DESC
    LIMIT 7;`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in COUNT /data/user (userData)', error)
      res.sendStatus(500);
  });
});

// Query help from https://stackoverflow.com/a/46952400
router.post(`/user/:id`, (req, res) => {
  const userId = req.params.id;
  const queryText = `UPDATE user_data 
    SET total_correct = total_correct + 1
    WHERE user_id = ${userId} AND date=CURRENT_DATE;

    INSERT INTO user_data
    SELECT ${userId}, CURRENT_DATE
    FROM user_data
    WHERE date = CURRENT_DATE
    HAVING COUNT(*) = 0;`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in POST /data/user (userData)', error)
      res.sendStatus(500);
  });
});

module.exports = router;