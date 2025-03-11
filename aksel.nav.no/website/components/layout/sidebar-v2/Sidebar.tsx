import cl from "clsx";
import React, { useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Detail } from "@navikt/ds-react";
import { SidebarT } from "@/types";

type DesignsystemSidebarT = { label: string; links: SidebarT };

type SidebarProps = {
  sidebarData: DesignsystemSidebarT[];
} & React.HTMLAttributes<HTMLDivElement>;

function Sidebar(props: SidebarProps) {
  const { sidebarData, className, ...rest } = props;

  return (
    <nav
      {...rest}
      aria-label="Sidemeny"
      className={cl(className, "w-sidebar shrink-0 self-start px-2")}
    >
      <ul className="space-y-3">
        {sidebarData.map((section, index) => {
          return (
            <React.Fragment key={section.label}>
              <li>
                <Detail
                  weight="semibold"
                  className="text-ax-text-neutral-subtle py-0.5 pl-2"
                >
                  {section.label}
                </Detail>
              </li>
              {section.links.map((link) => {
                const [open, setOpen] = useState(false);
                return (
                  <li key={link.title}>
                    <button onClick={() => setOpen(!open)}>
                      {link.title}
                      <ChevronDownIcon aria-hidden />
                    </button>
                    <ul hidden={!open}>
                      {link.pages.map((page) => {
                        return <li key={page.heading}>{page.heading}</li>;
                      })}
                    </ul>
                  </li>
                );
              })}
              {index !== sidebarData.length - 1 && (
                <li
                  aria-hidden
                  className="w-ful border-ax-border-neutral-subtle h-px border-t"
                />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
}

export { Sidebar };
