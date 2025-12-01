"use client";

import React, { createContext, useState } from "react";

type Context = {
  pauseAnimationState: boolean;
  setPauseAnimationState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PauseAnimationContext = createContext<Context>({
  pauseAnimationState: false,
  setPauseAnimationState: () => {},
});

export const PauseAnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
