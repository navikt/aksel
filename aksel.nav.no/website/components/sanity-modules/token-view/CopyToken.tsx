import { Copy } from "@navikt/ds-icons";

import copystring from "copy-to-clipboard";

export const CopyToken = ({ val }: { val: string }) => {
  return (
    <div className="bg-surface-action-subtle">
      <button
        onClick={() => copystring(val)}
        className=" hover:bg-surface-hover focus-visible:shadow-focus group flex h-8 w-full items-center justify-between overflow-x-hidden whitespace-nowrap rounded px-2 font-mono text-sm focus:outline-none"
        aria-label={`kopier ${val.replace("--a-", "")}`}
      >
        <span aria-hidden>{val}</span>
        <Copy
          aria-hidden
          className="text-text-subtle group-hover:text-text-default h-4 w-4 flex-shrink-0"
        />
      </button>
    </div>
  );
};
