import { socket } from "../../socket";
import { useGameActions } from "../../socket/useGameActions";
import "./Result.css";

type ResultProps = {
  result: string;
};

const Result = ({ result }: ResultProps) => {
  const { onReset } = useGameActions();
  return (
    <div>
      {result && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Resultado</h2>
            </div>

            <h2>{result}</h2>
            <div className="modal-actions">
              <button onClick={() => socket.disconnect()}>Sair</button>
              <button onClick={onReset}>Jogar Novamente</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
