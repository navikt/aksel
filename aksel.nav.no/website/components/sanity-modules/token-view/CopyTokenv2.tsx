import { Copy, SuccessStroke } from "@navikt/ds-icons";

import copystring from "copy-to-clipboard";
import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export const CopyContext = createContext(null);

export const CopyProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <CopyContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </CopyContext.Provider>
  );
};

export const CopyToken = ({ val }: { val: string }) => {
  const { activeId, setActiveId } = useContext(CopyContext);
  const timerRef = useRef(null);
  const id = useId();

  const [copyTimer, setCopyTimer] = useState(false);
  const [done, setDone] = useState(true);

  const copyToken = () => {
    copystring(`${val}`.startsWith("--a-") ? `var(${val})` : `${val}`);
    setActiveId(id);

    if (done) {
      clearTimeout(timerRef.current);
      setCopyTimer(true);
      setDone(false);
      timerRef.current = setTimeout(() => {
        setCopyTimer(false);
        setDone(true);
        setActiveId(null);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      setActiveId(null);
    };
  }, [setActiveId]);

  activeId !== id && clearTimeout(timerRef.current);

  return (
    <button
      onClick={() => copyToken()}
      className="z-1000 focus-visible:border-border-focus border-surface-default group relative h-8 w-full overflow-x-hidden overflow-y-hidden rounded border-2 font-mono text-sm focus-visible:outline-none"
      aria-label={
        copyTimer ? "kopierte token" : `kopier ${`${val}`.replace("--a-", "")}`
      }
    >
      <span className="flex h-7 w-full items-center justify-between gap-1 px-2">
        <span aria-hidden>{val}</span>

        {activeId === id ? (
          <SuccessStroke
            className="text-text-subtle h-5 w-5 flex-shrink-0"
            aria-hidden
            title="Kopier"
          />
        ) : (
          <span className="grid h-5 w-5 place-items-center">
            <Copy
              className="text-text-subtle h-3 w-3 flex-shrink-0"
              aria-hidden
              title="Kopier"
            />
          </span>
        )}
      </span>
    </button>
  );
};
