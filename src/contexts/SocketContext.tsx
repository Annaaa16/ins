import { ReactNode, createContext, useEffect, useContext, useState } from 'react';

import io, { Socket } from 'socket.io-client';

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext({});

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    (async () => {
      await fetch('/api/socket');

      setSocket(
        io({
          withCredentials: true,
        }),
      );
    })();
  }, []);

  useEffect(() => {
    if (socket == null) return;

    return () => {
      socket.close();
    };
  }, [socket]);

  const sendMessage = (msg: string) => {
    socket?.emit('sendMessage', msg);
  };

  return <SocketContext.Provider value={{ sendMessage }}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
