import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Player } from "./types";
import { checkWin, getGameState } from "./utils";

const app = express();

export const server = createServer(app);

const webSocket = new Server(server, {
  cors: {
    origin: "*",
  },
});

let players: Player[] = [];

const resetGameState = () => {
  players = players.map((player) => ({
    ...player,
    plays: [],
  }));
};

webSocket.on("connect", (currentSocket) => {
  console.log("Jogador conectado!");

  if (players.length < 2) {
    const name = players.length === 0 ? "X" : "O";

    players.push({
      name,
      socket: currentSocket,
      plays: [],
    });
  }

  if (players.length === 1) {
    currentSocket.emit("waiting", {
      message: "Aguarde outro jogador conectar.",
    });
  }

  if (players.length === 2) {
    players.forEach((player, index) => {
      player.socket.emit("start", {
        message: "Jogadores conectados. O jogo vai começar!",
        name: player.name,
        game: getGameState(players),
        canPlay: index === 0,
      });
    });
  }

  currentSocket.on("move", (data) => {
    const playerIndex = players.findIndex(
      (player) => player.socket.id === currentSocket.id
    );

    const currentPlayer = players[playerIndex];
    const gameState = getGameState(players);

    if (!gameState.allPlays.includes(data.play)) {
      currentPlayer.plays.push(data.play);
    }

    if (checkWin(currentPlayer.plays)) {
      players.forEach((player) => {
        player.socket.emit("gameover", {
          result:
            currentPlayer.name === player.name
              ? "Você venceu!"
              : "Você perdeu!",
        });
      });
    }

    if (gameState.allPlays.length >= 8) {
      return players.forEach((player) => {
        player.socket.emit("gameover", {
          result: "Empate",
        });
      });
    }

    players.forEach((player) => {
      player.socket.emit("move", {
        game: getGameState(players),
        canPlay: currentPlayer.name !== player.name,
      });
    });
  });

  currentSocket.on("reset", () => {
    resetGameState();

    players.forEach((player) => {
      player.socket.emit("reset", {
        message: "Jogo resetado.",
        game: getGameState(players),
      });
    });
  });

  currentSocket.on("disconnect", () => {
    console.log("Jogador desconectado!");
    resetGameState();

    players = players.filter(
      (currentPlayer) => currentPlayer.socket !== currentSocket
    );

    if (players.length < 2) {
      players.forEach((player) => {
        player.socket.emit("waiting", { message: "Aguardando outro jogador." });
      });
    }
  });
});
