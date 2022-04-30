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
}

export interface ClientToServerEvents {
  addOnlineUser: () => void;
  sendMessage: (payload: SocketMessage) => void;
  joinConversation: (conversationId: string) => void;
}

export type SocketIO = Socket<ServerToClientEvents, ClientToServerEvents>;
