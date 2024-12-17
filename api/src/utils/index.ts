import { Player } from "../types";

export const checkWin = (plays: number[]) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) =>
    combination.every((play) => plays.includes(play))
  );
};

export const getGameState = (players: Player[]) => {
  return {
    players: players.map(({ name, plays }) => ({ name, plays })),
    allPlays: players.reduce((acc, player) => [...acc, ...player.plays], []),
    plays: Array(9)
      .fill(null)
      .reduce((result, _, play) => {
        const data = {
          play,
          player: null,
        };

        players.forEach((player) => {
          if (player.plays.includes(play)) {
            data.player = player.name;
          }
        });

        result.push(data);

        return result;
      }, []),
  };
};
