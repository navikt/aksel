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

  const registerAnchor = (anchor) =>
    setAnchors((anchors) => [...anchors, anchor]);

  const unregisterAnchor = (anchor) =>
    setAnchors((prevAnchors) => prevAnchors.filter((a) => a.id !== anchor));

  return (
    <StoreContext.Provider
      value={{
        anchors,
        activeAnchor,
        registerAnchor,
        unregisterAnchor,
        setActiveAnchor,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
