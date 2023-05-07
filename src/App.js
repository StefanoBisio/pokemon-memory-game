import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [showingTiles, setShowingTiles] = useState(null);
  const [selectedTile, setSelectedTile] = useState(null);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from the Pokemon API
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
      const data = await response.json();
    
      // Generate an array of 10 unique Pokemon objects
      const randomPokemon = [];
      while (randomPokemon.length < 20) {
        // Choose a random Pokemon from the API data
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemonName = data.results[randomIndex].name;
    
        // Check if the chosen Pokemon is already in the array
        if (!randomPokemon.some((pokemon) => pokemon.name === randomPokemonName)) {
          const matchingIdValue = Math. floor((Math. random() * 100) + randomIndex);

          // Add the Pokemon to the array with a unique ID, a shared matchingID, and image URL
          randomPokemon.push({
            id: randomPokemon.length * 2,
            matchingID: matchingIdValue,
            name: randomPokemonName,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomIndex + 1}.png`,
          });
          randomPokemon.push({
            id: randomPokemon.length * 2 + 1,
            matchingID: matchingIdValue,
            name: randomPokemonName,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomIndex + 1}.png`,
          });
        }
      }
    
      // Shuffle the array randomly
      const shuffledPokemon = randomPokemon.sort(() => Math.random() - 0.5);
    
      // Set the state with the shuffled array
      setPokemonData(shuffledPokemon);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let timer;

    if (gameStarted && timeLeft > 0 && matchedTiles.length < 20) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alert('Time is up! You lost.');
      resetGame();
    }

    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft, matchedTiles]);

  const resetGame = () => {
    setShowingTiles(null);
    setSelectedTile(null);
    setMatchedTiles([]);
    setGameStarted(false);
    setTimeLeft(120);
  };

  const handleTileClick = (pokemon) => {
    // If the game hasn't started, set the gameStarted state to true
    if (!gameStarted) {
      setGameStarted(true);
    }
  
    // If no tile is selected and the clicked tile hasn't already been matched, set it as the selected tile
    if (selectedTile === null && !matchedTiles.includes(pokemon.id)) {
      setShowingTiles(pokemon.id);
      setSelectedTile(pokemon.matchingID);
    } 
    // If a tile is already selected and the clicked tile matches the selected tile, add both tiles to the matchedTiles array and reset the selected tile states. Also includes a check to prevent double clicking the same tile to trigger a false matching
    else if (selectedTile !== null && showingTiles !== pokemon.id && selectedTile === pokemon.matchingID) {
      setMatchedTiles([...matchedTiles, selectedTile, pokemon.id]);
      setShowingTiles(null);
      setSelectedTile(null);
    } 
    // If a tile is already selected and the clicked tile doesn't match the selected tile, reset the selected tile state after a delay of 1 second
    else if (selectedTile !== null && selectedTile !== pokemon.matchingID) {
      setShowingTiles(pokemon.id);
      setTimeout(() => {
        setSelectedTile(null);
        setShowingTiles(null);
      }, 1000);
    }
  };
  

  return (
    <div className="memory-game">
      <h1>The Pokemon Memory Game</h1>
      <h2>Created 95% by GPT4, 5% by human</h2>
      <span>(It even picked the title's font)</span>
      <p className='timeleft'>{timeLeft} seconds left</p>
      {!gameStarted && <button onClick={() => setGameStarted(true)}>Start the game</button>}
      {matchedTiles.length === 20 && <p>You won! Congratulations!</p>}
      <div className="tiles-grid">
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`tile ${showingTiles === pokemon.id ? 'selected' : ''} ${matchedTiles.includes(pokemon.matchingID) ? 'matched' : ''}`}
            onClick={() => handleTileClick(pokemon)}
          >
            <div className="tile-inner">
              <div className="tile-front"></div>
              <div className="tile-back">
                <img src={pokemon.image} alt={pokemon.name} data-id={pokemon.id} data-matching-id={pokemon.matchingID}  />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );



}

export default App;
