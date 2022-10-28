import { Edit } from "@navikt/ds-icons";
import { getParameters } from "codesandbox/lib/api/define";

const indexTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "@navikt/ds-css";
import "@navikt/ds-css-internal";

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
            "@navikt/ds-react-internal": "latest",
            "@navikt/ds-css-internal": "latest",
            "@navikt/ds-icons": "latest",
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
    >
      <input type="hidden" name="parameters" value={parameters} />
      <input type="hidden" name="query" value="module=App.js" />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-sm px-3 py-2 hover:bg-gray-100 focus:outline-none focus-visible:shadow-focus-inset active:bg-gray-200"
      >
        <Edit aria-hidden />
        CodeSandbox
      </button>
    </form>
  );
};
