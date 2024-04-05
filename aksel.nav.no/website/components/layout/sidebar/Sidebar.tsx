import { useRouter } from "next/router";
import { Box, Show } from "@navikt/ds-react";
import { SidebarT } from "@/types";
import { StatusTag } from "@/web/StatusTag";
import { Menu, MenuHeading, MenuLi, MenuLink, MenuUl } from "@/web/menu/Menu";

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
        <Menu loggingContext="meny" variant="sidebar">
          <ul className="space-y-6">
            {links.map((section) => (
              <Section key={section.value} section={section} />
            ))}
          </ul>
        </Menu>
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
      <MenuHeading as="div">{section.title}</MenuHeading>
      <MenuUl>
        {section.pages.map((page) => (
          <MenuLi
            aria-current={isActive(page.slug) ? "page" : undefined}
            key={page.slug}
          >
            <MenuLink href={`/${page.slug}`} selected={isActive(page.slug)}>
              <span className="flex items-center justify-between">
                {page.heading}
                <StatusTag size="xsmall" status={page.tag} />
              </span>
            </MenuLink>
          </MenuLi>
        ))}
      </MenuUl>
    </li>
  );
}

export default Sidebar;
