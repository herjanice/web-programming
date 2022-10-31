import { Router } from 'express';
import ScoreCard from '../models/ScoreCard';

const router = Router();

router.delete("/cards", async (req, res) => {
    try {
        await ScoreCard.deleteMany({});
        res.status(200).send({ message: "Database cleared!"});
    }
    catch (e) {
        throw new Error("database deletion failed");
    }
});

router.post("/card", async (req, res) => {
    const existing = await ScoreCard.findOne({name: req.body.name, subject: req.body.subject})
    try {
        if (existing) {
            await ScoreCard.updateOne(
                {name: req.body.name, subject: req.body.subject}, 
                {$set:{score:req.body.score}}
            )
            console.log("score card updated")
            res.status(200).send({ message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
        }
        else {
            const newCard = new ScoreCard({name: req.body.name, subject: req.body.subject, score: req.body.score});
            res.status(200).send({ message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: true});
            console.log("score card added")
            return newCard.save();
        }
    }
    catch (e) {
        throw new Error("adding / updating failed");
    }
});
router.get("/cards", async (req, res) => {
    let messages = []
    try {
        if(req.query.type == 'subject') {
            const existing = await ScoreCard.find({subject: req.query.queryString})
            if(existing.length == 0) {
                console.log("query not found")
                res.status(200).send({message: [`${req.query.type} (${req.query.queryString}) not found!`]});
            }
            else {
                for (let i=0; i < existing.length; i++) {
                    console.log(existing[i])
                    messages.push(`Found card with subject (${existing[i].name}, ${existing[i].subject}, ${existing[i].score})`)
                    console.log("messages: " ,messages)
                }
                res.status(200).send({messages: messages});
            }
        }
        else if (req.query.type == 'name') {
            const existing = await ScoreCard.find({name: req.query.queryString})
            if(existing.length == 0) {
                res.status(200).send({message: [`${req.query.type} (${req.query.queryString}) not found!`]});
                console.log("query not found")
            }
            else {
                for (let i=0; i < existing.length; i++) {
                    console.log(existing[i])
                    messages.push(`Found card with name (${existing[i].name}, ${existing[i].subject}, ${existing[i].score})`)
                    console.log("messages: " ,messages)
                }
                res.status(200).send({messages: messages});
            }
        }
    }
    catch (e) {
        throw new Error("Query failed");
    }
});

export default router;