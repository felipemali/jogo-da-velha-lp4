import { useEffect, useState } from "react";
import { socket } from ".";

export const useGameState = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [result, setResult] = useState("");
  const [game, setGame] = useState({
    plays: [],
  });

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("waiting", () => {
      setIsWaiting(true);
    });

    socket.on("start", (data) => {
      setResult("");
      setIsWaiting(false);
      setPlayerName(data.name);
      setGame(data.game);
      setCanPlay(data.canPlay);
    });

    socket.on("move", (data) => {
      setCanPlay(data.canPlay);
      setGame(data.game);
    });

    socket.on("gameover", (data) => {
      setResult(data.result);
    });

    socket.on("reset", (data) => {
      setResult("");
      setGame(data.game);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("waiting");
      socket.off("start");
      socket.off("move");
      socket.off("gameover");
      socket.off("reset");

      socket.disconnect();
    };
  }, []);

  return {
    isConnected: isConnected && !isWaiting,
    isWaiting,
    game: {
      ...game,
      result,
      canPlay,
      playerName,
    },
  };
};
