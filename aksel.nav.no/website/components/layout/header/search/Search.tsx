import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import cl from "clsx";
import { useContext, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "../header.module.css";
import { Error } from "./Error";
import { SearchForm } from "./Form";
import { Results } from "./Results";
import { SearchContext, SearchNavigationContext } from "./providers";

export const Search = () => {
  const { open, setOpen } = useContext(SearchContext);
  const { close } = useContext(SearchNavigationContext);

  useEffect(() => {
    ReactModal.setAppElement("#__next");
  }, []);

  return (
    <>
      <Button
        variant="primary"
        className="hover:bg-deepblue-700 bg-deepblue-600 h-11"
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
        className="bg-surface-default focus:shadow-focus animate-searchModal absolute inset-0 mx-auto my-auto flex h-[90%] max-h-[42rem] w-full max-w-[90%] flex-col overflow-x-hidden rounded-lg shadow-xl focus:outline-none md:h-[80%] lg:max-w-4xl"
        overlayClassName={cl(styles.modalOverlaySearch, "backdrop-blur-[2px]")}
        htmlOpenClassName="overflow-hidden"
      >
        <Error />
        <SearchForm />
        <Results />
      </ReactModal>
    </>
  );
};
