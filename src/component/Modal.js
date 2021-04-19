import ReactModal from "react-modal";

export default function Modal({ score, toNextLevel, disabled = false }) {
  return (
    <ReactModal isOpen={!disabled}>
      Tu score es {score} puntos.
      <button onClick={toNextLevel}>Siguente nivel</button>
    </ReactModal>
  );
}
