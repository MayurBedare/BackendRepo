const { GoogleGenAI } = require("@google/genai");

// Fetch API Key from .env
const apiKey = process.env.GEMINI_API_KEY;

// Check if key is the default placeholder
const isPlaceholder = !apiKey || apiKey.includes('your_actual');

if (isPlaceholder) {
    console.warn("CRITICAL: GEMINI_API_KEY is not configured correctly in .env.");
}

let client;
try {
    if (!isPlaceholder) {
        // February 2026: Unified SDK client
        client = new GoogleGenAI({ apiKey });
    }
} catch (err) {
    console.error("Failed to initialize Gemini SDK:", err.message);
}

// Helper to handle the new generation syntax
const generateAIContent = async (prompt) => {
    if (!client) throw new Error("AI not initialized");

    const modelsToTry = [
        "gemini-3-flash-preview",
        "gemini-2.0-flash",
        "gemini-flash-lite-latest",
        "gemini-flash-latest"
    ];

    let lastError = null;

    for (const modelName of modelsToTry) {
        try {
            console.log(`AI Request: Attempting with ${modelName}...`);
            const response = await client.models.generateContent({
                model: modelName,
                contents: [{
                    role: "user",
                    parts: [{ text: prompt }]
                }]
            });

            return response.text;
        } catch (error) {
            lastError = error;
            const errorMsg = error.message || "";
            // Use fallback for 503 (Overloaded) and 429 (Quota Exceeded)
            if (errorMsg.includes("503") || errorMsg.includes("Service Unavailable") ||
                errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
                console.warn(`AI Warning: ${modelName} unavailable (${errorMsg.includes("429") ? "Quota" : "Overload"}), trying fallback...`);
                continue;
            }
            // For other critical errors, stop and throw
            throw error;
        }
    }
    throw lastError;
};

const improveArticle = async (req, res) => {
    const { content } = req.body;
    console.log("AI Improve Request: Processing...");

    if (!client) {
        return res.status(500).json({
            message: "AI not configured",
            details: "API Key is missing or invalid. Please update your .env file."
        });
    }

    try {
        const prompt = `
            Expert technical editor. Improve the following HTML content:
            - Fix grammar/spelling.
            - Professional tone.
            - KEEP ALL HTML TAGS EXACTLY AS THEY ARE.
            - Return ONLY the improved HTML.
            
            Content: ${content}
        `;

        let text = await generateAIContent(prompt);

        // Clean up potential markdown code blocks
        text = text.replace(/^```html\n?|```$/g, '').replace(/^```\n?|```$/g, '').trim();

        console.log("AI Improve: Success");
        res.status(200).json({ improvedContent: text });
    } catch (error) {
        console.error("GEMINI ERROR (Improve):", error.message);
        res.status(500).json({ message: "AI Improvement service failed", details: error.message });
    }
};

const suggestTags = async (req, res) => {
    const { content } = req.body;
    console.log("AI Suggest Tags: Processing...");

    if (!client) {
        return res.status(500).json({ message: "AI not configured" });
    }

    try {
        const prompt = `
            Analyze this article and suggest 5 technical tags (e.g. React, Node.js).
            Return ONLY a simple comma-separated list.
            
            Content: ${content}
        `;

        const text = await generateAIContent(prompt);
        const tags = text.split(',').map(t => t.trim());

        console.log("AI Suggest Tags: Success");
        res.status(200).json({ tags });
    } catch (error) {
        console.error("GEMINI ERROR (Tags):", error.message);
        res.status(500).json({ message: "AI Tag Suggestion failed.", details: error.message });
    }
};

const summarizeArticle = async (req, res) => {
    const { content } = req.body;
    if (!client) return res.status(500).json({ message: "AI not configured" });

    try {
        const prompt = `Summarize in 2 sentences: ${content}`;
        const summary = await generateAIContent(prompt);
        res.status(200).json({ summary });
    } catch (error) {
        res.status(500).json({ message: "AI Summary failed." });
    }
};

module.exports = { improveArticle, suggestTags, summarizeArticle };
