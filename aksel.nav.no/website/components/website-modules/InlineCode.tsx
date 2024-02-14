const InlineCode = (
  props: Pick<React.HTMLAttributes<HTMLElement>, "children">,
) => (
  <code className="rounded-sm bg-surface-neutral-subtle px-1 py-05 font-mono text-sm font-semibold">
    {props.children}
  </code>
);

export default InlineCode;
