import { Heading } from "@navikt/ds-react";

export const Tag = ({ type }: { type: string }) => {
  switch (type) {
    case "aksel_artikkel":
      return (
        <Heading as="div" size="medium" className="text-teal-500">
          God praksis
        </Heading>
      );
    case "aksel_blogg":
      return (
        <Heading as="div" size="medium" className="text-violet-600">
          Blogg
        </Heading>
      );

    default:
      return null;
  }
};
