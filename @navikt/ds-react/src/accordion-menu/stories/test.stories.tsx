import * as React from "react";
import { AccordionMenu, AccordionMenuItem } from "../index";
import { Link, HashRouter as Router, LinkProps } from "react-router-dom";
import { useRef } from "react";

export default {
  title: "ds-react/test",
  component: { AccordionMenu },
};

export const ReactRouter = () => {
  const anchor = useRef<HTMLAnchorElement>();
  const area = useRef<HTMLAreaElement>();

  return (
    <Router>
      <AccordionMenu>
        <AccordionMenuItem href="hmm">Nivå 1</AccordionMenuItem>
        <AccordionMenuItem>Nivå 1</AccordionMenuItem>
        <AccordionMenuItem ref={anchor}>Nivå 1</AccordionMenuItem>
        <AccordionMenuItem as="area" media="w">
          Nivå 1
        </AccordionMenuItem>
        <AccordionMenuItem as={Link} to="df">
          Nivå 1
        </AccordionMenuItem>
      </AccordionMenu>
    </Router>
  );
};
