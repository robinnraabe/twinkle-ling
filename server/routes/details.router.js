const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This returns the details for a single selected deck
router.get('/:id', (req, res) => {
  let deckId = req.params.id;
  const queryText = `SELECT 
    decks."id",
    decks.title,
    decks.image_url,
    decks.details,
    decks.contributor_id,
    decks.public_status,
    "user".username,
    languages."language"
    FROM 
    "decks"
    JOIN "user" ON "user"."id" = decks.creator_id
    JOIN "languages" ON languages.id = decks.language_id
    WHERE decks.id = ${deckId};`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch(error => {
      console.log('Error in GET /deck/id', error);
      res.sendStatus(500);
  })
});

// This adds a new deck to the database
router.post('/', (req, res) => {
  const deckValues = [
    req.body.title,
    req.body.details,
    req.body.language_id,
    req.body.creator_id,
    req.body.contributor_id,
    req.body.image_url
  ]
  const queryText = `INSERT INTO "decks" (title, details, language_id, creator_id, contributor_id, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING "id";`;
  pool.query(queryText, deckValues)
    .then(result => {
      console.log('deckId:', result);
      const deckId = result.rows[0].id;
      const joinedQueryText = `INSERT INTO "user_decks" 
        ("user_id", "deck_id")
        VALUES ($1, $2);`;
      const userId = req.body.creator_id;        
      const joinedValues = [userId, deckId];
      pool.query(joinedQueryText, joinedValues)
        .then(result => {
          res.sendStatus(201);
        }).catch(error => {
          console.log(error);
          res.sendStatus(500)
      })
    }).catch(error => {
      console.log('Error in POST /deck: ', error);
      res.sendStatus(500)
    })
});

  module.exports = router;
        

