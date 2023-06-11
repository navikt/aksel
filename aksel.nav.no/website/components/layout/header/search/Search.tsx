import { Error } from "./Error";
import { SearchForm } from "./Form";
import { Results } from "./Results";
import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import cl from "clsx";
import { KBD } from "components/website-modules/KBD";
import { useContext, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "../header.module.css";
import { SearchContext, SearchResultContext } from "./providers";

export const Search = () => {
  const { open, setOpen } = useContext(SearchContext);
  const { close } = useContext(SearchResultContext);

  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  return (
    <div className="z-[1050] ml-auto mr-4 flex justify-center lg:ml-0 lg:mr-0">
      <Button
        variant="primary"
        className="hover:bg-deepblue-700 bg-deepblue-600 focus-visible:shadow-focus-gap h-11 focus:shadow-none"
        aria-keyshortcuts="Control+b"
        icon={
          <MagnifyingGlassIcon
            className="pointer-events-none -mt-[1px] shrink-0 text-2xl"
            aria-label="Åpne meny"
            aria-hidden
          />
        }
        iconPosition="left"
        onClick={() => setOpen(true)}
      >
        Søk
      </Button>
      <ReactModal
        isOpen={open}
        onRequestClose={close}
        aria={{ modal: true }}
        contentLabel="Søk"
        className="bg-surface-default absolute inset-0 block w-screen overflow-x-auto px-4 md:px-6"
        overlayClassName={styles.modalOverlaySearch}
      >
        <div
          className={cl(
            "relative mx-auto grid max-w-4xl grid-cols-[12rem_auto] gap-4 gap-x-8 py-24",
            styles.searchGrid
          )}
        >
          <Button
            className="group absolute right-4 top-8"
            variant="tertiary-neutral"
            icon={<KBD>ESC</KBD>}
            onClick={close}
            iconPosition="right"
          >
            Lukk søk
          </Button>

          <Error />
          <SearchForm />
          <Results />
        </div>
      </ReactModal>
    </div>
  );
};
