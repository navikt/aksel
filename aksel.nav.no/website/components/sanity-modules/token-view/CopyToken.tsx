import { Copy, SuccessStroke } from "@navikt/ds-icons";
import cl from "clsx";
import copystring from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";

export const CopyToken = ({ val }: { val: string }) => {
  const timerRef = useRef(null);

  const [copyTimer, setCopyTimer] = useState(false);
  const [done, setDone] = useState(true);

  const copyToken = () => {
    copystring(`var(${val})`);

    if (done) {
      clearTimeout(timerRef.current);
      setCopyTimer(true);
      setDone(false);
      timerRef.current = setTimeout(() => {
        setCopyTimer(false);
        setDone(true);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <button
      onClick={() => copyToken()}
      className="bg-surface-subtle z-1000 hover:text-text-subtle focus-visible:border-border-focus border-surface-default group relative h-8 w-full overflow-x-hidden overflow-y-hidden whitespace-nowrap rounded border-2 font-mono text-sm focus-visible:outline-none"
      aria-label={
        copyTimer ? "kopierte token" : `kopier ${val.replace("--a-", "")}`
      }
    >
      <span
        className={cl("flex h-7 w-full items-center justify-between px-2", {
          "animate-popout -translate-y-full": copyTimer,
        })}
      >
        <span aria-hidden>{val}</span>

        <span className="text-text-subtle bg-surface-subtle group-hover:text-text-default absolute right-2 flex h-7 translate-x-3/4 items-center gap-1 px-1 text-sm shadow-[-7px_0_8px_0px_var(--a-surface-subbg-surface-subtle)] transition-transform duration-200 group-hover:translate-x-0">
          <Copy aria-hidden className="h-4 w-4 flex-shrink-0" />
          <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Kopier
          </span>
        </span>
      </span>

      <span
        className={cl(
          "bg-surface-action-selected text-md text-text-on-action flex h-7 w-full px-2 font-sans text-sm",
          { "animate-popup translate-y-[-100%]": copyTimer }
        )}
        aria-hidden
      >
        <span
          className={cl("flex w-full items-center justify-center gap-1", {
            "animate-textbounce": copyTimer,
          })}
        >
          <SuccessStroke aria-hidden className="h-5 w-5 flex-shrink-0" />
          Kopiert
        </span>
      </span>
    </button>
  );
};
