const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET /api/languages');
    pool.query(`SELECT * FROM "languages";`
    ).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /api/languages:', error)
        res.sendStatus(500);
    });
});

module.exports = router;