import { useEffect, useState } from 'react';
import { starterPokemon } from './constants/starters';
import { getPokemonData } from './services/pokeapi';
import PokemonCard from './components/PokemonCard';
import VoteChart from './components/VoteChart';
import { Link } from 'react-router-dom';



function App() {
  // State to hold all starter Pokémon info
  const [pokemonList, setPokemonList] = useState([]);

  // State for the selected Pokémon name and full data
  const [selectedName, setSelectedName] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // State to track vote counts (not persisted yet)
  const [votes, setVotes] = useState({});

  // Fetch all starter Pokémon info once when app loads
 useEffect(() => {
  const fetchAll = async () => {
    const results = await Promise.all(
      starterPokemon.map(name => getPokemonData(name))
    );
    setPokemonList(results);
  };

  fetchAll();
}, []);

useEffect(() => {
  const fetchVotes = async () => {
    const res = await fetch('http://localhost:3001/votes');
    const data = await res.json();
    setVotes(data);
  };

  fetchVotes();
}, []);




  // When user picks from dropdown
  const handleSelectChange = (e) => {
    const name = e.target.value;
    setSelectedName(name);

    // Find that Pokémon's data from the list
    const found = pokemonList.find(p => p.name === name);
    setSelectedPokemon(found);
  };

  // Handle voting (favorite or least)
 const handleVote = async (name, type) => {
  const updatedVotes = {
    ...votes,
    [name]: {
      ...votes[name],
      [type]: (votes[name]?.[type] || 0) + 1
    }
  };

  setVotes(updatedVotes);

  try {
    await fetch('http://localhost:3001/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedVotes)
    });
  } catch (err) {
    console.error('Failed to save vote:', err);
  }
};


  // ⬇️ UI Layout and Styling
  return (
    
    <div
      style={{
        minHeight: '100vh',        // Full height of screen
        width: '100vw',            // Full width of screen
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)', // background gradient
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
      }}
      
    >
      {/* Link to Results page */}
     <Link to="/results" style={{ marginTop: '30px', textDecoration: 'none' }}>
 
 
  <button style={{
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#4dabf7',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px'
  }}>
    View Full Rankings
  </button>
</Link>

  
      {/* App Title */}
      <h1 style={{ color: '#333', marginBottom: '30px' }}>
        Vote for Your Favorite Starter Pokémon
      </h1>

      {/* Dropdown Menu */}
      <select
        value={selectedName}
        onChange={handleSelectChange}
        style={{
          padding: '12px 18px',
          borderRadius: '10px',
          border: '1px solid #aaa',
          fontSize: '16px',
          marginBottom: '40px',
          width: '250px',
        }}
      >
        <option value="">-- Choose a Pokémon --</option>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </option>
        ))}
      </select>

      {/* Show Pokémon Card after selection */}
      {selectedPokemon && (
        <PokemonCard
          pokemon={selectedPokemon}
          onVote={handleVote}
        />
      )}
      {/* Always show chart if there's voting data */}
{Object.keys(votes).length > 0 && (
  <VoteChart votes={votes} pokemonList={pokemonList} />
)}

<button
  onClick={async () => {
    const input = prompt("Enter admin password to reset votes:");
    if (!input) return;

    const res = await fetch('http://localhost:3001/reset-votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: input }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Votes have been reset.");
      window.location.reload(); // or refetch votes
    } else {
      alert("Incorrect password.");
    }
  }}
  style={{
    marginTop: '40px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
  }}
>
  🔒 Reset All Votes
</button>

    </div>
  );
}


export default App;
