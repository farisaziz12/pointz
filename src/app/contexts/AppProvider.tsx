import React, { FC, PropsWithChildren, createContext, useState } from "react";
import { useLocalStorage, useSessionStorage } from "@mantine/hooks";
import { LOCAL_STORAGE_KEYS, SESSION_STORAGE_KEYS } from "@/app/enums";

export const AppContext = createContext<any>(null);

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [storyPoints, setStoryPoints] = useState<number>(0);

  const [username, setUsername] = useLocalStorage({
    key: LOCAL_STORAGE_KEYS.POINTZ_USERNAME,
  });
  const [sessionId, setSessionId] = useSessionStorage({
    key: SESSION_STORAGE_KEYS.POINTZ_SESSION_ID,
  });

  return <AppContext.Provider value={{
    username,
    setUsername,
    sessionId,
    setSessionId,
    storyPoints,
    setStoryPoints,
  }}>{children}</AppContext.Provider>;
};
