const InlineCode = (
  props: React.HTMLAttributes<HTMLElement> & { noAmps?: boolean },
) => (
  <code className="rounded rounded-sm bg-bg-subtle px-1 py-05 font-mono text-sm font-semibold">
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
