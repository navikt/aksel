import { LinkCard, Tag } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LinkCard>
      <LinkCard.Image>
        <picture>
          <source
            srcSet="/images/og/blogg/image-4.png"
            width="700px"
            media="(orientation: portrait)"
          />
          <img
            src="/images/og/blogg/image-1.png"
            alt="alt-placeholder"
            width="700px"
          />
        </picture>
      </LinkCard.Image>
      <LinkCard.Title>
        <LinkCard.Anchor href="/eksempel">Sykepenger</LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>
        Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
        skade.
      </LinkCard.Description>
      <LinkCard.Footer>
        <Tag size="small" variant="neutral-filled">
          Tag 1
        </Tag>
        <Tag size="small" variant="neutral">
          Tag 2
        </Tag>
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
};
