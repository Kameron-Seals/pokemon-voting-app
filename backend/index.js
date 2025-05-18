const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;
const filePath = './votes.json';

app.use(cors());
app.use(express.json());

// Load votes
app.get('/votes', (req, res) => {
  try {
    if (!fs.existsSync(filePath)) return res.json({});
    const data = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to read file' });
  }
});

// ✅ FIXED THIS LINE
app.post('/votes', (req, res) => {
  try {
    const votes = req.body;
    console.log('Received vote update:', votes);
    fs.writeFileSync(filePath, JSON.stringify(votes, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving votes:', err);
    res.status(500).json({ error: 'Failed to write file' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
// Reset vote data (protected by a simple password)
app.post('/reset-votes', (req, res) => {
  const { password } = req.body;

  if (password !== 'Ethoslab') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  fs.writeFileSync(filePath, '{}');
  res.json({ success: true });
});
