import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useId, useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort } from "@navikt/ds-react";
import { SidebarT } from "@/types";

type DesignsystemSidebarT = { label: string; links: SidebarT };

type SidebarProps = {
  sidebarData: DesignsystemSidebarT[];
} & React.HTMLAttributes<HTMLDivElement>;

const NotchClasses =
  "before:bg-ax-bg-brand-blue-strong before:absolute before:-left-2 before:top-1/2 before:h-[calc(100%-8px)] before:w-[3px] before:-translate-y-1/2 before:rounded-full";

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
      <BodyShort as="ul" className="space-y-3">
        {sidebarData.map((section, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const id = useId();
          return (
            <React.Fragment key={section.label}>
              <li>
                <BodyShort
                  as="div"
                  weight="semibold"
                  className="text-ax-text-neutral-subtle py-0.5 pl-2"
                  id={id}
                >
                  {section.label}
                </BodyShort>
                <ul aria-labelledby={id}>
                  {section.links.map((link) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [open, setOpen] = useState(false);

                    const isSectionActive = link.pages.some((page) =>
                      isActive(page.slug),
                    );

                    return (
                      <li key={link.title}>
                        <button
                          onClick={() => setOpen(!open)}
                          className={cl(
                            "focus-preset-tight hover:bg-ax-bg-neutral-moderate-hoverA relative flex w-full items-center justify-between self-stretch rounded-medium py-1 pl-2 pr-1 leading-5",
                            isSectionActive && !open && NotchClasses,
                            {
                              "bg-ax-bg-neutral-moderate":
                                isSectionActive && !open,
                            },
                          )}
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
                                className="group relative text-medium leading-5"
                                key={page.heading}
                              >
                                <Link
                                  href={`/${page.slug}`}
                                  className={cl(
                                    "focus-preset-tight block rounded-medium py-0.5",
                                    active && NotchClasses,
                                    {
                                      "font-bold": active,
                                    },
                                  )}
                                >
                                  <span
                                    className={cl(
                                      "block rounded-medium px-2 py-1 pl-4",
                                      {
                                        "bg-ax-bg-brand-blue-moderateA text-ax-text-brand-blue":
                                          active,
                                        "group-hover:bg-ax-bg-neutral-moderate-hoverA":
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
      </BodyShort>
    </nav>
  );
}

export { Sidebar };
