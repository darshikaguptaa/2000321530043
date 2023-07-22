const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8008;

app.use(express.json());

app.get("/numbers", async (req, res) => {
    const { url } = req.query;

    if (!url || !Array.isArray(url)) {
        return res.status(400).json({ error: "Invalid URL(s)" });
    }

    try {
        const results = await Promise.allSettled(url.map(fetchNumbers));

        const numbers = results
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value)
            .flat();

        const mergedNumbers = [...new Set(numbers)].sort((a, b) => a - b);

        return res.json({ numbers: mergedNumbers });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

const fetchNumbers = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data.numbers;
    } catch (error) {
        console.error(`Error fetching numbers from ${url}:`, error.message);
        return [];
    }
};

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
