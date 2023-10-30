import { AkselSidebarT } from "@/types";
import { useMemo } from "react";
import { sanityCategoryLookup } from "../../../sanity/config";

export const useSection = ({
  kategori,
  links,
}: {
  kategori: "komponenter" | "grunnleggende" | "templates";
  links: AkselSidebarT;
}) => {
  const sections = useMemo(
    () =>
      sanityCategoryLookup(kategori)
        .map((x) => ({
          ...x,
          pages: links
            .filter((y) => y?.kategori === x.value)
            .sort((a, b) => {
              if (a?.tag === "deprecated" && b?.tag === "deprecated") {
                return 0;
              } else if (a?.tag === "deprecated") {
                return 1;
              } else if (b.tag === "deprecated") {
                return -1;
              }

              if (a.sidebarindex !== null || b.sidebarindex !== null) {
                if (a.sidebarindex !== null && b.sidebarindex !== null) {
                  return a.sidebarindex - b.sidebarindex;
                } else if (a.sidebarindex !== null) {
                  return -1;
                } else {
                  return 1;
                }
              }

              return a?.heading.localeCompare(b?.heading);
            }),
        }))
        .filter((x) => !(!x.pages || x.pages.length === 0)),
    [links, kategori]
  );

  return sections;
};
