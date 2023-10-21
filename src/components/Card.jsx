import "../styles/Card.css";

function Card({ text = "", imageUrl = "", onClick = "" }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} />
      <p>{text}</p>
    </div>
  );
}

export default Card;
