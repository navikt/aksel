import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import {
  BodyShort,
  Button,
  HStack,
  Heading,
  Modal,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { CodeBlock } from "@/app/_ui/code-block/CodeBlock";
import { CodeBlockTabsT } from "@/app/_ui/code-block/CodeBlock.provider";
import { IconPageDownloadButton } from "@/app/dev/(designsystemet)/_ui/icon-page/IconPage.button";
import styles from "./IconPage.module.css";

function IconPageDetails({
  iconName,
  inModal = false,
}: {
  iconName?: string;
  inModal?: boolean;
}) {
  return (
    <div>
      {iconName ? (
        <Details iconName={iconName} inModal={inModal} />
      ) : (
        <InitialView />
      )}
      <Feedback iconName={iconName} />
    </div>
  );
}

async function Details({
  iconName,
  inModal = false,
}: {
  iconName?: string;
  inModal?: boolean;
}) {
  const IconComponent = Icons[`${iconName}Icon`]; // eslint-disable-line import/namespace
  const metaData = iconName ? meta[iconName] : null;

  if (!IconComponent) {
    return null;
  }

  const iconUrl = `https://raw.githubusercontent.com/navikt/aksel/main/%40navikt/aksel-icons/icons/${iconName}.svg`;

  const iconSvg = await fetch(iconUrl)
    .then((r) => r.text())
    .catch(() => null);

  const codeTabs: CodeBlockTabsT = [
    {
      code: `<${iconName}Icon title="a11y-title" fontSize="1.5rem" />`,
      lang: "tsx",
      text: "React",
      value: "react",
    },
  ];

  if (iconSvg) {
    codeTabs.push({
      code: iconSvg,
      lang: "tsx",
      text: "SVG",
      value: "svg",
    });
  }

  const HeaderComponent = inModal ? Modal.Header : "div";

  return (
    <div className={styles.iconDetails}>
      {!inModal && (
        <div className={styles.iconDetailsShowcase}>
          <IconComponent fontSize="2rem" />
        </div>
      )}
      <VStack gap="space-24" className={styles.iconDetailsContent}>
        <HeaderComponent>
          {inModal && (
            <IconComponent aria-hidden fontSize="2rem" className="mb-2" />
          )}
          <Heading level="2" size="small">
            {iconName}
          </Heading>
          <div className="flex items-center gap-0.5">
            <Icons.ArrowDownRightIcon fontSize="1.5rem" aria-hidden />
            <BodyShort>{metaData?.sub_category}</BodyShort>
          </div>
          <HStack gap="space-8" marginBlock="space-12 0">
            {metaData?.keywords.map((keyword) => (
              <Tag size="small" variant="neutral-moderate" key={keyword}>
                {keyword}
              </Tag>
            ))}
          </HStack>
        </HeaderComponent>
        <div className={styles.iconDetailsActions}>
          <IconPageDownloadButton fileName={`${iconName}.svg`} data={iconSvg}>
            Last ned SVG
          </IconPageDownloadButton>
          <CodeBlock
            showLineNumbers={false}
            tabs={[
              {
                code: `import { ${iconName}Icon } from '@navikt/aksel-icons';`,
                lang: "tsx",
                text: "import",
                value: "import",
              },
            ]}
          />

          <CodeBlock
            showLineNumbers={false}
            tabs={codeTabs}
            defaultWrap={false}
          />
        </div>
      </VStack>
    </div>
  );
}

function InitialView() {
  const installTabs: CodeBlockTabsT = [
    {
      code: "npm install @navikt/aksel-icons",
      lang: "markdown",
      text: "npm",
      value: "npm",
    },
    {
      code: "yarn add @navikt/aksel-icons",
      lang: "markdown",
      text: "Yarn",
      value: "yarn",
    },
  ];

  return (
    <div className={`${styles.iconDetails} p-5`}>
      <Heading level="2" size="small" spacing>
        React komponenter
      </Heading>
      <VStack gap="space-24">
        <div>
          <BodyShort spacing>
            Alle ikonene er tilgjengelige som egne React-komponenter.
          </BodyShort>
          <CodeBlock
            showLineNumbers={false}
            tabs={installTabs}
            data-block-margin="space-0"
          />
        </div>
        <div>
          <BodyShort spacing>Bruk ikonene i React-prosjektet ditt:</BodyShort>
          <CodeBlock
            data-block-margin="space-0"
            tabs={[
              {
                code: `import { ChevronDownIcon, TrashIcon, FilterIcon } from "@navikt/aksel-icons";

function MyComponent () {
  return (
    <div>
      <FilterIcon />
      <TrashIcon aria-hidden />
      <ChevronDownIcon
        title="Åpne panel"
      />
    </div>
  )
}`,
                lang: "tsx",
                text: "React",
                value: "react",
              },
            ]}
          />
        </div>
      </VStack>
    </div>
  );
}

function Feedback({ iconName }: { iconName?: string }) {
  let config = {
    title: "Har du innspill til ikonene?",
    href: "https://github.com/navikt/aksel/issues/new?labels=nytt+✨%2Cikoner+🖼%2Cforespørsel+🥰&template&template=new-icon.yaml&title=%5BNytt+ikon%5D%3A+",
  };

  if (iconName) {
    config = {
      title: "Har du innspill til ikonet?",
      href: `https://github.com/navikt/aksel/issues/new?labels=forespørsel+🥰&template=update-icon.yml&title=%5BInnspill+til+ikon%5D%3A+${iconName}`,
    };
  }

  return (
    <div className={styles.iconFeedback}>
      <BodyShort spacing>{config.title}</BodyShort>
      <Button
        variant="secondary"
        as="a"
        href={config.href}
        className="w-fit"
        target="_blank"
        rel="noreferrer noopener"
      >
        Send innspill
      </Button>
    </div>
  );
}

export { IconPageDetails };
