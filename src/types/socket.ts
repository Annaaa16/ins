import { Socket } from 'socket.io-client';

export interface SocketMessage {
  _id: string;
  userId: string;
  text: string;
  conversationId: string;
  createdAt: string;
}

export interface ServerToClientEvents {
  receiveMessage: (response: SocketMessage) => void;
  receiveOnlineUserId: (userId: string) => void;
  receiveOfflineUserId: (userId: string) => void;
  receiveOnlineUserIds: (userIds: string[]) => void;
  receiveStrangeConversation: (conversationId: string) => void;
}

export interface ClientToServerEvents {
  addOnlineUser: () => void;
  sendMessage: (payload: SocketMessage) => void;
  joinRooms: (conversationIds: string[]) => void;
  getOnlineUserIds: () => void;
  sendStrangeConversation: (payload: { receiverId: string; conversationId: string }) => void;
}

export type SocketIO = Socket<ServerToClientEvents, ClientToServerEvents>;
