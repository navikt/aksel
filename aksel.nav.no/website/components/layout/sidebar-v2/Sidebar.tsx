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
                  className="text-ax-text-neutral-subtle py-0.5 pl-2"
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
                          className="focus-preset hover:bg-ax-bg-neutral-moderate-hoverA flex w-full items-center justify-between self-stretch rounded-medium py-1 pl-2 pr-1 text-medium leading-5"
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
                                className="focus- relative text-medium leading-5"
                                key={page.heading}
                              >
                                <Link
                                  href={`/${page.slug}`}
                                  className={cl(
                                    "focus-preset block rounded-medium py-0.5 pl-4",
                                    {
                                      "before:bg-ax-bg-brand-blue-strong before:absolute before:left-2 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-full":
                                        active,
                                      "before:bg-ax-border-neutral-subtleA before:absolute before:left-3 before:h-full before:w-px":
                                        !active,
                                    },
                                  )}
                                >
                                  <span
                                    className={cl(
                                      "block rounded-medium px-2 py-1",
                                      {
                                        "bg-ax-bg-brand-blue-moderateA": active,
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
