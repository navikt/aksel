import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useContext, useEffect } from "react";
import ReactModal from "react-modal";
import styles from "../header.module.css";
import { Error } from "./Error";
import { SearchForm } from "./Form";
import { Results } from "./Results";
import { SearchContext, SearchResultContext } from "./providers";
import cl from "clsx";

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
        className="bg-surface-default absolute inset-0 mx-auto my-auto  flex h-[90%] max-h-[42rem] w-full max-w-[90%] flex-col overflow-x-hidden rounded-lg shadow-xl md:h-[70%] lg:max-w-3xl"
        overlayClassName={cl(styles.modalOverlaySearch, "backdrop-blur-[2px]")}
      >
        <Error />
        <SearchForm />
        <Results />
      </ReactModal>
    </div>
  );
};
