export const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code className="text-deepblue-800 font-mono text-sm font-semibold leading-normal before:contents">
    <span aria-hidden className="inline-code-amp">
      `
    </span>
    <span>{props.children}</span>
    <span aria-hidden className="inline-code-amp">
      `
    </span>
  </code>
);
