const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "prompts";`
    ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /prompts:', error)
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
    const promptId = req.params.id;
    pool.query(`SELECT * FROM "answers" WHERE prompt_id = ${promptId};`
    ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /prompts/answers:', error)
        res.sendStatus(500);
    });
});

module.exports = router;