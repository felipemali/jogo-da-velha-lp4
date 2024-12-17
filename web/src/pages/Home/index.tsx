import { useEffect, useState } from "react";
import "./styles.css";
import { useGameActions } from "../../socket/useGameActions";
import Result from "./Result";

type Square = {
  play: number;
  player?: string | null;
};

type Props = {
  game: {
    result: string;
    canPlay: boolean;
    playerName: string;
    plays: {
      play: number;
      player?: string | null;
    }[];
  };
};

export const Home = ({ game }: Props) => {
  console.log({ game });

  const { onMove } = useGameActions();
  const [squares, setSquares] = useState<Square[]>(game.plays);

  useEffect(() => {
    setSquares(game.plays);
  }, [game]);

  return (
    <div className="container-home">
      <p className="title-home">Você é o jogador {game.playerName}</p>
      <div className="board">
        {squares.map((square) => (
          <div
            className="cell"
            onClick={() => {
              if (game.canPlay) {
                onMove(square.play);
              }
            }}
          >
            {square.player}
          </div>
        ))}
      </div>
      <h3 style={{ color: "white" }}>
        {game.canPlay ? "Sua vez de jogar!" : "Aguarde o outro jogador!"}
      </h3>
      <Result result={game.result} />
    </div>
  );
};
