import Image from "next/image";
import { LinkCard, Tag } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LinkCard>
      <LinkCard.Image aspectRatio="16/6">
        <Image
          src="/images/og/blogg/image-2.png"
          alt="Alt-tekst for bilde"
          fill
        />
      </LinkCard.Image>
      <LinkCard.Title>
        <LinkCard.Anchor href="/eksempel">Sykepenger</LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>
        Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
        skade.
      </LinkCard.Description>
      <LinkCard.Footer>
        <Tag size="small" variant="strong">
          Tag 1
        </Tag>
        <Tag size="small">Tag 2</Tag>
      </LinkCard.Footer>
    </LinkCard>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  sandbox: false,
};
