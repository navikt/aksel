import { useContext } from "react";
import { Next } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import style from "./tableOfContents.module.css";
import { PagePropsContext } from "../../pages/_app";

const TableOfContents = () => {
  const { tableOfContents } = useContext<any>(PagePropsContext);

  return (
    <>
      <Heading size="large" level={2}>
        Innhold
      </Heading>
      <ul className={style.ul}>
        {tableOfContents?.map(({ heading, slug }) => (
          <li key={slug} className={style.li}>
            <Next
              aria-label="Pil peker på lenke"
              focusable="false"
              role="img"
              aria-hidden
            />
            <a href={`#${slug}`}>{heading}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfContents;
