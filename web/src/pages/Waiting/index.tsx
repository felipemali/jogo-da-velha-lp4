import "./styles.css";
import { socket } from "../../socket";

type Props = {
  isWaiting: boolean;
};

export const Waiting = ({ isWaiting }: Props) => {
  return (
    <div className="container-waiting">
      <h4 className="title-waiting">Jogo da velha</h4>

      <div className="area-info">
        <button onClick={() => socket.connect()} disabled={isWaiting}>
          Jogar
        </button>
        {isWaiting && <p>Aguardando jogador...</p>}
      </div>
    </div>
  );
};
