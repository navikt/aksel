import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";

export interface ActiveAnchorStore {
  activeAnchor?: string;
  registerAnchor: (anchor: string) => void;
  unregisterAnchor: (anchor: string) => void;
}

export const ActiveAnchorContext = createContext({} as ActiveAnchorStore);
export const ActiveAnchorProvider = ({ children }) => {
  const [anchors, setAnchors] = useState<string[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<string>();

  useEffect(() => {
    const scrollListener = () => {
      const offset = 100;
      const lastPassedAnchor = anchors
        .map((anchor) => document.getElementById(anchor))
        .map((element: HTMLElement) => ({
          id: element.id,
          top: element.getBoundingClientRect().top - offset,
          scrolledToBottom:
            window.innerHeight + window.pageYOffset >=
            document.body.offsetHeight,
        }))
        .filter((element) => element.scrolledToBottom || element.top <= 0)
        .sort((a, b) => (a.top < b.top ? -1 : 1))
        .map((anchor) => anchor.id)
        .pop();

      // Set active anchor and related url hash
      if (lastPassedAnchor && activeAnchor !== lastPassedAnchor) {
        const { href, hash } = window.location;
        const urlWithoutHash = href.replace(hash, "");
        const urlWithAnchor = `${urlWithoutHash}#${lastPassedAnchor}`;
        const title = document.title;
        window.history.replaceState(window.history.state, title, urlWithAnchor);
        setActiveAnchor(lastPassedAnchor);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [anchors, activeAnchor]);

  return (
    <ActiveAnchorContext.Provider
      value={{
        activeAnchor,
        registerAnchor: useCallback((anchor) => {
          setAnchors((anchors) => [...anchors, anchor]);
        }, []),
        unregisterAnchor: useCallback((anchor) => {
          setAnchors((anchors) => anchors.filter((a) => a !== anchor));
        }, []),
      }}
    >
      {children}
    </ActiveAnchorContext.Provider>
  );
};
export const useStore = () => useContext(ActiveAnchorContext);
