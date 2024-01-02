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

module.exports = router;