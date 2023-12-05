import clsx from "clsx";
import { BodyLong, Box, HStack, Heading, Tag, VStack } from "@navikt/ds-react";
import { Sticker } from "./Sticker";

const trunc = (text, num_chars) => {
  return `${text.substring(0, num_chars)}${
    text.length > num_chars ? "..." : ""
  }`;
};

export const ArticleCard = ({
  title,
  content,
  slug,
  main = false,
  innholdstype,
  undertema,
  isNew = false,
}: {
  title: string;
  content: string;
  slug: any; // TODO: types
  main?: boolean;
  innholdstype?: string;
  undertema?: string;
  isNew?: boolean;
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
        href={`./${slug.current}`}
        className={clsx("gp-article-card", main && "gp-article-card-main")}
        paddingBlock="10"
        paddingInline="10"
        borderRadius="xlarge"
        background="surface-default"
        shadow="xsmall"
      >
        <VStack justify="space-between" className="min-h-full relative">
          <Box paddingBlock="0 5">
            <Heading className="inner-shiny" size={main ? "xlarge" : "medium"}>
              <span className="shiny">{title}</span>
            </Heading>

            <BodyLong size={main ? "large" : "small"}>
              {main ? trunc(content, 770) : trunc(content, 100)}
            </BodyLong>
          </Box>
          <HStack gap="2">
            {undertema && (
              <Tag variant="success" size={main ? "medium" : "xsmall"}>
                {undertema}
              </Tag>
            )}
            {innholdstype && (
              <Tag variant="error" size={main ? "medium" : "xsmall"}>
                {innholdstype}
              </Tag>
            )}
          </HStack>
          {isNew && <Sticker large={main} />}
        </VStack>
      </Box>
    </>
  );
};
