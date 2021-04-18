import ReactModal from "react-modal";

export default function Modal(props) {
  return (
    <ReactModal isOpen={!props.disabled}>
      Tu score es {props.score} puntos.
      <button onClick={props.toNextLevel}>Siguente nivel</button>
    </ReactModal>
  );
}
