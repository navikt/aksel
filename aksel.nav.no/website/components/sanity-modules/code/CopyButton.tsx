import { useRef, useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import React from "react";
import cl from "clsx";
import style from "./index.module.css";
import { CheckmarkIcon, ClipboardIcon } from "@navikt/aksel-icons";

const copyCode = (content: string) =>
  copy(content, {
    format: "text/plain",
  });

interface CopyButtonProps {
  content: string;
  onClick?: (event: MouseEvent) => void;
  variant?: "tokentable" | "codeblock";
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ content, onClick, variant = "codeblock" }, ref) => {
    const [active, setActive] = useState(false);

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
      return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    const handleCopy = (event: MouseEvent) => {
      copyCode(content);
      setActive(true);
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setActive(false), 1000);
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <button
        ref={ref}
        aria-live={active ? "polite" : "off"}
        role={active ? "alert" : undefined}
        className={cl(
          style.copybutton,
          "navds-body-short group/button absolute top-2 right-2 z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded backdrop-blur transition duration-75 focus:outline-none",
          {
            "hover:text-text-on-inverted focus-visible:shadow-focus-inverted text-3xl  text-gray-100 hover:bg-white/20 ":
              variant === "codeblock",
            "hover:text-deepblue-800 focus-visible:shadow-focus text-text-subtle  hover:bg-surface-hover text-2xl":
              variant === "tokentable",
          }
        )}
        onClick={handleCopy}
      >
        <span
          aria-hidden={!active}
          className={cl(
            "absolute inset-0 grid place-content-center transition duration-300",
            {
              "pointer-events-none translate-y-1.5 opacity-0": !active,
            }
          )}
        >
          <CheckmarkIcon title="Kopierte kodesnutt" />
        </span>

        <span
          aria-hidden={active}
          className={cl("flex items-center transition duration-300", {
            "pointer-events-none -translate-y-1.5 opacity-0": active,
            "group-hover/button:opacity-100": !active,
          })}
        >
          <ClipboardIcon title="Kopier kodesnutt" />
        </span>
      </button>
    );
  }
);

export default CopyButton;
