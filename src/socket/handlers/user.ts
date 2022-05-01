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

const addOnlineUser = (userId: string, socketId: string, socket: SocketIO) => {
  socket.broadcast.emit('receiveOnlineUserId', userId);

  if (onlineUsers[userId] != null) return;

  onlineUsers[userId] = { userId, socketId };
};

// Track open new tab
const addCurrentSocket = (userId: string, socketId: string) => {
  if (onlineUsers[userId] == null) currentSockets[userId] = [socketId];
  else currentSockets[userId].push(socketId);
};

const handleDisconnect = (userId: string, socketId: string, socket: SocketIO) => {
  if (currentSockets[userId] == null) return;

  currentSockets[userId].splice(currentSockets[userId].indexOf(socketId), 1);

  if (currentSockets[userId].length === 0) {
    delete currentSockets[userId];
    delete onlineUsers[userId];

    socket.broadcast.emit('receiveOfflineUserId', userId);
  }
};

const getOnlineUserIds = (userId: string) => {
  const userIds = Object.keys(onlineUsers);

  userIds.splice(userIds.indexOf(userId), 1);

  return userIds;
};

const userHandler = async (_io: ServerIO, socket: SocketIO) => {
  const userId = socket.handshake.query.userId as string;
  const socketId = socket.id;

  // Current user connected
  socket.on('getOnlineUserIds', () => {
    socket.emit('receiveOnlineUserIds', getOnlineUserIds(userId));
  });

  socket.on('addOnlineUser', () => {
    addCurrentSocket(userId, socketId);
    addOnlineUser(userId, socketId, socket);
  });

  socket.on('disconnect', () => {
    handleDisconnect(userId, socketId, socket);

    socket.disconnect();
  });
};

export default userHandler;
