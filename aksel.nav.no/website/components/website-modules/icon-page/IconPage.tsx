import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import { Heading, Search, ToggleGroup } from "@navikt/ds-react";
import cl from "classnames";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { AkselCubeStatic } from "components/website-modules/cube";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IconSidebar } from "./IconSidebar";
import { TitleLinks } from "./TitleLinks";
import ReactModal from "react-modal";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { useMedia } from "@/utils";
import { categorizeIcons, getFillIcon } from "./icon-utils";
import Fuse from "fuse.js";

const fuseStroke = new Fuse(
  Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke"),
  {
    threshold: 0.2,
    keys: [
      { name: "name", weight: 3 },
      { name: "category", weight: 2 },
      { name: "sub_category", weight: 2 },
      { name: "keywords", weight: 3 },
      { name: "variant", weight: 1 },
    ],
    shouldSort: false,
  }
);

const fuseFill = new Fuse(getFillIcon(Object.values(meta)), {
  threshold: 0.2,
  keys: [
    { name: "name", weight: 3 },
    { name: "category", weight: 2 },
    { name: "sub_category", weight: 2 },
    { name: "keywords", weight: 3 },
    { name: "variant", weight: 1 },
  ],
  shouldSort: false,
});

export const IconPage = ({ name }: { name: string }) => {
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState<"stroke" | "fill">("stroke");

  const [strokeIcons] = useState(
    Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke")
  );
  const [fillIcons] = useState(getFillIcon(Object.values(meta)));

  const hideModal = useMedia("screen and (min-width: 1024px)");

  const categories = useMemo(() => {
    if (toggle === "fill") {
      return categorizeIcons(
        query
          ? fuseFill.search(query).map((result) => result.item as any)
          : fillIcons
      );
    }
    return categorizeIcons(
      query
        ? fuseStroke.search(query).map((result) => result.item as any)
        : strokeIcons
    );
  }, [toggle, query, strokeIcons, fillIcons]);

  const router = useRouter();

  useEffect(() => {
    hideModal && ReactModal.setAppElement("#__next");
  }, [hideModal]);

  return (
    <div className="bg-surface-subtle relative overflow-clip">
      <Header variant="transparent" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className=" min-h-[80vh] focus:outline-none"
      >
        <div className="centered-layout mb-40 grid max-w-screen-lg pt-20">
          <div className="mx-auto w-full max-w-screen-md">
            <h1 className="from-deepblue-800 via-deepblue-400 my-0 w-fit bg-gradient-to-tr to-violet-500 bg-clip-text text-7xl font-bold text-transparent">
              Aksel icons
            </h1>
            <p className="override-text-no-max mt-6 text-2xl">
              En samling open-source ikoner designet og utviklet for NAV
            </p>
            <AkselCubeStatic className="text-violet-400 opacity-5" />
          </div>
          <div className="z-10 mt-16 mb-8 rounded-2xl bg-gradient-to-br from-violet-300/30 to-teal-400/30 p-[2px]">
            <div className="bg-surface-default shadow-medium h-full w-full rounded-[15px]">
              <div className="border-b-border-subtle grid items-center border-b">
                <TitleLinks />
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="grid w-full grid-cols-2 items-center gap-4 py-2 px-4"
                  role="search"
                >
                  <div className="flex items-center gap-2">
                    <Search
                      variant="simple"
                      label="Ikonsøk"
                      className="max-w-md border-none"
                      placeholder="Søk etter ikon..."
                      onChange={setQuery}
                      value={query}
                    />
                  </div>
                  <div className="justify-self-end">
                    <ToggleGroup
                      size="small"
                      value={toggle}
                      variant="neutral"
                      onChange={(v) => setToggle(v as any)}
                      className="w-full"
                    >
                      <ToggleGroup.Item value="stroke">Stroke</ToggleGroup.Item>
                      <ToggleGroup.Item value="fill">Fill</ToggleGroup.Item>
                    </ToggleGroup>
                  </div>
                </form>
              </div>
              <div className="flex">
                <div
                  className={cl(
                    "animate-fadeIn transition-width grid w-full gap-9 gap-y-12 px-6 py-8",
                    {
                      "border-r-border-subtle border-r": !!name,
                      "basis-2/3": name,
                    }
                  )}
                >
                  {categories.map((cat) => {
                    return (
                      <div key={cat.category}>
                        <Heading
                          level="2"
                          size="small"
                          className="text-text-default"
                          spacing
                        >
                          {cat.category}
                        </Heading>
                        <div className="grid w-full gap-2">
                          {cat.sub_categories.map((sub) => {
                            return (
                              <div key={sub.sub_category}>
                                <Heading
                                  level="3"
                                  size="xsmall"
                                  className="text-text-subtle mb-1"
                                >
                                  {sub.sub_category}
                                </Heading>
                                <div className="gap-05 flex flex-wrap">
                                  {sub.icons.map((i) => {
                                    const T = Icons[`${i.id}Icon`];
                                    if (T === undefined) {
                                      return null;
                                    }
                                    return (
                                      <Link
                                        href={`/ikoner/${i.id}`}
                                        scroll={false}
                                        prefetch={false}
                                        key={i.id}
                                        className={cl(
                                          "hover:bg-surface-hover bg-surface-default active:bg-surface-neutral-subtle-hover group relative grid aspect-square w-11 shrink-0 place-items-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800",
                                          {
                                            "bg-surface-selected ring-border-alt-3 z-10 ring-1":
                                              i.id === name,
                                          }
                                        )}
                                      >
                                        <T className="text-2xl" aria-hidden />
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {name && hideModal && <IconSidebar name={name} />}

                {!hideModal && (
                  <ReactModal
                    isOpen={!!name}
                    onRequestClose={() =>
                      router.push("/ikoner", undefined, { shallow: true })
                    }
                    aria={{ modal: true }}
                    overlayClassName={styles.ModalOverlay}
                    contentLabel={`${name} ikon`}
                    className="bg-surface-default focus-visible:shadow-focus z-modal absolute block h-full overflow-y-auto rounded py-6 px-6 focus:outline-none"
                  >
                    {name && <IconSidebar name={name} />}
                  </ReactModal>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
