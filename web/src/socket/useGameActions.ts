import { socket } from ".";

export const useGameActions = () => {
  return {
    onMove: (play: number) => {
      socket.emit("move", {
        play,
      });
    },
    onReset: () => {
      socket.emit("reset");
    },
  };
};
