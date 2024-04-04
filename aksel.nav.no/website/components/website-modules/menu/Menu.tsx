import cl from "clsx";
import Link from "next/link";
import { BodyShort, Label } from "@navikt/ds-react";
import { amplitudeLogNavigation } from "@/logging";

type MenuProps = {
  children: React.ReactNode;
};

export function Menu({ children }: MenuProps) {
  return <div>{children}</div>;
}

type MenuHeadingProps = {
  children: React.ReactNode;
};

export function MenuHeading({ children }: MenuHeadingProps) {
  return (
    <Label as="div" size="small" textColor="subtle" className="py-05">
      {children}
    </Label>
  );
}

type MenuListItemProps = {
  children: React.ReactNode;
  selected?: boolean;
  href: string;
};

export function MenuListItem({ children, href, selected }: MenuListItemProps) {
  return (
    <li className="group relative border-l border-border-subtle">
      <BodyShort
        size="small"
        as={Link}
        prefetch={false}
        href={href}
        onClick={(e) =>
          amplitudeLogNavigation("meny", e.currentTarget.getAttribute("href"))
        }
        className={cl(
          "ml-2 flex py-05 group-last:last-of-type:pb-0 group-first-of-type:pt-0",
          "before:absolute before:-left-px before:top-05 before:h-6 before:rounded-r-sm group-first-of-type:before:top-0",
          {
            "text-text-subtle before:w-0 before:bg-gray-400 before:transition-[width] before:duration-100 before:ease-[cubic-bezier(0.3,0,0.15,1)] hover:text-text-default hover:before:w-1":
              !selected,
            "text-deepblue-700 before:w-1 before:bg-deepblue-700": selected,
          },
        )}
      >
        <span
          className={cl("rounded px-2 py-05", {
            "bg-surface-selected": selected,
            "": !selected,
          })}
        >
          {children}
        </span>
      </BodyShort>
    </li>
  );
}
