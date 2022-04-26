import { NextApiRequest } from 'next';

import { Server as ServerIO } from 'socket.io';

// types
import { NextApiResponseServerIO } from '~/socket/types';

const socketHandler = (_req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;

    const io = new ServerIO(httpServer);

    res.socket.server.io = io;

    console.log('Socket connected 🍺');

    io.on('connection', (socket) => {
      socket.on('sendMessage', (msg) => {
        console.log('msg', msg);
        socket.emit('update-input', msg);
      });
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
