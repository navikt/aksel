import { getParameters } from "codesandbox-import-utils/lib/api/define";
import { Button } from "@navikt/ds-react";
import { CodeSandboxLogo } from "@/assets/Icons";

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

const getCode = (code: string) => `${code}\n\nexport default Example;`;

export const CodeSandbox = ({ code }: { code: string }) => {
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
        content: getCode(code),
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
};
