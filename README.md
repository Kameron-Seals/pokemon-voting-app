# 🗳️ Pokémon Starter Voting App

A full-stack voting app where users can vote for their favorite (and least favorite) starter Pokémon. Built with React + Node.js and powered by the PokéAPI.



---

## 🚀 Features

- Vote for favorite and least favorite starter Pokémon  
- Live results displayed using dynamic pie charts  
- Podium-style top 3 with type-based color bars  
- Results page with full rankings  
- Vote data saved to a local `votes.json` file  
- Admin reset button with password protection  

---

## 🛠️ Tech Stack

- ⚛️ React + Vite (Frontend)  
- 📊 Chart.js for data visualization  
- 🌐 Express.js (Backend API)  
- 📁 JSON file storage for votes  
- 🎨 Styled with inline CSS and clean UI components  
- 🔗 PokéAPI integration for Pokémon data  

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/pokemon-voting-app.git
cd pokemon-voting-app
```

### Install frontend dependencies:

```bash
npm install
```

### Install backend dependencies:

```bash
cd backend
npm install
cd ..
```

---

## 🧪 Development

### Run the backend:

```bash
cd backend
node index.js
```

### Run the frontend (React):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Admin Reset

A password-protected reset button is available to clear all votes.

- Password is hardcoded in `backend/index.js` (update it as needed)
- Sends a POST request to `/reset-votes`

---

## 📁 File Structure

```
pokemon-voting-app/
├── backend/
│   ├── index.js         # Express backend
│   ├── votes.json       # Stored votes
├── src/
│   ├── App.jsx          # Main frontend logic
│   ├── components/      # PokémonCard, VoteChart, etc.
│   ├── pages/Results.jsx
│   └── constants/starters.js
├── package.json
├── vite.config.js
```

---

## ✨ Future Improvements

- User authentication  
- Deployment to Ubuntu or cloud host  
- Export results as CSV  
- Mobile-friendly layout  

---

## 📄 License

MIT — feel free to fork, remix, and use!
