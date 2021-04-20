import { useRouter } from "next/router";
import Link from "next/link";
import {
  AccordionMenu,
  AccordionMenuCollapsable,
  AccordionMenuItem,
} from "@navikt/ds-react";
import React from "react";

const MenuLink = (node) => {
  const { asPath } = useRouter();

  return (
    <Link href={node.pathName} passHref>
      <AccordionMenuItem active={asPath === node.pathName}>
        {node.title}
      </AccordionMenuItem>
    </Link>
  );
};

const isActive = (children, path) => {
  path = path.split("#")[0];
  const active = children.find((child) => {
    return child.children
      ? isActive(child.children, path)
      : child.pathName === path;
  });
  return active;
};

const mapToComponents = (node, path) => {
  const active = node.children ? isActive(node.children, path) : false;

  return node.children ? (
    <AccordionMenuCollapsable
      defaultOpen={active}
      key={node.title}
      title={node.title}
    >
      {node.children.map((item) => mapToComponents(item, path))}
    </AccordionMenuCollapsable>
  ) : (
    <MenuLink key={node.title} {...node} />
  );
};

const Menu = ({ menu }) => {
  const { asPath } = useRouter();
  return (
    <AccordionMenu>
      {menu.map((item) => mapToComponents(item, asPath))}
    </AccordionMenu>
  );
};

export default Menu;
