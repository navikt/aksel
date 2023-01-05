import { Copy, SuccessStroke } from "@navikt/ds-icons";
import { Tooltip } from "@navikt/ds-react";

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

  const copyToken = () => {
    copystring(`${val}`.startsWith("--a-") ? `var(${val})` : `${val}`);

    setActiveId(id);
    setCopyTimer(true);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCopyTimer(false);
      setActiveId(null);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      setActiveId(null);
    };
  }, [setActiveId]);

  activeId !== id && clearTimeout(timerRef.current);

  return (
    <Tooltip content="Kopiert" delay={0} arrow={false} open={activeId === id}>
      <button
        onClick={() => copyToken()}
        className="z-1000 min-h-8 focus-visible:border-border-focus border-surface-default group relative w-full overflow-x-hidden overflow-y-hidden rounded border-2 text-sm focus-visible:outline-none"
      >
        <span className="flex w-full items-center justify-between gap-1 px-1">
          <span className="text-start">{val}</span>

          {/* {activeId === id ? (
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
        )} */}
        </span>
      </button>
    </Tooltip>
  );
};
