import { useRouter } from "next/router";
import Link from "next/link";
import {
  AccordionMenu,
  AccordionMenuCollapsable,
  AccordionMenuItem,
} from "@navikt/ds-react";

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

const mapToComponents = (node) =>
  node.children ? (
    <AccordionMenuCollapsable key={node.title} title={node.title}>
      {node.children.map(mapToComponents)}
    </AccordionMenuCollapsable>
  ) : (
    <MenuLink key={node.title} {...node} />
  );

const Menu = ({ menu }) => (
  <AccordionMenu>{menu.map(mapToComponents)}</AccordionMenu>
);

export default Menu;
