import { useEffect, useState } from 'react';
import { starterPokemon } from '../constants/starters';
import { getPokemonData } from '../services/pokeapi';

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
  fontFamily: 'Arial, sans-serif',
  padding: '40px 20px',
  textAlign: 'center',
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  margin: '10px auto',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  maxWidth: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export default function Results() {
  const [ranked, setRanked] = useState([]);

  useEffect(() => {
    const loadData = async () => {
const res = await fetch('http://localhost:3001/votes');
const votes = await res.json();
      const results = await Promise.all(
        starterPokemon.map(async name => {
          const data = await getPokemonData(name);
          return {
            name: data.name,
            sprite: data.sprite,
            type: data.types[0],
            favorite: votes[data.name]?.favorite || 0,
            least: votes[data.name]?.least || 0,
            total: (votes[data.name]?.favorite || 0) - (votes[data.name]?.least || 0)
          };
        })
      );
      // Sort by highest total (favorited - least)
      results.sort((a, b) => b.total - a.total);
      setRanked(results);
    };

    loadData();
  }, []);

  return (
    <div style={pageStyle}>
      <h1>📊 Full Pokémon Rankings</h1>
      {ranked.map((p, index) => (
        <div key={p.name} style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>#{index + 1}</span>
            <img src={p.sprite} alt={p.name} style={{ width: '40px' }} />
            <span>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
          </div>
          <div>
            ❤️ {p.favorite} | 💔 {p.least}
          </div>
        </div>
      ))}
    </div>
  );
}
