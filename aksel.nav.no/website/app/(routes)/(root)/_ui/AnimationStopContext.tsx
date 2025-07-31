"use client";

import React, { createContext, useState } from "react";

type Context = {
  pauseAnimationState: boolean;
  setPauseAnimationState: CallableFunction;
};

export const PauseAnimationContext = createContext<Context>({
  pauseAnimationState: false,
  setPauseAnimationState: () => {},
});

export const PauseAnimationProvider = ({ children }) => {
  const [pauseAnimationState, setPauseAnimationState] = useState(false);
  return (
    <PauseAnimationContext.Provider
      value={{
        pauseAnimationState,
        setPauseAnimationState,
      }}
    >
      {children}
    </PauseAnimationContext.Provider>
  );
};
