import "../styles/Scoreboard.css";

function Scoreboard({ score = "", bestScore = "" }) {
  return (
    <>
      <h1>Just another Pokemon memory card game</h1>
      <h2>Score: {score}</h2>
      <h2>Best score: {bestScore}</h2>
    </>
  );
}

export default Scoreboard;
