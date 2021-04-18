export default function Action(props) {
  const buttons = props.options.map((d, i) => {
    return (
      <li key={i} className={d.className}>
        <button onClick={d.onClick} disabled={d.disabled}>
          {d.place.name}
        </button>
      </li>
    );
  });
  return <ul>{buttons}</ul>;
}
