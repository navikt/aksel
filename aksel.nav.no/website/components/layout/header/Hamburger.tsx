import { MenuHamburgerIcon, XMarkIcon } from "@navikt/aksel-icons";

import { Button } from "@navikt/ds-react";
import cl from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { logNav } from "../..";
import styles from "./header.module.css";

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

  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  return (
    <>
      <div className="z-[1050] mr-0 grid h-full place-content-center">
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
        <ReactModal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          aria={{ modal: true }}
          overlayClassName={styles.modalOverlay}
          contentLabel="Meny"
          className="bg-surface-default shadow-xlarge absolute left-4 right-4 top-0 block rounded px-11 py-14 sm:left-auto sm:right-6 sm:w-96 sm:max-w-[90%] lg:hidden"
        >
          <nav aria-label="hovedmeny">
            <ul>
              <Button
                variant="tertiary"
                onClick={() => setOpen(false)}
                className={cl(
                  styles.akselTertiaryButton,
                  "absolute right-2 top-2"
                )}
                icon={<XMarkIcon title="lukk meny" fontSize="1.5rem" />}
              />
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
        </ReactModal>
      </div>
    </>
  );
};
