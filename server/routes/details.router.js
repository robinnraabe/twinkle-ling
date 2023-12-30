const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    let deckId = req.params.id;
    const queryText = `SELECT * FROM "decks"
        WHERE id = ${deckId};`;
    pool.query(queryText)
      .then((result) => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error in GET /deck/id', error);
        res.sendStatus(500);
    })
  });

  module.exports = router;