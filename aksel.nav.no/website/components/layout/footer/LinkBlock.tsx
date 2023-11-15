import FooterLink from "@/layout/footer/FooterLink";
import { BodyShort, Heading } from "@navikt/ds-react";

type LinkBlockPropsT = {
  heading: string;
  links: { url: string; text: string; icon?: React.ReactNode }[];
};

function LinkBlock({ heading, links }: LinkBlockPropsT) {
  return (
    <div>
      <Heading level="2" size="xsmall">
        {heading}
      </Heading>
      <BodyShort as="ul" className="mt-3 grid gap-3">
        {links.map((link) => (
          <FooterLink key={link.url} href={link.url}>
            {link.icon}
            {link.text}
          </FooterLink>
        ))}
      </BodyShort>
    </div>
  );
}

export default LinkBlock;
