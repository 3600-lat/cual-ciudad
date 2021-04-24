const levels = [
  { numQuestions: 3 },
  { numQuestions: 7 },
  { numQuestions: 21 },
  { numQuestions: 45 },
  { numQuestions: 89 },
];

export default function LevelSelector({ setLevel }) {
  const buttons = levels.map((d, i) => {
    return (
      <li key={i}>
        <button onClick={() => setLevel(levels[i])}>
          {d.numQuestions} preguntas
        </button>
      </li>
    );
  });
  return (
    <div className="level-selector">
      <ul className="vertical-buttons">{buttons}</ul>
    </div>
  );
}
