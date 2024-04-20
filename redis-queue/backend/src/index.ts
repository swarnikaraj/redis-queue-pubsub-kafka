import express from "express"
import { createClient } from "redis"
const app = express()
const port = 3000
app.use(express.json())

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

app.post("/submit", async (req, res) => {
    const filename = req.body.filename;
    const size = req.body.size;
    const bucketurl = req.body.url;

    try {
        await client.lPush("jobs", JSON.stringify({ filename, size, bucketurl }));

        res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
});


(
    async () => {
        try {
            await client.connect();
            console.log("Connected to Redis");

            app.listen(3000, () => {
                console.log("Server is running on port 3000");
            });
        } catch (error) {
            console.error("Failed to connect to Redis", error);
        }
    }
)()
