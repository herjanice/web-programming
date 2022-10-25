import express from 'express'
import getNumber from '../core/getNumber.js'
const router = express.Router()

router.post('/start', (_, res) => {
    let number = getNumber(false)
    // res.json({ msg: 'The game has started.'})
    res.json({ msg: number})
})

router.get('/guess', (req, res) => {
    if (req.query.number > 0 && req.query.number < 100) {
        let number = getNumber(false)
        if (req.query.number == number) {
            res.status(200).send({ msg: "Equal"})
        }
        else {
            if (req.query.number < number) res.status(200).send({ msg: "Bigger"})
            else res.status(200).send({ msg: "Smaller"})
        }
    }
    else {
        res.status(406).send({ msg: "Not a legal number."})
    }
})

router.post('/restart', (_, res) => {
    let number = getNumber(true)
    res.json({ msg: 'The game has restarted.' })
})

export default router