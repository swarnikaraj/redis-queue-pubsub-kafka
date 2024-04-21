
import { createClient } from "redis"
const client = createClient();

(
    async () => {
        try {
            await client.connect();
            console.log("Connected to Redis");

            while (1) {
                const key = await client.brPop("jobs", 0);
                console.log(key);
                await new Promise(r => setTimeout(r, 4000));
            }


        } catch (error) {
            console.error("Failed to connect to Redis", error);
        }
    }
)()
