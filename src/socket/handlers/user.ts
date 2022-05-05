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

  onlineUsers[userId] = { userId, socketId, roomIds: [socketId], currentRoomId: null };
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
  const currentUserId = socket.handshake.query.userId as string;
  const socketId = socket.id;

  // Current user connected
  socket.on('getOnlineUserIds', () => {
    socket.emit('receiveOnlineUserIds', getOnlineUserIds(currentUserId));
  });

  socket.on('addOnlineUser', () => {
    addCurrentSocket(currentUserId, socketId);
    addOnlineUser(currentUserId, socketId, socket);
  });

  socket.on('sendStrangeConversation', ({ receiverId, conversationId }) => {
    const receivedSocketId = onlineUsers[receiverId]?.socketId;

    if (receivedSocketId == null) return;

    socket.to(receivedSocketId).emit('receiveStrangeConversation', conversationId);
  });

  socket.on('joinRooms', (conversationIds) => {
    const user = onlineUsers[currentUserId];

    if (user == null) return;

    user.roomIds = [...new Set([...user.roomIds, ...conversationIds])];

    socket.join(user.roomIds);
  });

  socket.on('setCurrentRoomId', (conversationId) => {
    const user = onlineUsers[currentUserId];

    if (user == null) return;

    user.currentRoomId = conversationId;
  });

  socket.on('sendMessage', (message, receiverIds) => {
    for (const receiverId of receiverIds) {
      const user = onlineUsers[receiverId];

      if (user == null) continue;

      if (user.currentRoomId === message.conversationId && user.userId !== currentUserId)
        message.seen = true;
    }

    // TODO: Only mark message as read when user in room is current (for group)
    socket.broadcast.to(message.conversationId).emit('receiveMessage', message);
  });

  socket.on('readMessage', (conversationId) => {
    socket.broadcast.to(conversationId).emit('receiveSeenConversationId', conversationId);
  });

  socket.on('disconnect', () => {
    handleDisconnect(currentUserId, socketId, socket);

    socket.disconnect();
  });
};

export default userHandler;
