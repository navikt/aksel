import { Label } from "@navikt/ds-react";
import { TableOfContentsT } from "@/types";
import { ScrollFade } from "./parts/ScrollFade";
import { UlList } from "./parts/UlList";
import { useToc } from "./useToc";

type TableOfContentsProps = {
  toc: TableOfContentsT;
  variant?: "default" | "subtle";
};

function TableOfContents({ toc, variant }: TableOfContentsProps) {
  const tocCtx = useToc(toc);

  if (toc.length === 0) {
    return null;
  }

  /**
   * We have to add this to account for different backgrounds for god-praksis and komponent-pages
   */
  const style = {
    "--shadow-color":
      variant === "subtle"
        ? "var(--a-surface-subtle)"
        : "var(--a-surface-default)",
  } as React.CSSProperties;

  return (
    <aside
      className="sticky top-20 order-1 hidden min-w-60 self-start p-1 xl:block"
      style={style}
    >
      <Label as="h2" size="small" textColor="subtle" className="py-05">
        Innhold på siden
      </Label>
      <div className="relative">
        <ScrollFade />
        <UlList toc={toc} tocProps={tocCtx} />
      </div>
    </aside>
  );
}

export { TableOfContents };
