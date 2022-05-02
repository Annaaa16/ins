import { ReactNode, createContext, useEffect, useContext, useState, useMemo } from 'react';
import { useRouter } from 'next/router';

import { io } from 'socket.io-client';

// types
import { SocketIO, SocketMessage } from '~/types/socket';

import { useAuthSelector, useConversationSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { conversationActions } from '~/redux/slices/conversationSlice';
import { useGetConversationByIdLazyQuery } from '~/types/generated';

interface SocketProviderProps {
  children: ReactNode;
}

interface SocketInitContext {
  conversationHandler: {
    sendMessage: (message: SocketMessage) => void;
    sendStrangeConversation: (payload: { receiverId: string; conversationId: string }) => void;
  };
}

export const SocketContext = createContext<SocketInitContext>({
  conversationHandler: {
    sendMessage: () => {},
    sendStrangeConversation: () => {},
  },
});

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<SocketIO | null>(null);

  const { currentUser } = useAuthSelector();
  const { conversations } = useConversationSelector();

  const [getConversationById] = useGetConversationByIdLazyQuery();
  const router = useRouter();
  const dispatch = useStoreDispatch();

  const userId = currentUser?._id;

  const conversationHandler = useMemo(
    () => ({
      sendMessage(message: SocketMessage) {
        socket?.emit('sendMessage', message);
      },

      sendStrangeConversation(payload: { receiverId: string; conversationId: string }) {
        socket?.emit('sendStrangeConversation', payload);
      },
    }),
    [socket],
  );

  // Init socket
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

    socket.emit('getOnlineUserIds');
  }, [socket, router.pathname]);

  // Add new room(s) after fetching new conversations
  useEffect(() => {
    if (conversations.length === 0 || socket == null) return;

    socket.emit(
      'joinRooms',
      conversations.map((conversation) => conversation._id),
    );
  }, [socket, conversations]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receiveMessage', (message) => {
      console.log('message', message);
      dispatch(conversationActions.addIncomingSocketMessage(message));
    });

    socket.on('receiveOnlineUserId', (userId) => {
      dispatch(conversationActions.setOnlineStatus({ userId }));
    });

    socket.on('receiveOfflineUserId', (userId) => {
      dispatch(conversationActions.seOfflineStatus({ userId }));
    });

    socket.on('receiveOnlineUserIds', (userIds) => {
      dispatch(conversationActions.initOnlineStatus({ userIds }));
    });

    socket.on('receiveStrangeConversation', async (conversationId) => {
      const response = await getConversationById({
        variables: {
          conversationId,
        },
      });

      const data = response.data?.getConversationById;

      if (data?.success)
        dispatch(conversationActions.addConversation({ conversation: data.conversation! }));
    });

    return () => {
      socket.close();
    };
  }, [socket, getConversationById, dispatch]);

  return (
    <SocketContext.Provider value={{ conversationHandler }}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
