import { NextApiRequest } from 'next';

import { Server as ServerIO } from 'socket.io';
import conversationHandler from '~/socket/handlers/conversation';

import userHandler from '~/socket/handlers/user';

// types
import {
  ClientToServerEvents,
  NextApiResponseServerIO,
  ServerToClientEvents,
} from '~/socket/types';

const socketHandler = (_req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;

    const io = new ServerIO<ClientToServerEvents, ServerToClientEvents>(httpServer);

    res.socket.server.io = io;

    console.log('Socket connected 🍺');

    io.on('connection', (socket) => {
      userHandler(io, socket);
      conversationHandler(io, socket);
    });
  } else {
    console.log('Socket already connected ⚡');
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default socketHandler;
