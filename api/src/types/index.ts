import { DefaultEventsMap, Socket } from "socket.io";

export type GameSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export type Player = {
  name: "X" | "O";
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  plays: number[];
};
