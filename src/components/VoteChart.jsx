import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const typeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  normal: '#A8A878',
  flying: '#A890F0',
  poison: '#A040A0',
  bug: '#A8B820',
  ground: '#E0C068',
  rock: '#B8A038',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  steel: '#B8B8D0',
  ghost: '#705898',
  fighting: '#C03028'
};

const generateChartData = (votes, pokemonList, voteType) => {
  const data = [];

  pokemonList.forEach(poke => {
    const voteCount = votes[poke.name]?.[voteType] || 0;
    if (voteCount > 0) {
      data.push({
        name: poke.name,
        count: voteCount,
        type: poke.types[0],
        sprite: poke.sprite
      });
    }
  });

  // ✅ Updated logic to include ties beyond top 3 places
const sorted = [...data].sort((a, b) => b.count - a.count);

// Get top 3 distinct vote counts (e.g., [10, 8, 6])
const topCounts = [...new Set(sorted.map(p => p.count))].slice(0, 3);

// Include ALL Pokémon whose vote count matches any of the top 3
const topThree = sorted.filter(p => topCounts.includes(p.count));


  // Chart Data
  const chartData = {
    labels: data.map(p => p.name.charAt(0).toUpperCase() + p.name.slice(1)),
    datasets: [
      {
        label: `${voteType === 'favorite' ? 'Favorite' : 'Least Favorite'} Votes`,
        data: data.map(p => p.count),
        backgroundColor: data.map(p => typeColors[p.type] || '#ccc'),
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  return { chartData, topThree };
};

// Podium Component
const placeHeights = {
  1: 110,
  2: 80,
  3: 60,
};

const placeEmojis = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

const Podium = ({ topThree, align = 'left' }) => {
  // Group Pokémon by vote count
  const grouped = {};
  topThree.forEach(p => {
    if (!grouped[p.count]) grouped[p.count] = [];
    grouped[p.count].push(p);
  });

  // Get top 3 unique vote counts, sorted highest first
  const sortedCounts = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)
    .slice(0, 3); // This gets 1st, 2nd, 3rd distinct vote counts

  return (
    <div style={{
      display: 'flex',
      flexDirection: align === 'left' ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      gap: '10px',
      textAlign: 'center',
      margin: align === 'left' ? '0 30px 0 0' : '0 0 0 30px'
    }}>
      {sortedCounts.map((count, index) => {
        const pokes = grouped[count];
        const place = index + 1;
        const height = placeHeights[place];
        const isShared = pokes.length > 3;

        // Gradient if tie, or solid color if single
        const gradient = `linear-gradient(to right, ${pokes.map(p => typeColors[p.type] || '#ccc').join(', ')})`;

        return (
          <div key={count} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Pokémon images */}
            <div style={{
              marginBottom: '6px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '6px'
            }}>
              {pokes.map(p => (
                <img
                  key={p.name}
                  src={p.sprite}
                  alt={p.name}
                  style={{ width: '50px', height: '50px' }}
                />
              ))}
            </div>

            {/* Podium block */}
            <div
              style={{
                background: gradient,
                height: `${height}px`,
                width: isShared ? `${80 + pokes.length * 10}px` : '60px',
                borderTopLeftRadius: '6px',
                borderTopRightRadius: '6px',
                color: '#fff',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {placeEmojis[place]} {isShared ? `Tied for ${place}` : place}
            </div>
          </div>
        );
      })}
    </div>
  );
};



export default function VoteChart({ votes, pokemonList }) {
  const { chartData: favoriteData, topThree: topFavs } = generateChartData(votes, pokemonList, 'favorite');
  const { chartData: leastData, topThree: topLeast } = generateChartData(votes, pokemonList, 'least');

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '60px auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      gap: '60px'
    }}>
      {/* Favorite Section */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Podium topThree={topFavs} align="left" />
        <div style={{ width: '450px' }}>
          <h2 style={{ textAlign: 'center' }}>Favorite Starters</h2>
          <Pie data={favoriteData} />
        </div>
      </div>

      {/* Least Favorite Section */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '450px' }}>
          <h2 style={{ textAlign: 'center' }}>Least Favorite Starters</h2>
          <Pie data={leastData} />
        </div>
        <Podium topThree={topLeast} align="right" />
      </div>
    </div>
  );
}
