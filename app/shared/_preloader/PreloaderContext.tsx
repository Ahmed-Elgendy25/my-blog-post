"use client";
import React, { createContext, useContext, useState } from "react";

type PreloaderContextType = {
  preloaderFinished: boolean;
  setPreloaderFinished: (finished: boolean) => void;
};

const PreloaderContext = createContext<PreloaderContextType>({
  preloaderFinished: false,
  setPreloaderFinished: () => {},
});

export const usePreloaderContext = () => useContext(PreloaderContext);

export const PreloaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  return (
    <PreloaderContext.Provider
      value={{ preloaderFinished, setPreloaderFinished }}
    >
      {children}
    </PreloaderContext.Provider>
  );
};
