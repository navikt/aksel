import cl from "clsx";
import React, { useId, useState } from "react";
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
      className={cl(className, "relative w-sidebar shrink-0 self-start px-2")}
    >
      <ul className="space-y-3">
        {sidebarData.map((section, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const id = useId();
          return (
            <React.Fragment key={section.label}>
              <li>
                <Detail
                  as="div"
                  weight="semibold"
                  className="py-0.5 pl-2 text-ax-text-neutral-subtle"
                  id={id}
                >
                  {section.label}
                </Detail>
                <ul aria-labelledby={id}>
                  {section.links.map((link) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [open, setOpen] = useState(false);
                    return (
                      <li key={link.title}>
                        <button
                          onClick={() => setOpen(!open)}
                          className="flex w-full items-center justify-between self-stretch rounded-medium py-1 pl-2 pr-1 text-medium leading-5 hover:bg-ax-bg-neutral-moderate-hoverA"
                          aria-expanded={open}
                        >
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
                </ul>
              </li>
              {index !== sidebarData.length - 1 && (
                <li
                  aria-hidden
                  className="w-ful h-px border-t border-ax-border-neutral-subtle"
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
