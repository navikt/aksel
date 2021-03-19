import { useRouter } from "next/router";
import getConfig from "next/config";
import style from "./tableOfContents.module.css";
import Link from "next/link";
import { Next } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import { forwardRef } from "react";

const AnchorLink = forwardRef<
  HTMLAnchorElement,
  { href?: string; children: React.ReactNode }
>(({ href = "", children }, ref) => {
  return (
    <>
      <Next
        aria-label="Pil peker på lenke"
        focusable="false"
        role="img"
        aria-hidden
      />
      <a ref={ref} href={href}>
        {children}
      </a>
    </>
  );
});

const TableOfContents = () => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const i = publicRuntimeConfig.toc.findIndex(
    (x) => x.file === router.asPath.split("#")[0]
  );

  const tree = (i !== -1 && publicRuntimeConfig.toc[i].tree) || [];

  return (
    <>
      {i === -1 ? null : (
        <>
          <Heading size="large" level={2}>
            Table of contents
          </Heading>
          <ul className={style.ul}>
            {tree.map(({ heading, key }) => (
              <li key={key} className={style.li}>
                <Link passHref shallow href={`#${heading.replace(/\s/g, "-")}`}>
                  <AnchorLink>{heading}</AnchorLink>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default TableOfContents;
