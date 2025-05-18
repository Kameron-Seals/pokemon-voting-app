export default function PokemonCard({ pokemon, onVote }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      border: '2px solid #4dabf7',
      borderRadius: '16px',
      padding: '20px',
      maxWidth: '300px',
      textAlign: 'center',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      transition: '0.3s'
    }}>
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        style={{ width: '120px', height: '120px' }}
      />
      <h2 style={{ color: '#222' }}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Type: {pokemon.types.join(', ')}
      </p>
      <button
        onClick={() => onVote(pokemon.name, 'favorite')}
        style={{
          backgroundColor: '#38b000',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          marginRight: '10px',
          cursor: 'pointer'
        }}
      >
        Favorite
      </button>
      <button
        onClick={() => onVote(pokemon.name, 'least')}
        style={{
          backgroundColor: '#e5383b',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Least Favorite
      </button>
    </div>
  );
}
