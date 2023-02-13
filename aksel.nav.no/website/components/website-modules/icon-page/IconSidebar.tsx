import { Heading, Tooltip } from "@navikt/ds-react";
import Link from "next/link";
import ReactDOMServer from "react-dom/server";
import * as Icons from "@navikt/ds-icons";
import { CopyIcon } from "@sanity/icons";
import Highlight, { defaultProps } from "prism-react-renderer";
import copy from "copy-to-clipboard";
import { useEffect, useRef, useState } from "react";

export const IconSidebar = ({ name }: { name: string }) => {
  const SelectedIcon = Icons[name];
  const [resentCopy, setResentCopy] = useState<"svg" | "react" | "import">();
  const timeoutRef = useRef<NodeJS.Timeout>();

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
    <div className="animate-fadeIn min-h-96 sticky top-0 h-fit w-full basis-1/3 px-6 py-8">
      <div className="text-4xl">
        <SelectedIcon aria-hidden />
      </div>
      <Heading level="2" size="medium" className="mt-3">
        {name}
      </Heading>
      <p className="mt-4">
        Brukt for å indikere xyz og passer best på interaktive elementer
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
      <Link href="/ikoner" passHref scroll={false} prefetch={false}>
        <a className="min-h-11 hover:bg-surface-hover absolute top-2 right-2 grid aspect-square place-content-center rounded text-xl">
          <Icons.Close title="lukk ikonvisning" />
        </a>
      </Link>
      <button className="ring-border-subtle bg-deepblue-500 text-text-on-action mt-8 w-full rounded px-3 py-2 ring-1">
        Last ned
      </button>
      <div>
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
} from '@navikt/ds-icons';`,
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
