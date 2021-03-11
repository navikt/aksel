import React, { createContext, useContext, useState } from "react";
interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface Anchor {
  id: string;
}

export const StoreContext = createContext(
  {} as {
    anchors: Anchor[];
    activeAnchor?: Anchor;
    registerAnchor: (anchor: Anchor) => void;
    unregisterAnchor: (id: string) => void;
    setActiveAnchor: (anchor: Anchor) => void;
  }
);

export const StoreProvider = (props: Props) => {
  const { children } = props;
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<Anchor>();

  return (
    <StoreContext.Provider
      value={{
        anchors,
        activeAnchor,
        registerAnchor: (anchor) =>
          setAnchors((anchors) => [...anchors, anchor]),
        unregisterAnchor: (id) =>
          setAnchors((anchors) => anchors.filter((a) => a.id !== id)),
        setActiveAnchor,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
