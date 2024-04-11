'use client';

import { IJoinRoom, IOnEvent } from '@/interfaces/socket.interface';
import { store } from '@/redux/store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const initialState: {
  setConnected: (value: boolean) => void;
  joinRoom: (payload: IJoinRoom) => Promise<void>;
  onEvent: (payload: IOnEvent) => void;
  isSocketConnected: boolean;
} = {
  isSocketConnected: false,
  onEvent: () => {},
  setConnected: () => {},
  joinRoom: async () => {},
};

const SocketContext = createContext(initialState);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isconnected, setIsconnected] = useState(false);

  useEffect(() => {
    const socketIO = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      path: process.env.NEXT_PUBLIC_SOCKET_PATH,
      auth: {
        token: store.getState().auth.token,
      },
    });

    setSocket(() => {
      return socketIO;
    });

    socketIO.on('connect', () => {
      console.log('socket connected');
      setIsconnected(true);
    });

    socketIO.on('connect_error', (error: any) => {
      // if (error.message === 'Unauthorized') {
      //   window.location.replace('/login');
      // }
      console.log(error, 'socket connection error');
      setIsconnected(false);
    });

    socketIO.on('disconnect', (reason: any) => {
      setIsconnected(false);
    });

    return () => {
      socketIO.disconnect();
    };
  }, []);

  const setConnected = (value: boolean): void => {
    setIsconnected(value);
  };

  const joinRoom = async ({
    userId,
    userType,
    room,
  }: IJoinRoom): Promise<void> => {
    if (socket) {
      socket.emit(room, {
        user_id: userId,
        user_type: userType,
      });
    }
  };

  const onEvent = ({ event, handler }: IOnEvent): void => {
    if (socket) {
      socket.on(event, handler);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        isSocketConnected: isconnected,
        joinRoom,
        onEvent,
        setConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
