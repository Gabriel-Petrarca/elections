import React, { createContext, useContext } from 'react';
import socketIOClient from 'socket.io-client';


const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
  const socket = socketIOClient('http://localhost:5000'); 

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};


export const useSocket = () => useContext(SocketContext);
