import { NextApiResponse } from 'next';

import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Socket as NetSocket } from 'net';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HttpServer & {
      io: ServerIO;
    };
  };
};

export interface User {
  userId: string;
  socketId: string;
}

export interface Message {
  _id: string;
  userId: string;
  text: string;
  conversationId: string;
}

export interface ServerToClientEvents {
  receiveMessage: (response: Message) => void;
}

export interface ClientToServerEvents {
  addOnlineUser: () => void;
  sendMessage: (payload: Message) => void;
  joinConversation: (conversationId: string) => void;
}

export type ServerIO = Server<ClientToServerEvents, ServerToClientEvents>;

export type SocketIO = Socket<ClientToServerEvents, ServerToClientEvents>;
