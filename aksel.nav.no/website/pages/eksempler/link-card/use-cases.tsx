import { Detail, LinkCard, Tag, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16" maxWidth="600px" paddingBlock="space-24">
      <LinkCard data-color="accent" arrowPosition="center">
        <LinkCard.Title>
          <LinkCard.Anchor href="/eksempel">
            Er helt eller delvis alene med barn
          </LinkCard.Anchor>
        </LinkCard.Title>
        <LinkCard.Description>
          <Detail textColor="subtle">Dette kan du ha rett til</Detail>
        </LinkCard.Description>
      </LinkCard>
      <LinkCard data-color="accent">
        <LinkCard.Title>
          <LinkCard.Anchor href="/eksempel">Skatteetaten</LinkCard.Anchor>
        </LinkCard.Title>
        <LinkCard.Description>
          Uføretrygd fra folketrygden og uføreytelser fra andre ordninger,
          skattlegges på samme måte som lønnsinntekt.
        </LinkCard.Description>
        <LinkCard.Footer>
          <Tag size="small" variant="moderate">
            Informasjon fra Skatteetaten
          </Tag>
        </LinkCard.Footer>
      </LinkCard>
      <LinkCard data-color="accent" arrow={false}>
        <LinkCard.Icon>
          <DemoPictogramOne />
        </LinkCard.Icon>
        <LinkCard.Title>
          <LinkCard.Anchor href="/eksempel">Honnørkort </LinkCard.Anchor>
        </LinkCard.Title>
        <LinkCard.Description>
          Honnørkort gir redusert billettpris på kollektive transportmidler.
        </LinkCard.Description>
        <LinkCard.Footer>
          <Detail textColor="subtle">PENGESTØTTE</Detail>
        </LinkCard.Footer>
      </LinkCard>
    </VStack>
  );
};

function DemoPictogramOne() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g clipPath="url(#clip0_6081_198)">
        <rect
          x="60"
          y="19.6665"
          width="42.6667"
          height="8"
          transform="rotate(-180 60 19.6665)"
          fill="#F8EAEF"
        />
        <rect
          x="52"
          y="38.3333"
          width="42.6667"
          height="8"
          transform="rotate(-180 52 38.3333)"
          fill="#F8EAEF"
        />
        <rect
          x="42.6667"
          y="56.3333"
          width="42.6667"
          height="8"
          transform="rotate(-180 42.6667 56.3333)"
          fill="#F8EAEF"
        />
        <path
          d="M5.57307 7.73658L6.55229 9.19527L10.9807 6.0812"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.9064 20.8648L15.8856 22.3234L20.314 19.2094"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.3333 8H19.3333"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5.33334 14.6667H9.33334"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5.33334 21.3333H9.33334"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15.3333 14.6667H19.3333"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24.6667 14.6667H28.6667"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24.6667 8H28.6667"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <mask id="path-12-inside-1_6081_198" fill="white">
          <rect width="34.6667" height="28" rx="1.33333" />
        </mask>
        <rect
          width="34.6667"
          height="28"
          rx="1.33333"
          stroke="#A93D70"
          strokeWidth="4"
          mask="url(#path-12-inside-1_6081_198)"
        />
        <path
          d="M35.2878 40.3333H60.5026C61.6025 40.3333 62.4009 41.38 62.11 42.4407L56.986 61.1077C56.7873 61.8314 56.1291 62.3332 55.3786 62.3333H30.1637C29.0639 62.3331 28.2655 61.2864 28.5563 60.2258L33.6813 41.5588C33.88 40.8352 34.5374 40.3334 35.2878 40.3333Z"
          stroke="#A93D70"
          strokeWidth="2"
        />
        <path
          d="M32.5227 46.6882L44.6011 52.4947L60.7057 46.6882"
          stroke="#A93D70"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6081_198">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 15,
  desc: "Dette er replikasjoner av eksempler funnet i Navs løsninger.",
};
