import { Heading } from "@navikt/ds-react";

export const Tag = ({ type, text }: { type: string; text?: string }) => {
  switch (type) {
    case "aksel_artikkel":
      return (
        <Heading as="div" size="medium" className="text-teal-600">
          {text ? text : "God praksis"}
        </Heading>
      );
    case "aksel_blogg":
      return (
        <Heading as="div" size="medium" className="text-violet-600">
          Blogg
        </Heading>
      );
    case "komponent_artikkel":
      return (
        <Heading as="div" size="medium" className="text-deepblue-600">
          Komponent
        </Heading>
      );
    case "ds_artikkel":
      return (
        <Heading as="div" size="medium" className="text-deepblue-600">
          Grunnleggende
        </Heading>
      );

    default:
      return null;
  }
};
