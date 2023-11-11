import { amplitudeLogNavigation } from "@/logging";
import { SidebarT } from "@/types";
import { Box, Label, Show } from "@navikt/ds-react";
import cl from "clsx";
import { useRouter } from "next/router";

const Sidebar = ({
  kategori,
  links,
}: {
  kategori: "komponenter" | "grunnleggende" | "templates";
  links: SidebarT;
}) => {
  console.log(links);
  return (
    <Show asChild above="md">
      <Box
        paddingBlock="0 8"
        paddingInline="8 2"
        aria-label={kategori}
        data-testid="ds-sidebar"
        as="nav"
        className="w-sidebar shrink-0 self-start"
      >
        <ul className="space-y-6">
          {links.map((section) => (
            <>
              <Section key={section.value} section={section} />
              <hr className="bg-border-divider h-px border-none last-of-type:hidden" />
            </>
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
        className="min-h-8 text-deepblue-800 flex items-center px-4"
      >
        {section.title}
      </Label>
      <ul className="space-y-px">
        {section.pages.map((page) => (
          <li
            aria-current={isActive(page.slug) ? "page" : undefined}
            key={page.slug}
            className={cl(
              "rounded-medium hover:bg-surface-hover min-h-8 relative mx-2 flex items-center transition-[background-color] ease-out",
              {
                "bg-surface-selected text-deepblue-800 font-semibold": isActive(
                  page.slug
                ),
                "after:absolute after:-left-2 after:h-6 after:w-1 after:rounded-lg after:bg-blue-700":
                  isActive(page.slug),
              }
            )}
          >
            <a
              href={`/${page.slug}`}
              className="text-medium min-h-8 flex w-full items-center px-2"
              onClick={(e) => {
                amplitudeLogNavigation(
                  "meny",
                  e.currentTarget.getAttribute("href")
                );
              }}
            >
              {page.heading}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Sidebar;
