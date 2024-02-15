import NextLink from "next/link";
import { HTMLAttributes } from "react";
import { BodyLong, Box, Heading, Link, Page } from "@navikt/ds-react";

interface UxTweaksProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Link to UXTweaks
   */
  href: string;
  /**
   * Time in minutes to complete the survey
   */
  length: number;
}

export const UxTweaks = ({ href, length, ...rest }: UxTweaksProps) => {
  return (
    <Page.Block width="md" {...rest}>
      <Box padding="6" borderRadius="xlarge" className="bg-pink-100">
        <Heading level="2" size="medium">
          Vil du hjelpe oss å forbedre Aksel?
        </Heading>
        <BodyLong>
          {`Testen er frivillig og anonym. Testen tar ca ${length} minutter.`}
        </BodyLong>

        <Link as={NextLink} href={href} target="_blank">
          Delta i testen
        </Link>
      </Box>
    </Page.Block>
  );
};
