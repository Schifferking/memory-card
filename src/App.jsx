import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/card";

function App() {
  const [pokemons, setPokemons] = useState([]);

  // highest pokemon id with sprite at the moment is 1010
  const maxId = 1010;
  const cardCount = 12;

  function getRandomNumber(min, max) {
    const actualMin = Math.ceil(min);
    const actualMax = Math.floor(max);
    return Math.floor(Math.random() * (actualMax - actualMin + 1) + actualMin);
  }

  function shuffleCards() {
    const shuffledCards = [...pokemons];
    let currentIndex = shuffledCards.length;
    let randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [shuffledCards[currentIndex], shuffledCards[randomIndex]] = [
        shuffledCards[randomIndex],
        shuffledCards[currentIndex],
      ];
    }
    setPokemons(shuffledCards);
  }

  useEffect(() => {
    function getPokemon(id) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((poke) => {
          return poke;
        });
    }

    const pokePromises = Array.from({ length: cardCount }, () => {
      const randomId = getRandomNumber(1, maxId);
      return getPokemon(randomId);
    });

    const pokes = Promise.all(pokePromises);

    pokes.then((pokesData) => setPokemons(pokesData));
  }, []);

  return (
    <>
      <ul>
        {pokemons.map((pokemon) => {
          return (
            <Card
              key={pokemon.name}
              text={pokemon.name}
              imageUrl={pokemon.sprites["front_default"]}
              onClick={shuffleCards}
            ></Card>
          );
        })}
      </ul>
    </>
  );
}

export default App;
