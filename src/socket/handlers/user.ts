// types
import { ServerIO, SocketIO, User } from '../types';

interface OnlineUsers {
  [userId: string]: User;
}

interface CurrentSockets {
  [userId: string]: string[];
}

const onlineUsers: OnlineUsers = {};
const currentSockets: CurrentSockets = {};

const addOnlineUser = (userId: string, socketId: string) => {
  if (onlineUsers[userId] != null) return;

  onlineUsers[userId] = { userId, socketId };
};

// Track open new tab
const addCurrentSocket = (userId: string, socketId: string) => {
  if (onlineUsers[userId] == null) currentSockets[userId] = [socketId];
  else currentSockets[userId].push(socketId);
};

const handleDisconnect = (userId: string, socketId: string) => {
  if (currentSockets[userId] == null) return;

  currentSockets[userId].splice(currentSockets[userId].indexOf(socketId), 1);

  if (currentSockets[userId].length === 0) {
    delete currentSockets[userId];
    delete onlineUsers[userId];
  }
};

const userHandler = (_io: ServerIO, socket: SocketIO) => {
  const userId = socket.handshake.query.userId as string;
  const socketId = socket.id;

  socket.on('addOnlineUser', () => {
    addCurrentSocket(userId, socketId);
    addOnlineUser(userId, socketId);
  });

  socket.on('disconnect', () => {
    handleDisconnect(userId, socketId);

    socket.disconnect();
  });
};

export default userHandler;
