import clsx from "clsx";
import { BodyLong, Box, Heading } from "@navikt/ds-react";

const trunc = (text, num_chars) => {
  return `${text.substring(0, num_chars)}${
    text.length > num_chars ? "..." : ""
  }`;
};

export const ArticleCard = ({
  title,
  content,
  main = false,
}: {
  title: string;
  content: string;
  main?: boolean;
}) => {
  return (
    <>
      <style>
        {`
        .gp-article-card {
            width: 100%;
            flex-shrink: ${main ? 1 : 1};
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .gp-article-card:hover {
            box-shadow: var(--a-shadow-xlarge);
        }
        `}
      </style>
      <Box
        as="a"
        href="#"
        className={clsx("gp-article-card", main && "gp-article-card-main")}
        paddingBlock="10"
        paddingInline="10"
        borderRadius="xlarge"
        background="surface-default"
        shadow="xsmall"
      >
        <Heading size={main ? "xlarge" : "medium"}>{title}</Heading>
        <BodyLong>{main ? trunc(content, 770) : trunc(content, 100)}</BodyLong>
      </Box>
    </>
  );
};
