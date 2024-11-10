const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');  // Import cheerio
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/frequent-words', async (req, res) => {
  const { url, n } = req.body;
  if (!url || !n) {
    return res.status(400).json({ error: 'URL and top N count are required.' });
  }

  try {
    const { data } = await axios.get(url);

    // Load HTML into Cheerio to parse and extract visible text
    const $ = cheerio.load(data);
    const text = $('body').text(); // Extract only text from the body element

    // Process and clean the text content
    const words = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, '') // Keep only alphabetic characters and spaces
      .split(/\s+/)
      .filter(Boolean); // Remove empty entries

    const wordFreq = {};

    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const sortedWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([word, freq]) => ({ word, freq }));

    res.json(sortedWords);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or process the URL content.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
