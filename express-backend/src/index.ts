import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.connect();


app.post("/submit", (req, res) => {
    const { problemId, userId, language, code } = req.body;
    client.lPush("submissions", JSON.stringify({ problemId, userId, language, code }));
    res.json({
        message: "Submitted!"
    })
});

app.listen(3000);