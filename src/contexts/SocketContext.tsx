import { ReactNode, createContext, useEffect, useContext, useState, useMemo } from 'react';

import { io } from 'socket.io-client';

// types
import { SocketIO, SocketMessage } from '~/types/socket';

import { useAuthSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { conversationActions } from '~/redux/slices/conversationSlice';

interface SocketProviderProps {
  children: ReactNode;
}

interface SocketInitContext {
  conversationHandler: {
    joinConversation: (conversationId: string) => void;
    sendMessage: (message: SocketMessage) => void;
  };
}

export const SocketContext = createContext<SocketInitContext>({
  conversationHandler: {
    joinConversation: () => {},
    sendMessage: () => {},
  },
});

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketIO | null>(null);

  const { currentUser } = useAuthSelector();

  const dispatch = useStoreDispatch();

  const userId = currentUser?._id;

  const conversationHandler = useMemo(
    () => ({
      joinConversation(conversationId: string) {
        socket?.emit('joinConversation', conversationId);
      },

      sendMessage(message: SocketMessage) {
        socket?.emit('sendMessage', message);
      },
    }),
    [socket],
  );

  useEffect(() => {
    if (userId == null) return;

    (async () => {
      await fetch('/api/socket');

      const socket = io({
        withCredentials: true,
        query: {
          userId,
        },
      });

      setSocket(socket);
    })();
  }, [userId]);

  useEffect(() => {
    if (userId == null || socket == null) return;

    socket.emit('addOnlineUser');
  }, [userId, socket]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receiveMessage', (message) => {
      dispatch(conversationActions.addIncomingSocketMessage(message));
    });

    return () => {
      socket.close();
    };
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ conversationHandler }}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
