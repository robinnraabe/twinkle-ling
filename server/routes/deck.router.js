const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This returns the user's 4 most recent decks on the UserPage
router.get('/user/:id', (req, res) => {
  const queryText = `SELECT decks.title, decks.image_url, decks.details, languages."language", 
    decks.public_status, decks.lessons_started, decks.lessons_finished, "user".id AS user_id, 
    decks.id AS deck_id, "user".username, creator.username AS creator
    FROM "decks"
    JOIN user_decks ON decks.id = user_decks.deck_id
    JOIN "user" ON "user".id = user_decks.user_id 
    JOIN "user" AS creator ON creator.id = decks.creator_id
    JOIN "languages" on "languages".id = decks.language_id
    WHERE "user".id = $1
    ORDER BY last_used
    LIMIT 4;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log('Error in GET /decks/user:', error)
      res.sendStatus(500);
  });
});

// This returns the top 4 public decks on the UserPage
router.get('/public', (req, res) => {
  const queryText = `SELECT decks.id, decks.title, decks.image_url, decks.details, languages."language", 
    decks.public_status, decks.lessons_started, decks.lessons_finished, creator.username AS creator FROM "decks"
    JOIN "languages" on "languages".id = decks.language_id
    JOIN "user" AS creator ON creator.id = decks.creator_id
    WHERE "decks".public_status = true
    ORDER BY lessons_started
    LIMIT 4;`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error in GET /decks/public:', error)
    res.sendStatus(500);
  });
});

// This returns all of the user's decks on the UserDeckList
router.get('/user/all/:id', (req, res) => {
  console.log(req.params.id);
  const queryText = `SELECT decks.title, decks.image_url, decks.details, languages."language", decks.public_status, 
    decks.lessons_started, decks.lessons_finished, "user".id AS user_id, decks.id AS deck_id,
    "user".username, creator.username AS creator
    FROM "decks"
    JOIN user_decks ON decks.id = user_decks.deck_id
    JOIN "user" ON "user".id = user_decks.user_id 
    JOIN "user" AS creator ON creator.id = decks.creator_id
    JOIN "languages" on "languages".id = decks.language_id
    WHERE "user".id = $1
    ORDER BY last_used;`;
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error in GET decks/user/all:', error)
    res.sendStatus(500);
  });
});

module.exports = router;