import { HStack, Heading, Link, VStack } from "@navikt/ds-react";
import { KOMPONENT_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { List, ListItem } from "@/app/_ui/typography/List";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import { FigmaIcon, GithubIcon } from "@/assets/Icons";
import styles from "./Designsystemet.module.css";

const GITHUB_CONFIG = {
  "ds-react": {
    title: "@navikt/ds-react",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/react",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/react/CHANGELOG.md",
  },
  "ds-css": {
    title: "@navikt/ds-css",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/css",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/css/CHANGELOG.md",
  },
  "ds-tokens": {
    title: "@navikt/ds-tokens",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/tokens",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/tokens/CHANGELOG.md",
  },
  "ds-tailwind": {
    title: "@navikt/ds-tailwind",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/tailwind",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/tailwind/CHANGELOG.md",
  },
} as const;

function KomponentLinks({ data }: { data: KOMPONENT_BY_SLUG_QUERYResult }) {
  const pack = data?.kodepakker?.[0];
  const gitConfig = pack ? GITHUB_CONFIG[pack] ?? null : null;

  if (!(gitConfig || data?.figma_link)) {
    return null;
  }

  return (
    <HStack gap="space-16" align="center" marginBlock="space-16 0">
      {gitConfig && (
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={gitConfig.git}
          data-umami-event="navigere"
          data-umami-event-url={gitConfig.git}
          variant="subtle"
        >
          <GithubIcon /> Github
        </Link>
      )}
      {data?.figma_link && (
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={data.figma_link}
          data-umami-event="navigere"
          data-umami-event-url={data.figma_link}
          variant="subtle"
        >
          <FigmaIcon /> Figma
        </Link>
      )}
    </HStack>
  );
}

function KomponentIntro({ data }: { data: KOMPONENT_BY_SLUG_QUERYResult }) {
  const useFor = data?.intro?.brukes_til;
  const avoidUseFor = data?.intro?.brukes_ikke_til;

  if (!useFor && !avoidUseFor) {
    return null;
  }

  const internal = data?.status?.internal;

  return (
    <VStack gap="space-8" marginBlock="space-28">
      {useFor && (
        <div>
          <Heading size="small" level="3">
            Egnet til:
          </Heading>

          <List as="ul">
            {internal && <ListItem icon>Bruk på interne flater</ListItem>}
            {data?.intro?.brukes_til?.map((x) => (
              <ListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {avoidUseFor && (
        <div>
          <Heading size="small" level="3">
            Uegnet til:
          </Heading>
          <List as="ul">
            {avoidUseFor.map((x) => (
              <ListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </VStack>
  );
}

function DesignsystemetThumbnail() {
  return (
    <div className={styles.thumbnailContainer}>
      <CubeShape />
      <Thumbnail />
    </div>
  );
}

function Thumbnail() {
  return (
    <svg
      viewBox="0 0 289 289"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={styles.thumbnailImage}
    >
      <path
        d="M35.06 91.7645C35.06 82.6549 42.4449 75.27 51.5545 75.27H237.445C246.555 75.27 253.94 82.6549 253.94 91.7646V197.016C253.94 206.125 246.555 213.51 237.445 213.51H51.5546C42.4449 213.51 35.06 206.125 35.06 197.015V91.7645Z"
        fill="white"
      />
      <mask id="path-3-inside-1_1364_1724" fill="white">
        <path d="M35.06 78.0191C35.06 76.5008 36.2908 75.27 37.8091 75.27H251.191C252.709 75.27 253.94 76.5008 253.94 78.0191V118.601C253.94 120.119 252.709 121.35 251.191 121.35H37.8091C36.2908 121.35 35.06 120.119 35.06 118.601V78.0191Z" />
      </mask>
      <path
        d="M35.06 75.27H253.94H35.06ZM253.94 118.601C253.94 121.71 251.42 124.23 248.311 124.23H40.6891C37.5802 124.23 35.06 121.71 35.06 118.601V118.47C35.06 118.47 36.2908 118.47 37.8091 118.47H251.191C252.709 118.47 253.94 118.47 253.94 118.47V118.601ZM35.06 121.35V75.27V121.35ZM253.94 75.27V121.35V75.27Z"
        fill="#C0D6E4"
        mask="url(#path-3-inside-1_1364_1724)"
      />
      <path
        d="M51.1398 92.23L59.0598 100.15L66.9798 92.23"
        stroke="#417DA0"
        strokeWidth="2.88"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="83.62"
        y="90.79"
        width="122.4"
        height="11.52"
        rx="5.76"
        fill="#417DA0"
      />
      <mask id="path-7-inside-2_1364_1724" fill="white">
        <path d="M35.06 124.099C35.06 122.581 36.2908 121.35 37.8091 121.35H251.191C252.709 121.35 253.94 122.581 253.94 124.099V164.681C253.94 166.199 252.709 167.43 251.191 167.43H37.8091C36.2908 167.43 35.06 166.199 35.06 164.681V124.099Z" />
      </mask>
      <path
        d="M35.06 121.35H253.94H35.06ZM253.94 164.681C253.94 167.79 251.42 170.31 248.311 170.31H40.6891C37.5802 170.31 35.06 167.79 35.06 164.681V164.55C35.06 164.55 36.2908 164.55 37.8091 164.55H251.191C252.709 164.55 253.94 164.55 253.94 164.55V164.681ZM35.06 167.43V121.35V167.43ZM253.94 121.35V167.43V121.35Z"
        fill="#C0D6E4"
        mask="url(#path-7-inside-2_1364_1724)"
      />
      <path
        d="M51.1398 138.31L59.0598 146.23L66.9798 138.31"
        stroke="#417DA0"
        strokeWidth="2.88"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="83.62"
        y="136.87"
        width="136.8"
        height="11.52"
        rx="5.76"
        fill="#417DA0"
      />
      <path
        d="M51.1398 184.39L59.0598 192.31L66.9798 184.39"
        stroke="#417DA0"
        strokeWidth="2.88"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="83.62"
        y="182.95"
        width="109.44"
        height="11.52"
        rx="5.76"
        fill="#417DA0"
      />
    </svg>
  );
}

function CubeShape() {
  return (
    <svg
      width="817"
      height="289"
      viewBox="0 0 817 289"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={styles.thumbnailCube}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M778.342 -296.311C776.611 -298.043 773.803 -298.043 772.071 -296.311L533.962 -58.2022C532.231 -56.4706 532.231 -53.663 533.962 -51.9313L772.071 186.178C773.803 187.909 776.611 187.909 778.342 186.178L1016.45 -51.9313C1018.18 -53.6629 1018.18 -56.4705 1016.45 -58.2022L778.342 -296.311ZM775.207 -286.905L1007.04 -55.0667L775.207 176.771L543.369 -55.0668L775.207 -286.905Z"
        fill="#EEF6FC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M302.748 -62.907C301.572 -62.907 300.445 -62.4398 299.613 -61.6082L61.5029 176.502C60.2347 177.77 59.8554 179.677 60.5417 181.334C61.228 182.991 62.8449 184.072 64.6384 184.072L302.391 184.072C303.567 184.072 304.695 183.604 305.527 182.773L543.637 -55.3373C544.905 -56.6055 545.285 -58.5127 544.598 -60.1697C543.912 -61.8266 542.295 -62.907 540.502 -62.907L302.748 -62.907ZM304.585 -54.0386L529.797 -54.0386L300.555 175.203H75.3435L304.585 -54.0386Z"
        fill="#EEF6FC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.1787 173.097C69.447 171.365 66.6394 171.365 64.9078 173.097L-173.201 411.206C-174.933 412.938 -174.933 415.745 -173.201 417.477L64.9077 655.586C66.6394 657.318 69.447 657.318 71.1786 655.586L309.288 417.477C311.019 415.745 311.019 412.938 309.288 411.206L71.1787 173.097ZM68.0432 182.503L299.881 414.341L68.0432 646.18L-163.795 414.341L68.0432 182.503Z"
        fill="#EEF6FC"
      />
    </svg>
  );
}

export { KomponentIntro, KomponentLinks, DesignsystemetThumbnail };
