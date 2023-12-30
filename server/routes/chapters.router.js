const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('GET /chapters');
    console.log('req.params:', req.params, '. req.body:', req.body);
    const deckId = req.params.id;
    const queryText = `SELECT * FROM chapters
        WHERE deck_id = ${deckId}`;
    pool.query(queryText)
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /chapters', error)
        res.sendStatus(500);
    });
});

module.exports = router;