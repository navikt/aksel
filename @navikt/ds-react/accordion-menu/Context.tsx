import React, { createContext, useCallback, useContext, useState } from "react";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface Anchor {
  id: string;
}

export interface Context {
  anchors: Anchor[];
  activeAnchor?: Anchor;
  registerAnchor: (anchor: Anchor) => void;
  unregisterAnchor: (id: string) => void;
  setActiveAnchor: (anchor: Anchor) => void;
}

export const StoreContext = createContext({} as Context);
export const StoreProvider = (props: Props) => {
  const { children } = props;
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<Anchor>();

  return (
    <StoreContext.Provider
      value={{
        anchors,
        activeAnchor,
        registerAnchor: useCallback((anchor) => {
          setAnchors((anchors) => [...anchors, anchor]);
        }, []),
        unregisterAnchor: useCallback((anchor) => {
          setAnchors((anchors) => anchors.filter((a) => a.id !== anchor));
        }, []),
        setActiveAnchor: useCallback((anchor) => {
          setActiveAnchor(anchor);
        }, []),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
