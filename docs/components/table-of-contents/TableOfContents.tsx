import { useRouter } from "next/router";
import getConfig from "next/config";
import style from "./tableOfContents.module.css";
import Link from "next/link";
import { Next } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import { forwardRef, useContext } from "react";
import { PagePropsContext } from "../../pages/_app";

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
  const { tableOfContents } = useContext<any>(PagePropsContext);
  return (
    <>
      <Heading size="large" level={2}>
        Innhold
      </Heading>
      <ul className={style.ul}>
        {tableOfContents?.map((heading, i) => (
          <li key={i} className={style.li}>
            <Link passHref shallow href={`#${heading.replace(/\s/g, "-")}`}>
              <AnchorLink>{heading}</AnchorLink>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfContents;
