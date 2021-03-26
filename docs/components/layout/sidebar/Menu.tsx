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
    <AccordionMenuCollapsable title={node.title}>
      {node.children.map(mapToComponents)}
    </AccordionMenuCollapsable>
  ) : (
    <MenuLink {...node} />
  );

const Menu = ({ menu }) => (
  <AccordionMenu>{menu.map(mapToComponents)}</AccordionMenu>
);

export default Menu;
