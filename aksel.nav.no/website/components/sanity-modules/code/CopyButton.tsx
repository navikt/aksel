import { Copy, SuccessStroke } from "@navikt/ds-icons";
import { useRef, useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import React from "react";
import cl from "classnames";
import style from "./index.module.css";

const copyCode = (content: string) =>
  copy(content, {
    format: "text/plain",
  });

interface CopyButtonProps {
  content: string;
  inTabs?: boolean;
  inverted?: boolean;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ content, inTabs, inverted = false }, ref) => {
    const [active, setActive] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
      if (active) {
        timeoutRef.current = setTimeout(() => setActive(false), 3000);
        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
      }
    }, [active]);

    const handleCopy = () => {
      copyCode(content);
      setActive(true);
    };

    return (
      <button
        ref={ref}
        aria-live={active ? "polite" : "off"}
        role={active ? "alert" : undefined}
        className={cl(style.copybutton, "navds-body-short group z-10", {
          "flex w-16 items-center justify-center hover:bg-blue-50 focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_theme(colors.focus)]":
            inTabs,
          "text-text focus-visible:outline-focus absolute top-2 right-2 rounded bg-gray-100 px-2 py-1 hover:bg-gray-900/10 hover:underline focus-visible:outline-2":
            !inTabs && inverted,
          "text-text-inverted focus-visible:shadow-focus-inverted absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded bg-gray-900 hover:bg-gray-800 focus:outline-none":
            !inTabs && !inverted,
        })}
        onClick={handleCopy}
      >
        {active ? (
          <SuccessStroke
            className="text-[1.5rem]"
            aria-label="Kopierte kodesnutt"
          />
        ) : (
          <Copy
            className="text-[1.5rem] opacity-75 group-hover:opacity-100"
            aria-label="Kopier kodesnutt"
          />
        )}
      </button>
    );
  }
);

export default CopyButton;
