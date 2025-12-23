"use client";

import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import { BodyShort, Heading, VStack } from "@navikt/ds-react";
import { CodeBlock } from "@/app/_ui/code-block/CodeBlock";
import { CodeBlockTabsT } from "@/app/_ui/code-block/CodeBlock.provider";
import { IconPageIconDetails } from "./IconPage.icondetails";
import styles from "./IconPage.module.css";

function IconDetails({
  iconName,
  iconSvg,
}: {
  iconName?: keyof typeof meta;
  iconSvg?: string;
}) {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: We do not know which icon will be rendered at build time
  const IconComponent = Icons[`${iconName}Icon`]; // eslint-disable-line import/namespace
  const metaData = iconName ? meta[iconName] : null;

  if (!IconComponent) {
    return null;
  }

  return (
    <IconPageIconDetails
      metaData={metaData}
      iconComponent={IconComponent}
      iconName={iconName}
      iconSvg={iconSvg}
    />
  );
}

function IntroInformation() {
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
    <div className={styles.iconDetails}>
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

export { IconDetails, IntroInformation };
