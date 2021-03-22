import React, { createContext, useCallback, useContext, useState } from "react";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface Anchor {
  id: string;
}

export interface ActiveAnchorStore {
  anchors: Anchor[];
  activeAnchor?: Anchor;
  registerAnchor: (anchor: Anchor) => void;
  unregisterAnchor: (anchor: Anchor) => void;
  setActiveAnchor: (anchor: Anchor) => void;
}

export const ActiveAnchorContext = createContext({} as ActiveAnchorStore);
export const ActiveAnchorProvider = (props: Props) => {
  const { children } = props;
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<Anchor>();

  return (
    <ActiveAnchorContext.Provider
      value={{
        anchors,
        activeAnchor,
        registerAnchor: useCallback((anchor) => {
          setAnchors((anchors) => [...anchors, anchor]);
        }, []),
        unregisterAnchor: useCallback((anchor) => {
          setAnchors((anchors) => anchors.filter((a) => a.id !== anchor.id));
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
