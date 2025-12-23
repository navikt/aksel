"use client";

import { getParameters } from "codesandbox-import-utils/lib/api/define";
import { stegaClean } from "next-sanity";
import { useId } from "react";
import {
  ArrowCirclepathIcon,
  CodeIcon,
  ExternalLinkIcon,
  LaptopIcon,
  MobileSmallIcon,
  PencilIcon,
} from "@navikt/aksel-icons";
import { Button, HStack, Show } from "@navikt/ds-react";
import styles from "./KodeEksempler.module.css";
import { useKodeEksempler } from "./KodeEksempler.provider";

function KodeEksemplerToolbar({
  code,
  base64,
  link,
  reload,
}: {
  code?: string;
  base64?: string;
  link: string;
  reload: () => void;
}) {
  const { showCode, toggleShowCode, resizerRef } = useKodeEksempler();

  if (!code) {
    return null;
  }

  return (
    <div className={styles.kodeEksemplerToolbar}>
      <HStack gap="4" justify="space-between">
        <Show above="sm">
          <HStack gap="2">
            <Button
              variant="tertiary-neutral"
              size="small"
              icon={<MobileSmallIcon title="Sett eksempel til mobilbredde" />}
              onClick={() => {
                if (resizerRef?.current) {
                  resizerRef.current.style.width = "360px";
                }
              }}
            />

            <Button
              variant="tertiary-neutral"
              size="small"
              icon={<LaptopIcon title="Sett eksempel til desktopbredde" />}
              onClick={() => {
                if (resizerRef?.current) {
                  resizerRef.current.style.width = "";
                }
              }}
            />
          </HStack>
        </Show>
        <HStack gap="space-8">
          <Button
            variant="tertiary-neutral"
            size="small"
            icon={<CodeIcon aria-hidden />}
            onClick={toggleShowCode}
          >
            {showCode ? "Skjul" : "Vis"} kode
          </Button>
          {base64 && (
            <Button
              href={`/sandbox/index.html?code=${stegaClean(base64)}`}
              rel="noreferrer"
              target="_blank"
              as="a"
              variant="tertiary-neutral"
              size="small"
              icon={<PencilIcon title="Sandbox" />}
            />
          )}
          <CodeSandbox code={code} />
          <Button
            variant="tertiary-neutral"
            size="small"
            icon={<ArrowCirclepathIcon title="Last inn eksempelet på nytt" />}
            onClick={reload}
          />
          <Button
            variant="tertiary-neutral"
            size="small"
            icon={<ExternalLinkIcon title="Åpne eksempel i nytt vindu" />}
            target="_blank"
            className="si-ignore"
            as="a"
            href={link?.replace(".tsx", "")}
          />
        </HStack>
      </HStack>
    </div>
  );
}

const indexTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "@navikt/ds-css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`;

function CodeSandbox({ code }: { code: string }) {
  const parameters = getParameters({
    files: {
      "package.json": {
        // @ts-expect-error https://github.com/codesandbox/codesandbox-importers/issues/137
        content: {
          dependencies: {
            react: "latest",
            "react-dom": "latest",
            "@navikt/ds-react": "latest",
            "@navikt/ds-css": "latest",
            "@navikt/aksel-icons": "latest",
          },
        },
        isBinary: false,
      },
      "App.tsx": {
        content: `${code}\n\nexport default Example;`,
        isBinary: false,
      },
      "index.js": {
        content: indexTsx,
        isBinary: false,
      },
      "index.html": {
        content: '<div id="root"></div>',
        isBinary: false,
      },
    },
  });

  return (
    <form
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
      rel="noopener"
      className={styles.kodeEksemplerCodeSandbox}
    >
      <input type="hidden" name="parameters" value={parameters} />
      <input type="hidden" name="query" value="module=App.tsx" />
      <Button
        variant="tertiary-neutral"
        size="small"
        type="submit"
        icon={<CodeSandboxLogo />}
      />
    </form>
  );
}

function CodeSandboxLogo() {
  const titleId = useId();
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-labelledby={titleId}
    >
      <title id={titleId}>CodeSandbox</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1248 2.7405C12.3568 2.60652 12.6427 2.60652 12.8748 2.7405L20.669 7.2405C20.9011 7.37447 21.044 7.62207 21.044 7.89001V16.89C21.044 17.158 20.9011 17.4056 20.669 17.5395L12.8748 22.0395C12.6427 22.1735 12.3568 22.1735 12.1248 22.0395L4.33057 17.5395C4.09852 17.4056 3.95557 17.158 3.95557 16.89V7.89001C3.95557 7.62207 4.09852 7.37447 4.33057 7.2405L12.1248 2.7405ZM12.4998 4.25604L6.20558 7.89001L12.5 11.524L18.794 7.89002L12.4998 4.25604ZM19.544 9.18907L13.25 12.823L13.2498 20.091L19.544 16.457V9.18907ZM11.7498 20.091L11.75 12.823L5.45557 9.18904V16.457L11.7498 20.091Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { KodeEksemplerToolbar };
