/* eslint-disable */
import { useDebounce } from "@/utils";
import { Search as SearchIcon } from "@navikt/ds-icons";
import { BodyShort, Heading, Label, Search } from "@navikt/ds-react";
import algoliasearch from "algoliasearch/lite";
import cl from "classnames";
import React, { useEffect, useState } from "react";
import {
  Configure,
  InstantSearch,
  useHits,
  useSearchBox,
} from "react-instantsearch-hooks-web";
import Modal from "react-modal";

const searchClient = algoliasearch(
  "J64I2SIG7K",
  "92d2ac76eba4eba628a34baa11743fc1"
);

const SearchBox = () => {
  const { query, refine, clear } = useSearchBox();
  const [value, setValue] = useState(query);
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    /* debouncedValue && */ refine(debouncedValue);
    /* !debouncedValue && clear(); */
  }, [debouncedValue]);

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <div className="mx-auto max-w-lg" data-theme="dark">
      <Search
        label="Søk i alle aksel-sider"
        variant="simple"
        value={value}
        onChange={(e) => setValue(e)}
        onClear={() => clear()}
      />
    </div>
  );
};

const Hit = ({ hit }: { hit: any }) => {
  const Tema = () => (
    <div>
      <Label>Tema</Label>
      {hit?.tema?.map?.((x) => (
        <BodyShort key={x}>{x}</BodyShort>
      ))}
    </div>
  );

  const type = () => {
    const types = {
      aksel_artikkel: "Aksel artikkel",
      aksel_prinsipp: "Aksel prinsipp",
      aksel_blogg: "Aksel blogg",
      ds_artikkel: "Designsystem artikkel",
      komponent_artikkel: "Komponent",
    };
    return types[hit._type];
  };

  return (
    <div className="py-4">
      <a
        href={`/${hit.url}`}
        className="group hover:underline  focus:no-underline focus:outline-none"
      >
        <Heading level="2" size="small">
          {hit.heading}
        </Heading>
      </a>
      <div className="flex gap-2">
        {/* <BodyShort>{type()}</BodyShort> */}
        {/* {hit.tema && <Tema />} */}
      </div>
    </div>
  );
};

const Hits = () => {
  const { hits, results, ...rest } = useHits();

  const [showedResults, setShowedResults] = useState<number>(20);

  /* console.log({ hits, results, rest: rest }); */

  if (
    /* !results?.query || results?.query === "" */ results.query === undefined
  ) {
    return (
      <div className="mx-auto w-full max-w-lg text-white sm:w-[90%]">
        <ul className="text-text-inverted mt-10 divide-y divide-gray-300 text-3xl md:mt-24">
          <li>
            <a className="inline-block py-3" href="/topic">
              Tema
            </a>
          </li>
          <li>
            <a className="inline-block py-3" href="#">
              Prinsipper
            </a>
          </li>
          <li>
            <a className="inline-block py-3" href="#">
              Blogg
            </a>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl divide-y divide-gray-300/60 py-10 text-white sm:w-[90%] md:py-24">
      <Heading level="2" size="large">
        Søketreff: {hits.length}
      </Heading>
      <ul className="text-text-inverted mt-3 divide-y divide-gray-300/30  overflow-auto text-3xl ">
        {hits.map((x, i) => (
          <Hit key={i} hit={x} />
        ))}
      </ul>
    </div>
  );
};

const SearchNew = ({
  variant = "ds",
}: {
  variant?: "ds" | "aksel-inverted" | "aksel";
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  useEffect(() => {
    open
      ? document.body?.parentElement?.classList.add(
          ...["overflow-hidden", "search-open"]
        )
      : document.body?.parentElement?.removeAttribute("class");
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((x) => !x)}
        className={cl(
          "w-header z-[1050] ml-auto flex shrink-0 items-center justify-center focus:outline-none",
          {
            " text-text-inverted focus:shadow-focus-inverted-inset hover:bg-gray-100/10":
              variant === "aksel-inverted",
            "focus:shadow-focus-inset hover:bg-gray-800/10":
              variant === "aksel",
            "text-text-inverted hover:bg-gray-800 focus:shadow-[inset_0_0_0_1px_var(--navds-global-color-gray-900),inset_0_0_0_3px_var(--navds-global-color-blue-200)]":
              variant === "ds",
          }
        )}
      >
        <span className="navds-sr-only">Åpne søk</span>
        <SearchIcon className="ml-[3px] h-6 w-6" aria-hidden />
      </button>
      <Modal
        isOpen={open}
        className={cl(
          "relative min-h-full w-full px-4 backdrop-blur focus:outline-none",
          {
            "bg-gray-900": variant === "ds",
            "bg-deepblue-900": variant !== "ds",
          }
        )}
        overlayClassName="z-[9999] inset-0 fixed top-14 overflow-auto"
        onRequestClose={() => setOpen(false)}
        contentLabel="Søk"
      >
        <InstantSearch
          searchClient={searchClient}
          indexName="aksel_search"
          /* searchFunction={(h) => {
            h.state.query && h.search();
            console.log(h);
          }} */
        >
          <div className="mx-auto w-full max-w-2xl pt-32 text-white sm:w-[90%]">
            <Configure typoTolerance={true} distinct={true} hitsPerPage={200} />
            <SearchBox />
            <Hits />
          </div>
        </InstantSearch>
      </Modal>
    </>
  );
};

export default SearchNew;
