export default function Result({ game, goToNext }) {
  return (
    <div className="result">
      <h3>Resultado</h3>
      <p>Obtuviste {game.score} punto(s).</p>
      <button onClick={() => goToNext()}>Jugar</button>
    </div>
  );
}
