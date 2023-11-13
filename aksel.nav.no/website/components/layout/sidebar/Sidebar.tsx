import { amplitudeLogNavigation } from "@/logging";
import { SidebarT } from "@/types";
import { StatusTag } from "@/web/StatusTag";
import { Box, Label, Show } from "@navikt/ds-react";
import { useRouter } from "next/router";

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
        className="min-h-8 flex items-center px-4"
      >
        {section.title}
      </Label>
      <ul className="space-y-px pl-3">
        {section.pages.map((page) => (
          <li
            aria-current={isActive(page.slug) ? "page" : undefined}
            key={page.slug}
            data-active={isActive(page.slug)}
            className="rounded-medium hover:bg-surface-hover min-h-8 data-active:bg-surface-selected data-active:text-deepblue-800 data-active:shadow-xsmall data-active:font-semibold relative mx-2 flex items-center transition-[background-color] ease-out"
          >
            <a
              href={`/${page.slug}`}
              className="text-medium min-h-8 rounded-medium focus-visible:shadow-focus flex w-full  items-center justify-between gap-2 break-words px-2 focus:outline-none focus-visible:z-10"
              onClick={(e) => {
                amplitudeLogNavigation(
                  "meny",
                  e.currentTarget.getAttribute("href")
                );
              }}
            >
              {page.heading}
              <StatusTag size="xsmall" status={page.tag} />
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Sidebar;
