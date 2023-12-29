const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/user', (req, res) => {
    console.log('GET /decks/user');
    pool.query(`SELECT * FROM "decks"
    JOIN user_decks ON decks.id = user_decks.deck_id
    JOIN "user" on "user".id = user_decks.user_id
    JOIN "languages" on "languages".id = decks.language_id
    WHERE "user".id = 3
    ORDER BY last_used
    LIMIT 5;`
    ).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /decks/user', error)
        res.sendStatus(500);
    });
});

router.get('/public', (req, res) => {
    console.log('GET /decks/public');
    pool.query(`SELECT * FROM "decks"
    JOIN user_decks ON decks.id = user_decks.deck_id
    JOIN "user" on "user".id = user_decks.user_id
    JOIN "languages" on "languages".id = decks.language_id
    WHERE "decks".public_status = true
    ORDER BY last_used
    LIMIT 5;`
    ).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /decks/public', error)
        res.sendStatus(500);
    });
});

router.get('/user/all', (req, res) => {
    // let languageId = req.params.id[0];
    // let user = req.params.id[1];
    const queryText = `SELECT * FROM "decks"
        JOIN user_decks ON decks.id = user_decks.deck_id
        JOIN "user" on "user".id = user_decks.user_id
        JOIN "languages" on "languages".id = decks.language_id
        ORDER BY last_used;`
    console.log('GET /decks/user/all');
    pool.query(queryText
    ).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /user/all', error)
        res.sendStatus(500);
    });
});

router.post('/user/decks', (req, res) => {
  // POST route code here
});

module.exports = router;