import cl from "clsx";
import { searchOptions } from "@/types";

function splitStr(str: string, query: string) {
  const regexStr = query.toLowerCase().split(" ").join("|");
  return str.split(new RegExp(`(${regexStr})`, "gi"));
}

export function highlightStr(
  str: string,
  query: string,
  tag?: keyof typeof searchOptions,
) {
  if (!query) {
    return str;
  }

  const getClass = (part: string) => {
    if (
      !query
        .split(" ")
        .map((x) => x.toLowerCase())
        .includes(part.toLowerCase())
    ) {
      return undefined;
    }
    return cl("text-text-default", {
      "bg-gray-200": !tag,
      "bg-teal-100": tag === "aksel_artikkel",
      "bg-deepblue-100":
        tag && ["komponent_artikkel", "ds_artikkel"].includes(tag),
      "bg-violet-100":
        tag && ["aksel_prinsipp", "aksel_standalone"].includes(tag),
      "bg-pink-100": tag === "aksel_blogg",
    });
  };
  return (
    <>
      {splitStr(str, query)
        .filter((x) => !!x)
        .map((part, i) => (
          <span key={i} className={getClass(part)}>
            {part}
          </span>
        ))}
    </>
  );
}
