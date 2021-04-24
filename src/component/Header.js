import Score from "./Score.js";

export default function Header({ score }) {
  return (
    <div>
      <div className="header-title-box">
        <h1 className="header-title">¿Cuál es la ciudad?</h1>
        <span className="header-details">
          Encuentra la ciudad boliviana a partir de su forma urbana. Buena
          suerte.
        </span>
      </div>

      <Score score={score} />
    </div>
  );
}
