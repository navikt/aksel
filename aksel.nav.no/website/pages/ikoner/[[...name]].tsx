import { Heading, Search, Tooltip, Link as DsLink } from "@navikt/ds-react";
import Link from "next/link";
import NextLink from "next/link";
import { GetStaticPaths, GetStaticProps } from "next/types";
import meta from "@navikt/ds-icons/meta.json";
import cl from "classnames";
import ReactDOMServer from "react-dom/server";

import * as Icons from "@navikt/ds-icons";

import { useState } from "react";
import metadata from "@navikt/aksel-icons/metadata";
import { Header } from "components/layout/header/Header";
import { AkselCubeStatic } from "components/website-modules/cube";
import Footer from "components/layout/footer/Footer";
import { CopyIcon, DownloadIcon, PackageIcon, SearchIcon } from "@sanity/icons";
import Highlight, { defaultProps } from "prism-react-renderer";
import { FigmaIcon, GithubIcon } from "components/assets";

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
            <h1 className="from-deepblue-800 via-deepblue-400 my-0 w-fit bg-gradient-to-tr to-violet-500 bg-clip-text text-7xl font-bold text-transparent">
              Aksel icons
            </h1>
            <p className="override-text-no-max mt-6 text-2xl">
              En samling open-source ikoner designet og utviklet for NAV
            </p>
            {/* <AkselCubeStatic className="text-deepblue-300 opacity-5 " /> */}
            {/* <div className="shadow-xsmall my-8  rounded bg-teal-50 px-4 py-4">
              <ul className="flex  gap-3">
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
            </div> */}
          </div>
          <div className="z-10 mt-16 mb-8 rounded-2xl bg-gradient-to-br from-violet-300/30 to-teal-400/30 p-[2px]">
            <div className="bg-surface-default shadow-medium  h-full w-full rounded-[14px]">
              <div className="border-b-border-subtle grid items-center border-b">
                <div className="flex w-full items-center gap-3 px-4 pt-6 pb-2">
                  <ul className="flex w-full flex-wrap justify-evenly gap-3">
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
                    <SearchIcon aria-hidden className="text-3xl" />
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
                    "animate-fadeIn transition-width grid  w-full gap-9 gap-y-12 px-6 py-8",
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
                                <a className="hover:bg-surface-hover group relative grid aspect-square w-11 shrink-0 place-items-center rounded transition-colors focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-800 active:bg-teal-200">
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
                    <ul className="mt-3 flex flex-wrap gap-3 text-sm">
                      <li className="rounded-sm bg-violet-50 px-2 ring-1 ring-violet-300">
                        Tag1
                      </li>
                      <li className="rounded-sm bg-violet-50 px-2 ring-1 ring-violet-300">
                        Tag2
                      </li>
                      <li className="rounded-sm bg-violet-50 px-2 ring-1 ring-violet-300">
                        Tag3
                      </li>
                      <li className="rounded-sm bg-violet-50 px-2 ring-1 ring-violet-300">
                        Tag4
                      </li>
                    </ul>
                    <Link
                      href="/ikoner"
                      passHref
                      scroll={false}
                      prefetch={false}
                    >
                      <a className="min-h-11 hover:bg-surface-hover absolute top-2 right-2 grid aspect-square place-content-center rounded text-xl">
                        <Icons.Close title="lukk ikonvisning" />
                      </a>
                    </Link>
                    <button className="ring-border-subtle bg-deepblue-500 text-text-on-action mt-8 w-full rounded px-3 py-2 ring-1">
                      Last ned
                    </button>
                    <div>
                      <Heading level="3" size="small" className="mt-8 mb-4">
                        Kode
                      </Heading>
                      <div className="ring-border-subtle rounded-lg ring-1">
                        <div className="border-b-border-subtle text-md flex items-center justify-between border-b px-3 py-1">
                          <span>Import</span>
                          <Tooltip content="Kopier">
                            <button className="hover:bg-surface-hover grid aspect-square w-8 place-content-center rounded">
                              <CopyIcon />
                            </button>
                          </Tooltip>
                        </div>
                        <Highlight
                          code={`import {
  ${name}
} from '@navikt/ds-icons';`}
                          language="tsx"
                          theme={undefined}
                          {...defaultProps}
                        >
                          {({ tokens, getLineProps, getTokenProps }) => (
                            <pre className="relative m-0 overflow-x-auto overflow-y-auto rounded-b-lg p-3 font-mono invert">
                              {tokens.map((line, i) => (
                                <div
                                  key={i}
                                  {...getLineProps({ line, key: i })}
                                  className="text-medium whitespace-pre break-words"
                                >
                                  {line.map((token, key) => (
                                    <span
                                      key={key}
                                      {...getTokenProps({ token, key })}
                                    />
                                  ))}
                                </div>
                              ))}
                            </pre>
                          )}
                        </Highlight>
                      </div>
                      <div className="ring-border-subtle mt-4 rounded-lg ring-1">
                        <div className="border-b-border-subtle text-md flex items-center justify-between border-b px-3 py-1">
                          <span>React</span>
                          <Tooltip content="Kopier">
                            <button className="hover:bg-surface-hover grid aspect-square w-8 place-content-center rounded">
                              <CopyIcon />
                            </button>
                          </Tooltip>
                        </div>
                        <Highlight
                          code={`<${name}
  title="a11y-title"
/>`}
                          language="tsx"
                          theme={undefined}
                          {...defaultProps}
                        >
                          {({ tokens, getLineProps, getTokenProps }) => (
                            <pre className="relative m-0 overflow-x-auto overflow-y-auto rounded-b-lg p-3 font-mono invert">
                              {tokens.map((line, i) => (
                                <div
                                  key={i}
                                  {...getLineProps({ line, key: i })}
                                  className="text-medium whitespace-pre break-words"
                                >
                                  {line.map((token, key) => (
                                    <span
                                      key={key}
                                      {...getTokenProps({ token, key })}
                                    />
                                  ))}
                                </div>
                              ))}
                            </pre>
                          )}
                        </Highlight>
                      </div>
                      <div className="ring-border-subtle mt-4 rounded-lg ring-1">
                        <div className="border-b-border-subtle text-md flex items-center justify-between border-b px-3 py-1">
                          <span>SVG</span>
                          <Tooltip content="Kopier">
                            <button className="hover:bg-surface-hover grid aspect-square w-8 place-content-center rounded">
                              <CopyIcon />
                            </button>
                          </Tooltip>
                        </div>
                        <Highlight
                          code={ReactDOMServer.renderToString(<SelectedIcon />)}
                          language="tsx"
                          theme={undefined}
                          {...defaultProps}
                        >
                          {({ tokens, getLineProps, getTokenProps }) => (
                            <pre className="relative m-0 max-w-[16rem] overflow-x-auto overflow-y-auto rounded-b-lg p-3 font-mono invert">
                              {tokens.map((line, i) => (
                                <div
                                  key={i}
                                  {...getLineProps({ line, key: i })}
                                  className="text-medium whitespace-pre break-words"
                                >
                                  {line.map((token, key) => (
                                    <span
                                      key={key}
                                      {...getTokenProps({ token, key })}
                                    />
                                  ))}
                                </div>
                              ))}
                            </pre>
                          )}
                        </Highlight>
                      </div>
                    </div>
                  </div>
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
