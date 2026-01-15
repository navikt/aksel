import { LinkCard, Tag, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16" maxWidth="600px" paddingBlock="space-24">
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
      <LinkCard data-color="accent">
        <LinkCard.Title>
          <LinkCard.Anchor href="/eksempel">
            Er helt eller delvis alene med barn
          </LinkCard.Anchor>
        </LinkCard.Title>
        <LinkCard.Footer>
          <Tag size="small" variant="moderate">
            Dette kan du ha rett til
          </Tag>
        </LinkCard.Footer>
      </LinkCard>
      <LinkCard data-color="accent">
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
          <Tag size="small" variant="moderate">
            Slik gjør du det
          </Tag>
        </LinkCard.Footer>
      </LinkCard>
      <LinkCard>
        <VStack justify="center" height="100%" asChild>
          <LinkCard.Icon>
            <DemoPictogramTwo />
          </LinkCard.Icon>
        </VStack>
        <LinkCard.Title>
          <LinkCard.Anchor href="/eksempel">
            Trenger tilrettelegging på jobb eller i utdanning{" "}
          </LinkCard.Anchor>
        </LinkCard.Title>
        <LinkCard.Description>
          Om hjelpemidler, tilskuddsordninger og tilrettelegging på
          arbeidsplassen eller studiestedet når du har nedsatt funksjonsevne.
        </LinkCard.Description>
        <LinkCard.Footer>
          <Tag size="small" variant="moderate">
            Dette kan du ha rett til
          </Tag>
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

function DemoPictogramTwo() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6081_316)">
        <path
          d="M26 48C26 60.1503 35.8497 70 48 70V63L70 76L48 89V82C29.2223 82 14 66.7777 14 48H26ZM49 14C67.7777 14 83 29.2223 83 48H71C71 35.8497 61.1503 26 49 26V33L27 20L49 7V14Z"
          fill="#FFECCC"
        />
        <path
          d="M14.8695 1.5L2.47788 1.5C1.93778 1.50021 1.50034 1.93836 1.50034 2.47852L1.50034 32.2178C1.50055 32.7577 1.9379 33.1951 2.47788 33.1953L32.2171 33.1953C32.7573 33.1953 33.1954 32.7579 33.1957 32.2178L33.1957 19.8262C33.1957 9.70495 24.9907 1.5 14.8695 1.5Z"
          stroke="#23262A"
          strokeWidth="3"
        />
        <path
          d="M57 19.826L57 27.2608C57 28.6295 55.8904 29.739 54.5217 29.739L37.1739 29.739"
          stroke="#23262A"
          strokeWidth="3"
        />
        <circle
          cx="8.67391"
          cy="8.67391"
          r="7.17391"
          transform="matrix(-1 0 0 1 24.7826 9.91309)"
          stroke="#23262A"
          strokeWidth="3"
        />
        <line
          x1="58"
          y1="59.5"
          x2="96"
          y2="59.5"
          stroke="#23262A"
          strokeWidth="3"
        />
        <path
          d="M63 64L63 94"
          stroke="#23262A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M91 64L91 94"
          stroke="#23262A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M37.5 77.5V93"
          stroke="#23262A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M54 78L54 92"
          stroke="#23262A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M33 56V70C33 74.4183 36.5817 78 41 78H55"
          stroke="#23262A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="37.6428" cy="93.262" r="2.7381" fill="#23262A" />
        <circle cx="54.2143" cy="93.262" r="2.7381" fill="#23262A" />
      </g>
      <defs>
        <clipPath id="clip0_6081_316">
          <rect width="96" height="96" fill="white" />
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

export const args = {
  index: 15,
  desc: "Eksemplene er replikasjoner fra eksempler funnet i Navs løsninger. Merk at 'data-color' bare fungerer ved bruk av 'darkside' css og tokens.",
};
