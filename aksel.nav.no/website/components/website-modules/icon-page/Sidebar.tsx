import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import { Button, CopyButton, Heading, Tooltip } from "@navikt/ds-react";
import { SuggestionBlock } from "components/website-modules/suggestionblock";
import {
  AmplitudeEvents,
  logAmplitudeEvent,
} from "components/website-modules/utils/amplitude";
import Link from "next/link";
import { useRouter } from "next/router";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

export const IconSidebar = ({
  name,
  focusRef,
}: {
  name: string;
  focusRef: any;
}) => {
  const SelectedIcon = Icons[`${name}Icon`];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [blob, setBlob]: any = useState();
  const router = useRouter();

  const currentIcon = useMemo(
    () => Object.values(meta).find((x) => x.name === name),
    [name]
  );

  useEffect(() => {
    if (!name) return;
    getBlob(name);
  }, [name]);

  async function getBlob(icon: string) {
    const iconUrl = `https://raw.githubusercontent.com/navikt/aksel/main/%40navikt/aksel-icons/icons/${icon}.svg`;
    fetch(iconUrl)
      .then((r) => {
        return r.text();
      })
      .then((r) => {
        setBlob(new Blob([r], { type: "image/svg+xml" }));
      });
  }

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.focus({ preventScroll: true });
    }
  }, [name]);

  const logDownload = (icon, format) => {
    logAmplitudeEvent(AmplitudeEvents.ikonnedlastning, {
      icon,
      format,
    });
  };

  const escape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        router.push("/ikoner", undefined, { shallow: true });
        focusRef?.current?.focus?.();
      }
    },
    [focusRef, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", escape, false);

    return () => {
      window.removeEventListener("keydown", escape, false);
    };
  }, [escape]);

  return (
    <section
      ref={wrapperRef}
      className="animate-fadeIn min-h-96 h-fit w-full basis-1/3 py-8 focus:outline-none sm:px-6 lg:sticky lg:top-16"
      tabIndex={-1}
      aria-labelledby="icon-details"
    >
      <Link
        href="/ikoner"
        scroll={false}
        prefetch={false}
        className="min-h-11 hover:bg-surface-hover focus-visible:shadow-focus active:bg-surface-neutral-subtle-hover absolute right-2 top-2 grid aspect-square place-content-center rounded text-xl focus:outline-none"
        onClick={() => {
          focusRef?.current?.focus?.();
        }}
      >
        <Icons.XMarkIcon fontSize="1.5rem" title="lukk ikondetaljer" />
      </Link>

      <div className="text-5xl">
        <SelectedIcon aria-hidden />
      </div>
      <Heading
        level="2"
        size="medium"
        className="mt-3 scroll-m-20"
        id="icon-details"
      >
        {`${name}Icon`}
      </Heading>
      <div>
        <span className="navds-sr-only">kategorier</span>
        <p className="mt-1">{currentIcon.category}</p>
        <p>
          <span aria-hidden>└ </span>
          {`${currentIcon.sub_category}`}
        </p>
      </div>
      <Button
        variant="primary"
        className="mt-8 w-full"
        as="a"
        onClick={() => {
          logDownload(name, "svg");
        }}
        href={blob ? URL.createObjectURL(blob) : "#"}
        download={name}
      >
        Last ned
      </Button>
      <div data-prism-theme="light">
        <Heading level="3" size="small" className="mb-2 mt-6">
          Kode
        </Heading>
        <div className="ring-border-subtle rounded-lg ring-1">
          <div className="border-b-border-subtle text-medium flex items-center justify-between border-b px-3 py-1">
            <span>Import</span>
            <Tooltip content="Kopier React-import">
              <CopyButton
                size="small"
                copyText={`import {
  ${name}Icon
} from '@navikt/aksel-icons';`}
              />
            </Tooltip>
          </div>
          <Highlight
            code={`import {
  ${name}Icon
} from '@navikt/aksel-icons';`}
            language="tsx"
            {...defaultProps}
            theme={undefined}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="relative m-0 overflow-x-auto overflow-y-auto rounded-b-lg p-3 font-mono">
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className="text-medium whitespace-pre break-words"
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
        <div className="ring-border-subtle mt-3 rounded-lg ring-1">
          <div className="border-b-border-subtle text-medium flex items-center justify-between border-b px-3 py-1">
            <span>React</span>
            <Tooltip content="Kopier React-snippet">
              <CopyButton
                size="small"
                copyText={`<${name}Icon title="a11y-title" />`}
              />
            </Tooltip>
          </div>
          <Highlight
            code={`<${name}Icon title="a11y-title" fontSize="1.5rem" />`}
            language="tsx"
            {...defaultProps}
            theme={undefined}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="relative m-0 max-w-[80vw]  overflow-x-auto overflow-y-auto rounded-b-lg p-3 font-mono lg:max-w-[20rem]">
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className="text-medium whitespace-pre break-words"
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
        <div className="ring-border-subtle mt-3 rounded-lg ring-1">
          <div className="border-b-border-subtle text-medium flex items-center justify-between border-b px-3 py-1">
            <span>SVG</span>
            <Tooltip content="Kopier SVG-kode">
              <CopyButton
                size="small"
                copyText={ReactDOMServer.renderToString(<SelectedIcon />)}
              />
            </Tooltip>
          </div>
          <Highlight
            code={ReactDOMServer.renderToString(<SelectedIcon />)}
            language="tsx"
            {...defaultProps}
            theme={undefined}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="w-text relative m-0 max-w-[80vw] overflow-x-auto overflow-y-auto rounded-b-lg p-3 font-mono lg:w-auto lg:max-w-[20rem]">
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line, key: i })}
                    className="text-medium whitespace-pre break-words"
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
        <div>
          <SuggestionBlock variant="ikon" reference={name} />
        </div>
      </div>
    </section>
  );
};
