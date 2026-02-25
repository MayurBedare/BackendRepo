require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

async function listModels() {
    const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    try {
        console.log("Listing models...");
        const result = await client.models.list();
        // The new SDK response for list() is an iterable or has a specific structure
        for await (const model of result) {
            console.log(model.name);
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
}

listModels();
