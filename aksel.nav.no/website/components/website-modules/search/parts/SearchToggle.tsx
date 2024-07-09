import { useContext } from "react";
import { Modal } from "@navikt/ds-react";
import { AkselSearchButton } from "@/web/search/parts/SearchButton";
import { SearchContext, SearchNavigationContext } from "../providers";
import { SearchForm } from "./Form";
import { Results } from "./Results";
import { Skeleton } from "./Skeleton";

export const Search = () => {
  const { open, setOpen } = useContext(SearchContext);
  const { close } = useContext(SearchNavigationContext);

  return (
    <>
      <AkselSearchButton onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={close}
        onKeyDown={(e) => {
          /* Avoids sideeffects when closing Modal */
          if (e.key === "Escape") {
            e.stopPropagation();
          }
        }}
        className="h-[90%] max-h-[52rem]"
        width="medium"
        closeOnBackdropClick
        header={{
          heading: "Søk",
          closeButton: true,
        }}
      >
        <Skeleton />
        <SearchForm />
        <Results />
      </Modal>
    </>
  );
};
