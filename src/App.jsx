import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [cardsPlayed, setCardsPlayed] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // highest pokemon id with sprite at the moment is 1010
  const maxId = 1010;
  const cardCount = 12;

  function getRandomNumber(min, max) {
    const actualMin = Math.ceil(min);
    const actualMax = Math.floor(max);
    return Math.floor(Math.random() * (actualMax - actualMin + 1) + actualMin);
  }

  function getPokemonCard(pokemonName) {
    return pokemons.find((pokemon) => pokemon.name === pokemonName);
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
    setScore(score + 1);
  }

  function getPokemonName(e) {
    let pElement;
    if (e.target === "p") {
      return e.target.textContent;
    } else if (e.target.className === "card") {
      pElement = e.target.querySelector("p");
    } else {
      pElement = e.target.parentNode.querySelector("p");
    }
    return pElement.textContent;
  }

  function isCardPlayedTwice(pokemonCard) {
    return cardsPlayed.includes(pokemonCard);
  }

  function handleClick(e) {
    const pokemonName = getPokemonName(e);
    const pokemonCard = getPokemonCard(pokemonName);
    if (!isCardPlayedTwice(pokemonCard)) {
      shuffleCards();
      setCardsPlayed([...cardsPlayed, pokemonCard]);
    } else {
      setBestScore(score);
      setScore(0);
      setCardsPlayed([]);
    }
  }

  useEffect(() => {
    function getPokemon(id) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((poke) => {
          return poke;
        });
    }

    function getUniqueIds() {
      const idsArray = [];

      while (idsArray.length < cardCount) {
        const randomId = getRandomNumber(1, maxId);
        if (!idsArray.includes(randomId)) {
          idsArray.push(randomId);
        }
      }
      return idsArray;
    }

    const pokePromises = getUniqueIds().map((id) => getPokemon(id));
    const pokes = Promise.all(pokePromises);
    pokes.then((pokesData) => setPokemons(pokesData));
  }, []);

  return (
    <>
      <Scoreboard score={score} bestScore={bestScore}></Scoreboard>
      <ul>
        {pokemons.map((pokemon) => {
          return (
            <Card
              key={pokemon.name}
              text={pokemon.name}
              imageUrl={pokemon.sprites["front_default"]}
              onClick={handleClick}
            ></Card>
          );
        })}
      </ul>
    </>
  );
}

export default App;
