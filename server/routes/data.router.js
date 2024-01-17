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

module.exports = router;