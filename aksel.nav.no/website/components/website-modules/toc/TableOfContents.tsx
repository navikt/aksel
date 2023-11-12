import { TableOfContentsT } from "@/types";
import { BodyShort, Label } from "@navikt/ds-react";
import cl from "clsx";
import { useCallback, useState } from "react";
import styles from "./table-of-contents.module.css";
import { useScroll } from "./useScroll";
import { useToc } from "./useToc";

type TableOfContentsProps = {
  toc: TableOfContentsT;
  variant?: "default" | "subtle";
};

function TableOfContents({ toc, variant }: TableOfContentsProps) {
  const { activeId, activeSubId } = useToc(toc);

  if (toc.length === 0) {
    return null;
  }

  const style = {
    "--shadow-color":
      variant === "subtle"
        ? "var(--a-surface-subtle)"
        : "var(--a-surface-default)",
  } as React.CSSProperties;

  return (
    <aside
      className={cl(
        "min-w-60 w-min-w-60 sticky top-20 order-1 hidden self-start p-1 xl:block"
      )}
      style={style}
    >
      <Label as="h2" className="px-2" textColor="subtle">
        Innhold på siden
      </Label>
      <UlList toc={toc} activeId={activeId} activeSubId={activeSubId} />
    </aside>
  );
}

function UlList({
  activeId,
  activeSubId,
  toc,
  nested,
}: {
  activeId: string | null;
  activeSubId: string | null;
  toc: TableOfContentsT | TableOfContentsT[number]["children"];
  nested?: boolean;
}) {
  const [tocRef, setTocRef] = useState(null);
  const scrollBlock = useScroll(tocRef, !nested);

  const id = nested ? activeSubId : activeId;
  const isActive = (_id: string) => {
    if (nested) {
      return _id === id;
    }
    return _id === id && !activeSubId;
  };

  const getOpacity = useCallback(
    (n) => Math.min(Math.min(Math.max(n, 0), 100) / 70, 1).toFixed(1),
    []
  );

  const Wrapper = useCallback(
    ({ children }) =>
      nested ? <>{children}</> : <div className="relative">{children}</div>,
    [nested]
  );

  return (
    <Wrapper>
      {!nested && (
        <>
          <div
            style={{ opacity: getOpacity(scrollBlock.start) }}
            aria-hidden
            className={cl(styles.shadow, styles.shadowTop)}
          />
          <div
            style={{ opacity: getOpacity(scrollBlock.end) }}
            aria-hidden
            className={cl(styles.shadow, styles.shadowBottom)}
          />
        </>
      )}
      <ul
        ref={(el) => !nested && setTocRef(el)}
        className={cl("pl-3", !nested && styles.hideScrollbar, {
          "max-h-[70vh] overflow-y-scroll overscroll-contain": !nested,
        })}
      >
        {toc.map((lvl2) => (
          <li key={lvl2.id}>
            <>
              <a
                href={`#${lvl2.id}`}
                className={cl(
                  "hover:bg-surface-hover focus-visible:shadow-focus rounded-medium flex w-fit items-center justify-between px-2 py-1 outline-none transition-[background-color,color] duration-150 ease-out",
                  {
                    "bg-surface-hover text-deepblue-700 shadow-xsmall":
                      isActive(lvl2.id),
                  }
                )}
              >
                <BodyShort
                  size="small"
                  as="span"
                  truncate
                  className="whitespace-break-spaces"
                  weight={isActive(lvl2.id) ? "semibold" : "regular"}
                >
                  {lvl2.title}
                </BodyShort>
              </a>
              {!nested && lvl2.children.length > 0 && (
                <UlList
                  toc={lvl2.children}
                  activeId={activeId}
                  activeSubId={activeSubId}
                  nested
                />
              )}
            </>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

export default TableOfContents;
