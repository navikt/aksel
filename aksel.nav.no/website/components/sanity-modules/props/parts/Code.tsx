import { Highlight, themes } from "prism-react-renderer";

const Code = (props: Pick<React.HTMLAttributes<HTMLElement>, "children">) => (
  <Highlight
    code={props.children?.toString() || ""}
    language="javascript"
    theme={themes.vsLight}
  >
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
);

export default Code;
