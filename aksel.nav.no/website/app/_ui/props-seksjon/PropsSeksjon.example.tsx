import { Highlight, themes } from "prism-react-renderer";

function PropsSeksjonExample({ code }: { code?: string }) {
  if (!code) {
    return null;
  }

  return (
    <li className="my-3 flex flex-col px-3 text-base md:flex-row">
      <div className="min-w-24 font-semibold">Example: </div>

      <div className="mt-05 grid text-sm">
        <Highlight code={code} language="javascript" theme={themes.vsLight}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style} className="overflow-auto">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </li>
  );
}

export { PropsSeksjonExample };
