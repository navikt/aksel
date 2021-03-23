import React, { createContext, useCallback, useContext, useState } from "react";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface ActiveAnchorStore {
  anchors: string[];
  activeAnchor?: string;
  registerAnchor: (anchor: string) => void;
  unregisterAnchor: (anchor: string) => void;
  setActiveAnchor: (anchor: string) => void;
}

export const ActiveAnchorContext = createContext({} as ActiveAnchorStore);
export const ActiveAnchorProvider = (props: Props) => {
  const { children } = props;
  const [anchors, setAnchors] = useState<string[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<string>();

  return (
    <ActiveAnchorContext.Provider
      value={{
        anchors,
        activeAnchor,
        registerAnchor: useCallback((anchor) => {
          setAnchors((anchors) => [...anchors, anchor]);
        }, []),
        unregisterAnchor: useCallback((anchor) => {
          setAnchors((anchors) => anchors.filter((a) => a !== anchor));
        }, []),
        setActiveAnchor: useCallback((anchor) => {
          setActiveAnchor(anchor);
        }, []),
      }}
    >
      {children}
    </ActiveAnchorContext.Provider>
  );
};
export const useStore = () => useContext(ActiveAnchorContext);
