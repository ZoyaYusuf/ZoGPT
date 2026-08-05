import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import "dotenv/config"; 
import chatRoute from "./routes/chat.js";


const app = express();
const PORT = 8181;

app.use(json());
app.use(cors());  
app.use("/api", chatRoute);
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
}
);

const connectDB = async() => {
    try {
        await connect(process.env.MDB_URL);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}

// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "openai/gpt-oss-20b:free",
//             messages: [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     };
//     try {
//         const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
//         const data = await response.json();
//         console.log(data.choices[0].message.content); //reply
//         res.send(data.choices[0].message.content);
//     } catch(err) {
//         console.log(err);
//     }
// });
