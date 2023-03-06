import { Button, Heading, Tooltip } from "@navikt/ds-react";
import Link from "next/link";
import meta from "@navikt/aksel-icons/metadata";
import ReactDOMServer from "react-dom/server";
import * as Icons from "@navikt/aksel-icons";
import { CopyIcon } from "@sanity/icons";
import Highlight, { defaultProps } from "prism-react-renderer";
import copy from "copy-to-clipboard";
import { useEffect, useMemo, useRef, useState } from "react";
import { Close } from "@navikt/ds-icons";

export const IconSidebar = ({ name }: { name: string }) => {
  const SelectedIcon = Icons[`${name}Icon`];
  const [resentCopy, setResentCopy] = useState<"svg" | "react" | "import">();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const currentIcon = useMemo(
    () => Object.values(meta).find((x) => x.name === name),
    [name]
  );

  const handleCopy = (copyStr: string, src: "svg" | "react" | "import") => {
    copy(copyStr);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setResentCopy(src);
    timeoutRef.current = setTimeout(() => {
      setResentCopy(undefined);
    }, 2000);
  };

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="animate-fadeIn min-h-96 h-fit w-full basis-1/3 px-6 py-8 lg:sticky lg:top-0">
      <div className="text-5xl">
        <SelectedIcon aria-hidden />
      </div>
      <Heading level="2" size="medium" className="mt-3">
        {name}
      </Heading>
      <p className="mt-1">{currentIcon.category}</p>
      <p className="">
        <span aria-hidden>└ </span>
        {`${currentIcon.sub_category}`}
      </p>
      <Link
        href="/ikoner"
        scroll={false}
        prefetch={false}
        className="min-h-11 hover:bg-surface-hover focus-visible:shadow-focus aactive:bg-surface-neutral-subtle-hover absolute top-2 right-2 grid aspect-square place-content-center rounded text-xl focus:outline-none"
      >
        <Close title="lukk ikonvisning" />
      </Link>
      <Button variant="secondary-neutral" className="mt-8 w-full">
        Last ned
      </Button>
      <div data-prism-theme="light">
        <Heading level="3" size="small" className="mt-6 mb-2">
          Kode
        </Heading>
        <div className="ring-border-subtle rounded-lg ring-1">
          <div className="border-b-border-subtle flex items-center justify-between border-b px-3 py-1 text-sm">
            <span>Import</span>
            <Tooltip
              open={resentCopy === "import" || undefined}
              content={resentCopy === "import" ? "Kopiert!" : "Kopier"}
            >
              <button
                onClick={() =>
                  handleCopy(
                    `import {
  ${name}
} from '@navikt/aksel-icons';`,
                    "import"
                  )
                }
                className="hover:bg-surface-hover grid aspect-square w-8 place-content-center rounded text-xl"
              >
                <CopyIcon aria-hidden />
              </button>
            </Tooltip>
          </div>
          <Highlight
            code={`import {
  ${name}
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
          <div className="border-b-border-subtle flex items-center justify-between border-b px-3 py-1 text-sm">
            <span>React</span>
            <Tooltip
              content={resentCopy === "react" ? "Kopiert!" : "Kopier"}
              open={resentCopy === "react" || undefined}
            >
              <button
                onClick={() =>
                  handleCopy(`<${name} title="a11y-title" />`, "react")
                }
                className="hover:bg-surface-hover grid aspect-square w-8 place-content-center rounded text-xl"
              >
                <CopyIcon aria-hidden />
              </button>
            </Tooltip>
          </div>
          <Highlight
            code={`<${name} title="a11y-title" />`}
            language="tsx"
            {...defaultProps}
            theme={undefined}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="relative m-0 max-w-[80vw]  overflow-x-auto overflow-y-auto rounded-b-lg p-3 font-mono lg:max-w-[16rem]">
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
          <div className="border-b-border-subtle flex items-center justify-between border-b px-3 py-1 text-sm">
            <span>SVG</span>
            <Tooltip
              content={resentCopy === "svg" ? "Kopiert!" : "Kopier"}
              open={resentCopy === "svg" || undefined}
            >
              <button
                onClick={() =>
                  handleCopy(
                    ReactDOMServer.renderToString(<SelectedIcon />),
                    "svg"
                  )
                }
                className="hover:bg-surface-hover grid aspect-square w-8 place-content-center rounded text-xl"
              >
                <CopyIcon aria-hidden />
              </button>
            </Tooltip>
          </div>
          <Highlight
            code={ReactDOMServer.renderToString(<SelectedIcon />)}
            language="tsx"
            {...defaultProps}
            theme={undefined}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="w-text relative m-0 max-w-[80vw] overflow-x-auto overflow-y-auto rounded-b-lg p-3 font-mono lg:w-auto lg:max-w-[16rem]">
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
      </div>
    </div>
  );
};
