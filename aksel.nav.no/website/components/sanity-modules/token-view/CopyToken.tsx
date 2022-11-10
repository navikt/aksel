import { Copy } from "@navikt/ds-icons";
import copystring from "copy-to-clipboard";

export const CopyToken = ({ val }: { val: string }) => {
  return (
    <button
      onClick={() => copystring(val)}
      className="bg-surface-action-subtle focus-visible:shadow-focus group flex h-8 w-full items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap rounded px-2 font-mono text-sm focus:outline-none "
      aria-label={`kopier ${val.replace("--a-", "")}`}
    >
      <span aria-hidden>{val}</span>
      <Copy
        aria-hidden
        className="text-text-subtle group-hover:text-text-default h-4 w-4"
      />
    </button>
  );
};
