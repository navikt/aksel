/* eslint-disable @next/next/no-img-element */
import { SanityT, urlFor } from "@/lib";
import { Heading, Tag } from "@navikt/ds-react";
import Nextlink from "next/link";
import cl from "classnames";
import Image from "next/image";

const getStatus = (status?: SanityT.Schema.komponent_artikkel["status"]) => {
  switch (status?.tag) {
    case "beta":
      return (
        <Tag variant="alt1" size="small">
          Beta
        </Tag>
      );
    case "new":
      return (
        <Tag variant="info" size="small">
          New
        </Tag>
      );
    case "ready":
      return null;
    case "deprecated":
      return (
        <Tag variant="neutral" size="small">
          Deprecated
        </Tag>
      );
    default:
      return null;
  }
};

const ComponentOverview = ({
  node,
}: {
  node: {
    _id: string;
    heading: string;
    slug: { current: string };
    ingress?: any[];
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
            <div className="shadow-small focus-within:shadow-focus hover:shadow-medium group relative rounded ring-1 ring-gray-900/10">
              <div
                className={cl(
                  "flex max-h-64 items-center justify-center overflow-hidden rounded-t bg-gray-50",
                  {
                    "p-12":
                      x.status?.bilde &&
                      !urlFor(x.status?.bilde)
                        .auto("format")
                        .url()
                        .includes("320x256.svg?auto=format"),
                  }
                )}
              >
                {x.status?.bilde ? (
                  <Image
                    src={urlFor(x.status?.bilde).auto("format").url()}
                    decoding="async"
                    width="320px"
                    height="256px"
                    layout="fixed"
                    objectFit="contain"
                    alt={x?.heading + " thumbnail"}
                  />
                ) : (
                  <svg
                    aria-hidden
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-11.5 -10.23174 23 20.46348"
                    className="min-h-40 aspect-[1.25/1] h-auto max-h-64 p-4"
                  >
                    <title>React Logo</title>
                    <circle cx="0" cy="0" r="2.05" fill="var(--a-gray-300)" />
                    <g stroke="var(--a-gray-300)" strokeWidth="1" fill="none">
                      <ellipse rx="11" ry="4.2" />
                      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                )}
              </div>
              <div
                className={cl("grid p-3", {
                  "pt-3": !!x?.status?.bilde,
                })}
              >
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
                  {getStatus(x.status)}
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
