import { Close, Hamburger as HamburgerIcon } from "@navikt/ds-icons";
import { Button } from "@navikt/ds-react";
import cl from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { logNav } from "../..";

const LinkElement = ({ name, href }) => {
  const { asPath } = useRouter();
  return (
    <li className="flex h-11 items-center">
      <Link href={href} passHref>
        <a
          className={cl(
            "hover:bg-surface-action-subtle-hover focus-visible:shadow-focus-inset relative flex h-full w-full items-center rounded px-2 focus:outline-none",
            {
              "before:bg-surface-action-selected pl-4 font-semibold before:absolute before:left-0 before:h-6 before:w-1 before:rounded-full":
                asPath.startsWith(href),
              "": !asPath.startsWith(href),
            }
          )}
          onClick={(e) =>
            logNav(
              "header",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
        >
          {name}
        </a>
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
      <div className={cl("z-[1050] mr-0 flex h-full justify-center")}>
        <Button
          variant="tertiary"
          aria-haspopup="false"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="aksel-tertiary-button"
          icon={
            <HamburgerIcon
              className="pointer-events-none text-2xl"
              aria-label="Åpne meny"
            />
          }
        />
        <ReactModal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          aria={{ modal: true }}
          overlayClassName="header-modal__overlay"
          contentLabel="Meny"
          className="bg-surface-default max-w-screen-xs relative inset-0 block w-[90%] rounded py-14 px-11 md:hidden"
        >
          <nav aria-label="meny">
            <ul>
              <Button
                variant="tertiary"
                onClick={() => setOpen(false)}
                className="aksel-tertiary-button absolute top-2 right-2"
                icon={<Close title="lukk meny" className="h-5 w-5" />}
              />
              <LinkElement name="God praksis" href="/god-praksis" />
              <LinkElement name="Grunnleggende" href="/grunnleggende" />
              <LinkElement name="Komponenter" href="/komponenter" />
              <LinkElement name="Blogg" href="/produktbloggen" />
            </ul>
          </nav>
        </ReactModal>
      </div>
    </>
  );
};
