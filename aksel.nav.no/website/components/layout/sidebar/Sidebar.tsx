import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Label, Show } from "@navikt/ds-react";
import { amplitudeLogNavigation } from "@/logging";
import { SidebarT } from "@/types";
import { StatusTag } from "@/web/StatusTag";

const Sidebar = ({
  kategori,
  links,
}: {
  kategori: "komponenter" | "grunnleggende" | "templates";
  links: SidebarT;
}) => {
  return (
    <Show asChild above="md">
      <Box
        paddingBlock="0 8"
        paddingInline="2"
        aria-label={kategori}
        as="nav"
        className="w-sidebar shrink-0 self-start"
      >
        <ul className="space-y-6">
          {links.map((section) => (
            <Section key={section.value} section={section} />
          ))}
        </ul>
      </Box>
    </Show>
  );
};

function Section({ section }: { section: SidebarT[number] }) {
  const { asPath } = useRouter();

  const isActive = (slug: string) => {
    return asPath.split("#")[0] === `/${slug}`;
  };
  return (
    <li>
      <Label
        as="div"
        size="small"
        textColor="subtle"
        className="flex min-h-8 items-center px-4"
      >
        {section.title}
      </Label>
      <ul className="space-y-px pl-3">
        {section.pages.map((page) => (
          <li
            aria-current={isActive(page.slug) ? "page" : undefined}
            key={page.slug}
            data-active={isActive(page.slug)}
            className="relative mx-2 flex min-h-8 items-center rounded-medium transition-[background-color] ease-out hover:bg-surface-hover data-active:bg-surface-selected data-active:font-semibold data-active:text-deepblue-800 data-active:shadow-xsmall"
          >
            <Link
              prefetch={false}
              href={`/${page.slug}`}
              className="flex min-h-8 w-full items-center justify-between gap-2  break-words rounded-medium px-2 text-medium focus:outline-none focus-visible:z-10 focus-visible:shadow-focus"
              onClick={(e) =>
                amplitudeLogNavigation(
                  "meny",
                  e.currentTarget.getAttribute("href"),
                )
              }
            >
              {page.heading}
              <StatusTag size="xsmall" status={page.tag} />
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Sidebar;
