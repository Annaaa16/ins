import { createContext, ReactNode } from 'react';
// import io from 'socket.io-client';

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext({});

// let socket;

const SocketProvider = ({ children }: SocketProviderProps) => {
  // useEffect(() => {
  //   socketInitializer();
  // }, []);

  // const socketInitializer = async () => {
  //   await fetch('/api/socket');
  //   socket = io();

  //   socket.on('connect', () => {
  //     console.log('connected');
  //   });
  // };

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
