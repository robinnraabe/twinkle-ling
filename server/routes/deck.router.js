const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// This returns the user's 4 most recent decks on the UserPage
router.get('/user/:id', (req, res) => {
  const queryText = `SELECT title, image_url, details, "language", public_status, 
    lessons_started, lessons_finished, user_id, deck_id, 
    username, size, review_status FROM "decks"
    JOIN user_decks ON decks.id = user_decks.deck_id
    JOIN "user" on "user".id = user_decks.user_id
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
  const queryText = `SELECT DISTINCT decks.id, title, image_url, details, "language", 
  public_status, lessons_started, lessons_finished FROM "decks"
  JOIN "languages" on "languages".id = decks.language_id
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
  const queryText = `SELECT title, image_url, details, "language", public_status, 
    lessons_started, lessons_finished, user_id, deck_id, 
    username, size, review_status FROM "decks"
    JOIN user_decks ON decks.id = user_decks.deck_id
    JOIN "user" on "user".id = user_decks.user_id
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