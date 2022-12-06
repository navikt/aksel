/* eslint-disable @next/next/no-img-element */
import { SanityT, urlFor } from "@/lib";
import { Heading } from "@navikt/ds-react";
import Nextlink from "next/link";
import cl from "classnames";
import Image from "next/image";
import { StatusTag } from "components/website-modules/StatusTag";

const ComponentOverview = ({
  node,
}: {
  node: {
    _id: string;
    heading: string;
    slug: { current: string };
    status?: SanityT.Schema.komponent_artikkel["status"];
  }[];
}): JSX.Element => {
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
    .sort((a, b) => a?.heading?.localeCompare(b?.heading));

  return (
    <div className="mb-8">
      <ul className="component-card-grid">
        {sorted.map((x) => (
          <li key={x._id}>
            <div className="bg-surface-subtle focus-within:shadow-focus ring-border-subtle hover:shadow-medium group relative h-56 rounded-2xl hover:ring-1">
              <div
                className={cl(
                  "flex max-h-44 items-center justify-center overflow-hidden rounded-t-2xl"
                )}
              >
                {x.status?.bilde ? (
                  <Image
                    src={urlFor(x.status?.bilde).auto("format").url()}
                    decoding="async"
                    width="200px"
                    height="200px"
                    layout="fixed"
                    objectFit="contain"
                    alt={x?.heading + " thumbnail"}
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
                      fill="url(#a)"
                    />
                    <defs>
                      <linearGradient
                        id="a"
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
                  <Nextlink href={`/${x?.slug.current}`} passHref>
                    <Heading
                      as="a"
                      size="small"
                      className="z-10 before:absolute before:inset-0 focus:outline-none group-hover:underline"
                    >
                      {x.heading}
                    </Heading>
                  </Nextlink>
                  <span className="absolute top-4 left-4">
                    <StatusTag status={x?.status?.tag} />
                  </span>
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
