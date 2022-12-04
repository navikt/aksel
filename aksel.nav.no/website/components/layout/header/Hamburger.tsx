import { Close, Hamburger as HamburgerIcon } from "@navikt/ds-icons";
/* import { Popover } from "@navikt/ds-react"; */
import cl from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { logNav /* Search */ } from "../..";

const LinkElement = ({ name, href }) => {
  const { asPath } = useRouter();
  return (
    <li className="flex h-11 items-center">
      <Link href={href} passHref>
        <a
          className={cl(
            "flex h-full w-full items-center rounded px-2 focus:outline-none",
            {
              "bg-surface-action-selected text-text-on-action hover:bg-surface-action-selected-hover focus:shadow-focus-gap-inset":
                asPath.startsWith(href),
              "hover:bg-surface-action-subtle-hover focus-visible:shadow-focus-inset":
                !asPath.startsWith(href),
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
  const [buttonRef, setButtonRef] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  return (
    <>
      <div className={cl("z-[1050] mr-0 flex h-full justify-center")}>
        <button
          ref={setButtonRef}
          aria-haspopup="false"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className={cl(
            "min-w-header grid place-items-center rounded focus:outline-none",
            {
              /* "focus-visible:shadow-focus-gap hover:bg-surface-action-selected-hover bg-surface-action-selected text-text-on-action":
                open, */
              "focus-visible:shadow-focus hover:bg-surface-action-subtle-hover":
                !open,
            }
          )}
        >
          {/* {open ? (
            <Close
              className="pointer-events-none text-2xl"
              aria-label="Lukk meny"
            />
          ) : (
            <HamburgerIcon
              className="pointer-events-none text-2xl"
              aria-label="Åpne meny"
            />
          )} */}
          <HamburgerIcon
            className="pointer-events-none text-2xl"
            aria-label="Åpne meny"
          />
        </button>
        <ReactModal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          aria={{ modal: true }}
          overlayClassName="header-modal__overlay"
          contentLabel="Meny"
          className="bg-surface-default max-w-screen-xs relative inset-0 block w-[90%] rounded p-6 md:hidden"
        >
          <nav aria-label="meny">
            <ul>
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-surface-action-subtle-hover focus-visible:shadow-focus-inset mb-4 flex h-11 w-full items-center justify-center rounded px-2 focus:outline-none"
              >
                <span className="flex shrink-0 items-center justify-center gap-1">
                  Lukk meny <Close aria-hidden />
                </span>
              </button>
              <LinkElement name="God praksis" href="/god-praksis" />
              <LinkElement name="Grunnleggende" href="/grunnleggende" />
              <LinkElement name="Komponenter" href="/komponenter" />
              <LinkElement name="Blogg" href="/produktbloggen" />
            </ul>
          </nav>
        </ReactModal>
        {/* <Popover
          onClose={() => setOpen(false)}
          anchorEl={buttonRef}
          open={open}
          arrow={false}
          placement="bottom-start"
          offset={6}
          className="animate-fadeIn bg-surface-default ring-border-subtle shadow-large z-[1100] w-80 max-w-full rounded border-none ring-1"
        >
          <nav aria-label="meny">
            <ul>
              <LinkElement name="God praksis" href="/god-praksis" />
              <LinkElement name="Grunnleggende" href="/grunnleggende" />
              <LinkElement name="Komponenter" href="/komponenter" />
              <LinkElement name="Blogg" href="/produktbloggen" />
            </ul>
          </nav>
        </Popover> */}
      </div>
    </>
  );
};
