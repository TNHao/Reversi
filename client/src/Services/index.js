import { io } from "socket.io-client";

const socket_url = "http://localhost:3001";// `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`;

export const socket = io(socket_url);
