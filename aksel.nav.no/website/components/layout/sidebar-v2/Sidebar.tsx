import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
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

  const { asPath } = useRouter();

  const isActive = (slug: string) => {
    return asPath.split("#")[0] === `/${slug}`;
  };

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
                          className="focus-preset flex w-full items-center justify-between self-stretch rounded-medium py-1 pl-2 pr-1 text-medium leading-5 hover:bg-ax-bg-neutral-moderate-hoverA"
                          aria-expanded={open}
                        >
                          {link.title}
                          <ChevronDownIcon aria-hidden />
                        </button>
                        <ul hidden={!open} className="">
                          {link.pages.map((page) => {
                            const active = isActive(page.slug);
                            return (
                              <li
                                className="relative text-medium leading-5"
                                key={page.heading}
                              >
                                <Link
                                  href={`/${page.slug}`}
                                  className={cl(
                                    "focus-preset block rounded-medium py-0.5 pl-4",
                                    {
                                      "font-bold before:absolute before:left-2 before:top-1/2 before:h-3/4 before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-ax-bg-brand-blue-strong-pressed":
                                        active,
                                      "before:absolute before:left-[9px] before:top-0 before:h-full before:w-px before:bg-ax-border-neutral-subtleA":
                                        !active,
                                    },
                                  )}
                                >
                                  <span
                                    className={cl(
                                      "block rounded-medium px-2 py-1",
                                      {
                                        "bg-ax-bg-neutral-moderateA": active,
                                        "hover:bg-ax-bg-neutral-moderate-hoverA":
                                          !active,
                                      },
                                    )}
                                  >
                                    {page.heading}
                                  </span>
                                </Link>
                              </li>
                            );
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
