const express = require('express')
const taskRouter = express.Router()
const pool = require('../modules/pool')

taskRouter.get('/', (req, res) => {
    const queryText = `SELECT * FROM todos ORDER BY "dueDate"`

    pool.query(queryText)
    .then((result) => {
        console.log(result)
        res.send(result.rows)
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })
})

taskRouter.post('/', (req, res) => {
    const queryText = `INSERT INTO todos ("task", "dueDate")
    VALUES ($1, $2)`
    console.log(req.body.dueDate)

    pool.query(queryText, [req.body.task, req.body.dueDate])
    .then((result) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })
})

taskRouter.delete('/:id', (req, res) => {
    let id = req.params.id
    const queryText = `DELETE FROM todos WHERE id = $1`

    pool.query(queryText, [id])
    .then((result) => {
        res.sendStatus(204)
    }).catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })
})

module.exports = taskRouter