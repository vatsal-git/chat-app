import { React } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

const CurrentRoomContext = createContext();

export const CurrentRoomProvider = ({ children, data }) => (
  <CurrentRoomContext.Provider value={data}>
    {children}
  </CurrentRoomContext.Provider>
);

export const useCurrentRoom = selector =>
  useContextSelector(CurrentRoomContext, selector);
