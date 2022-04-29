import { NextApiResponse } from 'next';

import { Server as ServerIO } from 'socket.io';
import { Server as HttpServer } from 'http';
import { Socket } from 'net';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: HttpServer & {
      io: ServerIO;
    };
  };
};

export interface SocketUser {
  userId: string;
  socketId: string;
}
