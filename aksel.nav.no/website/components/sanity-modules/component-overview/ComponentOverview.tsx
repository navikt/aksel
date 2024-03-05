import cl from "clsx";
import Image from "next/legacy/image";
import Nextlink from "next/link";
import { Heading } from "@navikt/ds-react";
import { urlFor } from "@/sanity/interface";
import { ArticleListT } from "@/types";
import { StatusTag } from "@/web/StatusTag";

const ComponentOverview = ({ node }: { node: ArticleListT }) => {
  if (!node || node.length === 0) {
    return null;
  }

  const sorted = node
    .filter((x) => {
      if (x._id.includes("draft.") || !x?.heading || !x.slug) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (a?.status?.tag === "deprecated" && b?.status?.tag === "deprecated") {
        return 0;
      } else if (a?.status?.tag === "deprecated") {
        return 1;
      } else if (b?.status?.tag === "deprecated") {
        return -1;
      }

      if (
        typeof a.sidebarindex === "number" ||
        typeof b.sidebarindex === "number"
      ) {
        if (
          typeof a.sidebarindex === "number" &&
          typeof b.sidebarindex === "number"
        ) {
          return a.sidebarindex - b.sidebarindex;
        } else if (a.sidebarindex !== null) {
          return -1;
        } else {
          return 1;
        }
      }
      return a?.heading?.localeCompare(b?.heading);
    });

  return (
    <div className="mb-8">
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(min(17rem,_100%),_1fr))] gap-6">
        {sorted.map((x) => (
          <li key={x._id}>
            <div className="group relative min-h-56 rounded-2xl bg-surface-subtle shadow-xsmall focus-within:ring-[3px] focus-within:ring-border-focus hover:shadow-small">
              <div
                className={cl(
                  "flex max-h-44 items-center justify-center overflow-hidden rounded-t-2xl filter",
                  {
                    "hue-rotate-[65deg]": x?.status?.tag === "beta",
                    grayscale: x?.status?.tag === "deprecated",
                  },
                )}
              >
                {x.status?.bilde ? (
                  <Image
                    src={urlFor(x.status?.bilde)
                      .auto("format")
                      .url()}
                    width="200"
                    height="200"
                    layout="fixed"
                    objectFit="contain"
                    alt={x?.heading + " thumbnail"}
                    aria-hidden
                  />
                ) : (
                  <svg
                    width="200"
                    height="200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      fill="#3380A5"
                      d="M85 75h5v5h-5zM80 80h5v5h-5zM60 65h5v5h-5zM65 60h5v5h-5zM70 60h5v5h-5zM75 60h5v5h-5zM80 60h5v5h-5zM85 60h5v5h-5zM90 60h5v5h-5zM95 60h5v5h-5zM100 60h5v5h-5zM105 60h5v5h-5zM110 60h5v5h-5zM115 60h5v5h-5zM120 60h5v5h-5zM125 60h5v5h-5zM130 60h5v5h-5zM60 70h5v5h-5zM60 75h5v5h-5zM60 80h5v5h-5zM60 85h5v5h-5zM60 90h5v5h-5zM60 95h5v5h-5zM60 100h5v5h-5zM60 105h5v5h-5zM60 110h5v5h-5zM60 115h5v5h-5zM60 120h5v5h-5zM60 125h5v5h-5zM60 130h5v5h-5zM80 85h5v5h-5zM80 90h5v5h-5zM85 80h5v5h-5zM85 85h5v5h-5zM85 90h5v5h-5zM105 80h5v5h-5zM105 85h5v5h-5zM105 90h5v5h-5zM105 95h5v5h-5zM100 95h5v5h-5zM100 100h5v5h-5zM100 105h5v5h-5zM100 115h5v5h-5zM100 120h5v5h-5zM95 100h5v5h-5zM95 105h5v5h-5zM95 115h5v5h-5zM95 120h5v5h-5zM110 80h5v5h-5zM110 85h5v5h-5zM110 90h5v5h-5zM110 95h5v5h-5zM90 75h5v5h-5zM95 75h5v5h-5zM100 75h5v5h-5zM105 75h5v5h-5z"
                    />
                    <path
                      fill="#00243A"
                      d="M70 70h5v5h-5zM90 80h5v5h-5zM90 85h5v5h-5zM90 90h5v5h-5zM90 95h5v5h-5zM85 95h5v5h-5zM95 80h5v5h-5zM100 80h5v5h-5zM115 85h5v5h-5zM115 90h5v5h-5zM115 95h5v5h-5zM115 100h5v5h-5zM110 100h5v5h-5zM105 100h5v5h-5zM105 105h5v5h-5zM105 110h5v5h-5zM105 120h5v5h-5zM105 125h5v5h-5zM125 125h5v5h-5zM100 125h5v5h-5zM70 125h5v5h-5zM100 110h5v5h-5zM125 70h5v5h-5zM135 65h5v5h-5zM135 70h5v5h-5zM135 75h5v5h-5zM135 80h5v5h-5zM135 85h5v5h-5zM135 90h5v5h-5zM135 95h5v5h-5zM135 100h5v5h-5zM135 105h5v5h-5zM135 110h5v5h-5zM135 115h5v5h-5zM135 120h5v5h-5zM135 125h5v5h-5zM135 130h5v5h-5zM135 135h5v5h-5zM130 135h5v5h-5zM125 135h5v5h-5zM120 135h5v5h-5zM115 135h5v5h-5zM110 135h5v5h-5zM105 135h5v5h-5zM100 135h5v5h-5zM95 135h5v5h-5zM90 135h5v5h-5zM85 135h5v5h-5zM80 135h5v5h-5zM75 135h5v5h-5zM70 135h5v5h-5zM65 135h5v5h-5zM60 135h5v5h-5z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M65 65h70v70H65V65Zm65 5h-5v5h5v-5Zm0 60v-5h-5v5h5Zm-20 0v-10h-5v-5h5v-10h10V85h-5v-5h-5v-5H85v5h-5v15h5v5h10v10h5v5h-5v10h5v5h10Zm-15-30V85h10v10h-5v5h-5ZM75 75v-5h-5v5h5Zm0 55v-5h-5v5h5Z"
                      fill={`url(#${x._id})`}
                    />
                    <defs>
                      <linearGradient
                        id={x._id}
                        x1="65"
                        y1="65"
                        x2="135"
                        y2="135"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset=".010417" stopColor="#CCE2F0" />
                        <stop offset="1" stopColor="#66A3C4" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </div>

              <div className="grid p-6 pt-0">
                <span className="flex items-center justify-between">
                  <Nextlink
                    href={`/${x?.slug.current}`}
                    passHref
                    legacyBehavior
                  >
                    <Heading
                      as="a"
                      size="small"
                      className="z-10 underline before:absolute before:inset-0 focus:outline-none"
                    >
                      {x.heading}
                      {x?.status?.tag && (
                        <span className="absolute left-4 top-4">
                          <StatusTag status={x?.status?.tag} />
                        </span>
                      )}
                    </Heading>
                  </Nextlink>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentOverview;
