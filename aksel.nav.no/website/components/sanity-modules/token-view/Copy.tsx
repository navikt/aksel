import { CheckmarkIcon, ClipboardIcon } from "@navikt/aksel-icons";
import { useEffect, useRef, useState } from "react";
import cl from "clsx";

export const Copy = ({ text, copyText }) => {
  const [active, setActive] = useState(false);
  const [canfade, setCanfade] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setCanfade(true);
    navigator.clipboard.writeText(copyText);
    setActive(true);

    timeoutRef.current = window.setTimeout(() => {
      setActive(false);
    }, 2000);
  };

  return (
    <button
      type="button"
      aria-live="polite"
      className="py-05 focus-visible:shadow-focus min-h-8 text-medium hover:bg-surface-neutral-subtle-hover group rounded px-1 leading-none focus:outline-none"
      onClick={handleClick}
    >
      <span className="inline-flex flex-row-reverse items-center gap-1">
        <span>
          {active ? (
            <CheckmarkIcon title="Kopiert" className="animate-textbounce" />
          ) : (
            <ClipboardIcon
              title="Kopier css-variabel"
              className={cl(canfade && "animate-fadeIn")}
            />
          )}
        </span>
        <span aria-live="polite">{text}</span>
      </span>
    </button>
  );
};
