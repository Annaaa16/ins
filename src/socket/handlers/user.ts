// types
import { ServerIO, SocketIO, User } from '../types';

interface OnlineUsers {
  [userId: string]: User | null;
}

interface CurrentSockets {
  [userId: string]: string[] | null;
}

const onlineUsers: OnlineUsers = {};
const currentSockets: CurrentSockets = {};

const addOnlineUser = (userId: string, socketId: string, socket: SocketIO) => {
  socket.broadcast.emit('receiveOnlineUserId', userId);

  if (onlineUsers[userId] != null) return;

  onlineUsers[userId] = { userId, socketId, rooms: [socketId] };
};

// Track open new tab
const addCurrentSocket = (userId: string, socketId: string) => {
  if (onlineUsers[userId] == null) currentSockets[userId] = [socketId];
  else currentSockets[userId]!.push(socketId);
};

const handleDisconnect = (userId: string, socketId: string, socket: SocketIO) => {
  const currentSocket = currentSockets[userId];

  if (currentSocket == null) return;

  currentSocket.splice(currentSocket.indexOf(socketId), 1);

  if (currentSocket.length === 0) {
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

  socket.on('sendStrangeConversation', ({ receiverId, conversationId }) => {
    const receivedSocketId = onlineUsers[receiverId]?.socketId;

    if (receivedSocketId == null) return;

    socket.to(receivedSocketId).emit('receiveStrangeConversation', conversationId);
  });

  socket.on('joinRooms', (conversationIds) => {
    const user = onlineUsers[userId];

    if (user == null) return;

    user.rooms = [...new Set([...user.rooms, ...conversationIds])];

    socket.join(user.rooms);
  });

  socket.on('sendMessage', (message) => {
    socket.broadcast.to(message.conversationId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    handleDisconnect(userId, socketId, socket);

    socket.disconnect();
  });
};

export default userHandler;
