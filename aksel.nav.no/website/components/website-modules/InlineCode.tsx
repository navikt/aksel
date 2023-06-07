export const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code className="text-deepblue-800 font-mono text-sm font-medium leading-normal before:contents">
    <span aria-hidden>`</span>
    <span>{props.children}</span>
    <span aria-hidden>`</span>
  </code>
);
