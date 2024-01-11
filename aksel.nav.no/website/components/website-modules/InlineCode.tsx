const InlineCode = (
  props: React.HTMLAttributes<HTMLElement> & { noAmps?: boolean },
) => (
  <code className="font-mono text-sm font-semibold leading-normal text-deepblue-800 before:contents dark:text-deepblue-300">
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
