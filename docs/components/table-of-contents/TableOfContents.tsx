import { useContext } from "react";
import { Next } from "@navikt/ds-icons";
import { Title } from "@navikt/ds-react";
import { PagePropsContext } from "../../pages/_app";
import "./tableOfContents.css";

const TableOfContents = () => {
  const { tableOfContents } = useContext<any>(PagePropsContext);

  return (
    <>
      <Title size="l" level={2}>
        Innhold
      </Title>
      <ul className={"toc__ul"}>
        {tableOfContents?.map(({ heading, slug }) => (
          <li key={slug} className={"toc__li navds-body-short"}>
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
