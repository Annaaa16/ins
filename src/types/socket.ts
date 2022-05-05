import { Socket } from 'socket.io-client';

export interface SocketMessage {
  _id: string;
  userId: string;
  text: string;
  conversationId: string;
  createdAt: string;
  seen: boolean;
}

export interface ServerToClientEvents {
  receiveMessage: (response: SocketMessage) => void;
  receiveOnlineUserId: (userId: string) => void;
  receiveOfflineUserId: (userId: string) => void;
  receiveOnlineUserIds: (userIds: string[]) => void;
  receiveStrangeConversation: (conversationId: string) => void;
  receiveSeenConversationId: (conversationId: string) => void;
}

export interface ClientToServerEvents {
  addOnlineUser: () => void;
  sendMessage: (payload: SocketMessage, receiverIds: string[]) => void;
  joinRooms: (conversationIds: string[]) => void;
  getOnlineUserIds: () => void;
  sendStrangeConversation: (payload: { receiverId: string; conversationId: string }) => void;
  setCurrentRoomId: (conversationId: string) => void;
  readMessage: (conversationId: string) => void;
}

export type SocketIO = Socket<ServerToClientEvents, ClientToServerEvents>;
