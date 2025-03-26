import { getParameters } from "codesandbox-import-utils/lib/api/define";
import {
  CodeIcon,
  ExternalLinkIcon,
  LaptopIcon,
  MobileSmallIcon,
  PencilIcon,
} from "@navikt/aksel-icons";
import { Button, HStack } from "@navikt/ds-react";
import { useKodeEksempler } from "@/app/_ui/kode-eksempler/KodeEksempler.provider";
import { CodeSandboxLogo } from "@/assets/Icons";

function KodeEksemplerToolbar({
  code,
  base64,
  link,
}: {
  code?: string;
  base64?: string;
  link: string;
}) {
  const { showCode, toggleShowCode, resizerRef } = useKodeEksempler();

  if (!code) {
    return null;
  }

  return (
    <div className="mb-2 rounded-b-lg border border-gray-300 p-1">
      <HStack gap="4" justify="space-between">
        <div className="hidden sm:block">
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
        </div>
        <HStack gap="space-8">
          <Button
            variant="tertiary-neutral"
            size="small"
            icon={<CodeIcon aria-hidden />}
            onClick={toggleShowCode}
          >
            {showCode ? "Skjul" : "Vis"} kode
          </Button>
          <Button
            href={`/sandbox/index.html?code=${base64}`}
            rel="noreferrer"
            target="_blank"
            as="a"
            variant="tertiary-neutral"
            size="small"
            icon={<PencilIcon title="Sandbox" />}
          />
          <CodeSandbox code={code} />
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
      className="h-8"
    >
      <input type="hidden" name="parameters" value={parameters} />
      <input type="hidden" name="query" value="module=App.tsx" />
      <Button
        variant="tertiary-neutral"
        size="small"
        type="submit"
        icon={<CodeSandboxLogo title="CodeSandbox" />}
      />
    </form>
  );
}

export { KodeEksemplerToolbar };
