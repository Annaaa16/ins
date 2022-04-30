import { ServerIO, SocketIO } from '../types';

const conversationHandler = (io: ServerIO, socket: SocketIO) => {
  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
  });

  socket.on('sendMessage', (message) => {
    socket.broadcast.to(message.conversationId).emit('receiveMessage', message);
  });
};

export default conversationHandler;
