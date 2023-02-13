import { Heading, Search, Tooltip } from "@navikt/ds-react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next/types";
import meta from "@navikt/ds-icons/meta.json";
import cl from "classnames";

import * as Icons from "@navikt/ds-icons";

import { useState } from "react";
import metadata from "@navikt/aksel-icons/metadata";
import { Header } from "components/layout/header/Header";
import { AkselCubeStatic } from "components/website-modules/cube";
import Footer from "components/layout/footer/Footer";
import { SearchIcon } from "@sanity/icons";

const categorizeIcons = (icons) => {
  const categories = [];

  for (const icon of icons) {
    const i = categories.findIndex(
      ({ category }) => icon.pageName === category
    );
    i !== -1
      ? categories[i].icons.push(icon)
      : categories.push({ category: icon.pageName, icons: [icon] });
  }
  return categories.sort((a, b) => a.category.localeCompare(b.category));
};

const Page = ({ name }: { name: string }) => {
  const [query, setQuery] = useState("");

  const [visibleIcons] = useState<any>(meta);

  const categories = categorizeIcons(
    visibleIcons.filter((x) => {
      return query === ""
        ? true
        : x?.name.toLowerCase().includes(query) ||
            x?.pageName.toLowerCase().includes(query) ||
            x?.description.toLowerCase().includes(query);
    })
  );

  const SelectedIcon = name && Icons[name];

  return (
    <div className="bg-surface-subtle relative">
      <Header variant="transparent" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className=" min-h-[80vh] focus:outline-none"
      >
        <div className="centered-layout mb-40 grid  max-w-screen-lg pt-20">
          <div className="mx-auto w-full max-w-screen-md">
            <h1 className="text-deepblue-800 my-0 text-7xl font-bold">
              Aksel icons
            </h1>
            <p className="override-text-no-max mt-8 text-2xl">
              En samling open-source ikoner designet og utviklet for NAV
            </p>
            {/* <AkselCubeStatic className="text-deepblue-300 opacity-5 " /> */}
          </div>
          <div className="bg-surface-default z-10 mt-16 mb-8  w-full rounded-2xl shadow-md">
            <div className="border-b-border-subtle flex items-center justify-between border-b">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full py-2 px-4"
              >
                <div className="flex items-center gap-2">
                  <SearchIcon aria-hidden className="text-xl" />
                  <input
                    type="search"
                    role="searchbox"
                    className="focus-visible:ring-deepblue-800 h-full w-full max-w-md rounded py-3 px-2 focus:outline-none focus-visible:ring-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Søk"
                  />
                </div>
              </form>
            </div>
            <div className="flex ">
              <div
                className={cl(
                  "animate-fadeIn grid w-full basis-2/3 gap-9 gap-y-12 px-6 py-8 transition-all",
                  { "border-r-border-subtle border-r": !!name }
                )}
              >
                {categories.map((cat) => {
                  return (
                    <div key={cat.category}>
                      <Heading
                        level="2"
                        size="xsmall"
                        className="text-text-subtle"
                        spacing
                      >
                        {cat.category}
                      </Heading>
                      <div className="flex flex-wrap gap-2">
                        {cat.icons.map((i) => {
                          const T = Icons[i.name];
                          return (
                            <Tooltip
                              key={i.created_at}
                              content={i.name}
                              delay={0}
                              className="animate-none"
                              arrow={false}
                            >
                              <Link href={`/ikoner/${i.name}`} passHref>
                                <a className="group relative grid aspect-square w-11 shrink-0 place-items-center rounded hover:bg-teal-100 focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-800 active:bg-teal-200">
                                  <T className="text-2xl" aria-hidden />
                                </a>
                              </Link>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {name && (
                <div className="animate-fadeIn min-h-96 sticky top-0 h-fit w-full basis-1/3 px-6 py-8">
                  <div className="text-4xl">
                    <SelectedIcon aria-hidden />
                  </div>
                  <Heading level="2" size="medium" className="mt-6">
                    {name}
                  </Heading>
                  <p className="mt-4">
                    Brukt for å indikere xyz og passer best på interaktive
                    elementer
                  </p>
                  <p className="mt-6">Kategorinavn</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    <li>Tag1</li>
                    <li>Tag2</li>
                    <li>Tag3</li>
                    <li>Tag4</li>
                  </ul>
                  <Link href="/ikoner" passHref>
                    <a className="min-h-11 hover:bg-surface-hover absolute top-2 right-2 grid aspect-square place-content-center rounded text-xl">
                      <Icons.Close title="lukk ikonvisning" />
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      /* { params: { name: [] } },
      ...Object.keys(metadata).map((x) => ({
        params: { name: [x] },
      })), */
      { params: { name: [] } },
      ...meta.map((x) => ({
        params: { name: [x.name] },
      })),
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { name } }) => {
  return {
    props: {
      name: name ? (typeof name === "string" ? name : name.join("")) : "",
    },
  };
};
