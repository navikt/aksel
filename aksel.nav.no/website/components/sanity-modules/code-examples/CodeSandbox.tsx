import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { getParameters } from "codesandbox/lib/api/define";

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
        content: {
          dependencies: {
            react: "latest",
            "react-dom": "latest",
            "@navikt/ds-react": "latest",
            "@navikt/ds-css": "latest",
            "@navikt/aksel-icons": "latest",
          },
        } as any,
        isBinary: false,
      },
      "App.js": {
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
      <input type="hidden" name="query" value="module=App.js" />
      <Button
        variant="tertiary-neutral"
        size="small"
        type="submit"
        icon={<PencilIcon aria-hidden fontSize="1.5rem" />}
      >
        CodeSandbox
      </Button>
    </form>
  );
};
