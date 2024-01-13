import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button, Modal } from "@navikt/ds-react";
import { useContext } from "react";
import { SearchContext, SearchNavigationContext } from "../providers";
import { Error } from "./Error";
import { SearchForm } from "./Form";
import { Results } from "./Results";

export const Search = () => {
  const { open, setOpen } = useContext(SearchContext);
  const { close } = useContext(SearchNavigationContext);

  return (
    <>
      <Button
        variant="primary"
        className="h-11 bg-deepblue-600 hover:bg-deepblue-700"
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
      <Modal
        open={open}
        onClose={close}
        aria-label="Søk"
        className="h-[90%] max-h-[52rem] "
        width="medium"
        closeOnBackdropClick
      >
        <Error />
        <SearchForm />
        <Results />
      </Modal>
    </>
  );
};
