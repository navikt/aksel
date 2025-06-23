import NextLink from "next/link";
import { LinkCard, Tag } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LinkCard>
      <LinkCard.Title>
        <LinkCard.Anchor asChild>
          <NextLink
            href="/eksempel"
            onNavigate={() => alert("I'm navigating with nextjs router!")}
          >
            Sykepenger
          </NextLink>
        </LinkCard.Anchor>
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
  index: 7,
  sandbox: false,
};
