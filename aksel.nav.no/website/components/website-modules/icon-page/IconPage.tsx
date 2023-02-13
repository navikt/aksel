import { Heading, Link as DsLink, Search } from "@navikt/ds-react";
import Link from "next/link";
import NextLink from "next/link";
import meta from "@navikt/ds-icons/meta.json";
import cl from "classnames";
import * as Icons from "@navikt/ds-icons";
import { useMemo, useState } from "react";
import { Header } from "components/layout/header/Header";
import { AkselCubeStatic } from "components/website-modules/cube";
import Footer from "components/layout/footer/Footer";
import { DownloadIcon, PackageIcon } from "@sanity/icons";
import { FigmaIcon, GithubIcon } from "components/assets";
import { IconSidebar } from "./IconSidebar";

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

export const IconPage = ({ name }: { name: string }) => {
  const [query, setQuery] = useState("");

  const [visibleIcons] = useState<any>(meta);

  const categories = useMemo(
    () =>
      categorizeIcons(
        visibleIcons.filter((x) => {
          return query === ""
            ? true
            : x?.name.toLowerCase().includes(query) ||
                x?.pageName.toLowerCase().includes(query) ||
                x?.description.toLowerCase().includes(query);
        })
      ),
    [visibleIcons, query]
  );

  return (
    <div className="bg-surface-subtle relative overflow-clip">
      <Header variant="transparent" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className=" min-h-[80vh] focus:outline-none"
      >
        <div className="centered-layout mb-40 grid  max-w-screen-lg pt-20">
          <div className="mx-auto w-full max-w-screen-md">
            <h1 className="from-deepblue-800 via-deepblue-400 my-0 w-fit bg-gradient-to-tr to-violet-500 bg-clip-text text-7xl font-bold text-transparent">
              Aksel icons
            </h1>
            <p className="override-text-no-max mt-6 text-2xl">
              En samling open-source ikoner designet og utviklet for NAV
            </p>
            <AkselCubeStatic className="text-violet-400 opacity-5 " />
          </div>
          <div className="z-10 mt-16 mb-8 rounded-2xl bg-gradient-to-br from-violet-300/30 to-teal-400/30 p-[2px]">
            <div className="bg-surface-default shadow-medium  h-full w-full rounded-[14px]">
              <div className="border-b-border-subtle grid items-center border-b">
                <div className="flex w-full items-center gap-3 px-8 pt-6 pb-2">
                  <ul className="flex w-full flex-wrap justify-between gap-3">
                    <li className="flex items-center gap-2">
                      <NextLink
                        href="https://www.figma.com/community/file/1167474127194981809"
                        passHref
                      >
                        <DsLink className="text-text-default no-underline hover:underline">
                          <FigmaIcon />{" "}
                          <span className="ml-1">Figma community</span>
                        </DsLink>
                      </NextLink>
                    </li>
                    <li className="flex items-center gap-2">
                      <DownloadIcon className="text-2xl" /> Last ned SVG-pakke
                    </li>
                    <li className="flex items-center gap-2">
                      <NextLink
                        href="https://www.npmjs.com/package/@navikt/ds-icons"
                        passHref
                      >
                        <DsLink className="text-text-default no-underline hover:underline">
                          <PackageIcon className="text-2xl" /> Installer med NPM
                        </DsLink>
                      </NextLink>
                    </li>
                    <li className="flex items-center gap-2">
                      <NextLink
                        href="https://github.com/navikt/Designsystemet/tree/master/%40navikt/icons"
                        passHref
                      >
                        <DsLink className="text-text-default no-underline hover:underline">
                          <GithubIcon /> Github
                        </DsLink>
                      </NextLink>
                    </li>
                  </ul>
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="w-full py-2 px-4"
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
                </form>
              </div>
              <div className="flex">
                <div
                  className={cl(
                    "animate-fadeIn transition-width grid w-full place-content-start gap-9 gap-y-12 px-6 py-8",
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
                              <Link
                                href={`/ikoner/${i.name}`}
                                passHref
                                scroll={false}
                                prefetch={false}
                                key={i.name}
                              >
                                <a
                                  href="#"
                                  className={cl(
                                    "hover:bg-surface-hover group relative grid aspect-square w-11 shrink-0 place-items-center rounded transition-colors focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-800 active:bg-teal-200",
                                    { "bg-surface-selected": i.name === name }
                                  )}
                                >
                                  <T className="text-2xl" aria-hidden />
                                </a>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {name && <IconSidebar name={name} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
