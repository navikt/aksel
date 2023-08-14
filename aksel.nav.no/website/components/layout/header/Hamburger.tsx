import { MenuHamburgerIcon } from "@navikt/aksel-icons";

import { Modal } from "@navikt/ds-react";
import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { logNav } from "../..";

const LinkElement = ({ name, href, onClick }) => {
  const { asPath } = useRouter();
  return (
    <li className="flex h-11 items-center">
      <Link
        href={href}
        passHref
        className={cl(
          "hover:bg-surface-action-subtle-hover focus-visible:shadow-focus-inset relative flex h-full w-full items-center rounded px-2 focus:outline-none",
          {
            "before:bg-surface-action-selected pl-4 font-semibold before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full":
              asPath.startsWith(href),
            "": !asPath.startsWith(href),
          }
        )}
        onClick={(e) => {
          logNav(
            "header",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          );
          onClick();
        }}
      >
        {name}
      </Link>
    </li>
  );
};

export const Hamburger = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="mr-2 grid h-full place-content-center lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="focus-visible:shadow-focus hover:bg-surface-neutral-subtle-hover ml-2 flex aspect-square items-center justify-center rounded px-3 py-3 focus:outline-none"
        >
          <MenuHamburgerIcon
            fontSize="2rem"
            className="pointer-events-none"
            aria-label="Åpne meny"
          />
        </button>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: "Meny" }}
        width="small"
      >
        <Modal.Body>
          <nav aria-label="hovedmeny">
            <ul>
              <LinkElement
                onClick={() => setOpen(false)}
                name="God praksis"
                href="/god-praksis"
              />
              <LinkElement
                onClick={() => setOpen(false)}
                name="Grunnleggende"
                href="/grunnleggende"
              />
              <LinkElement
                onClick={() => setOpen(false)}
                name="Ikoner"
                href="/ikoner"
              />
              <LinkElement
                onClick={() => setOpen(false)}
                name="Komponenter"
                href="/komponenter"
              />
              <LinkElement
                onClick={() => setOpen(false)}
                name="Blogg"
                href="/produktbloggen"
              />
            </ul>
          </nav>
        </Modal.Body>
      </Modal>
    </>
  );
};
