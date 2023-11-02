const InlineCode = (
  props: React.HTMLAttributes<HTMLElement> & { noAmps?: boolean }
) => (
  <code className="text-deepblue-800 font-mono text-sm font-semibold leading-normal before:contents">
    {!props?.noAmps && (
      <span aria-hidden className="inline-code-amp">
        `
      </span>
    )}
    <span>{props.children}</span>
    {!props?.noAmps && (
      <span aria-hidden className="inline-code-amp">
        `
      </span>
    )}
  </code>
);

export default InlineCode;
