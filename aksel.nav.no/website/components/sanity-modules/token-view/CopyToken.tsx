import { Copy, SuccessStroke } from "@navikt/ds-icons";

import copystring from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";

export const CopyToken = ({ val }: { val: string }) => {
  const timerRef = useRef(null);

  const [copyTimer, setCopyTimer] = useState(false);

  const copyToken = (e) => {
    e.preventDefault();
    copystring(val);
    setCopyTimer(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopyTimer(false), 2000);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <button
      onClick={copyToken}
      className="hover:bg-surface-neutral-subtle-hover bg-surface-neutral-subtle focus-visible:outline-border-focus group flex h-8 w-full items-center justify-between overflow-x-hidden whitespace-nowrap rounded px-2 font-mono text-sm focus-visible:outline-2 "
      aria-label={
        copyTimer ? "kopierte token" : `kopier ${val.replace("--a-", "")}`
      }
    >
      {copyTimer ? (
        <span aria-hidden className="font-sans">
          Kopiert!
        </span>
      ) : (
        <span aria-hidden>{val}</span>
      )}

      {copyTimer ? (
        <SuccessStroke
          aria-hidden
          className="text-text-default h-5 w-5 flex-shrink-0"
        />
      ) : (
        <Copy
          aria-hidden
          className="text-text-subtle group-hover:text-text-default h-4 w-4 flex-shrink-0"
        />
      )}
    </button>
  );
};
