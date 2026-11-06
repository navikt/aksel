"use client";

import React, { createContext, useMemo, useState } from "react";

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
  const contextValue = useMemo(
    () => ({ pauseAnimationState, setPauseAnimationState }),
    [pauseAnimationState],
  );

  return (
    <PauseAnimationContext.Provider value={contextValue}>
      {children}
    </PauseAnimationContext.Provider>
  );
};
