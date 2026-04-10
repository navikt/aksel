"use client";

import { useEffect, useState } from "react";
import * as Icons from "@navikt/aksel-icons";
import { AirplaneIcon } from "@navikt/aksel-icons";
import type { AkselIcon } from "@navikt/aksel-icons/metadata";
import {
  BodyShort,
  Button,
  Dialog,
  HStack,
  Heading,
  Tag,
} from "@navikt/ds-react";
import { CodeBlock } from "@/app/_ui/code-block/CodeBlock";
import { CodeBlockTabsT } from "@/app/_ui/code-block/CodeBlock.provider";
import styles from "./IconPage.module.css";
import { useIconPage } from "./IconPage.provider";

function IconPageIconDetails({
  iconName,
  metaData,
  iconComponent: IconComponent,
  iconSvg,
}: {
  iconName?: string;
  metaData: AkselIcon | null;
  iconComponent?: typeof AirplaneIcon;
  iconSvg?: string;
}) {
  const { hideDialog } = useIconPage();
  const isDialog = !hideDialog;

  const [downloadLink, setDownloadLink] = useState<string>();

  useEffect(() => {
    if (!iconSvg) {
      return;
    }
    const url = URL.createObjectURL(
      new Blob([iconSvg], {
        type: "image/svg+xml",
      }),
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDownloadLink(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [iconSvg]);

  if (!IconComponent) {
    return null;
  }

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

  const dedupedKeywords = new Set(metaData?.keywords ?? []);

  const dialogActions = (
    <>
      <HStack gap="space-8">
        {iconSvg && (
          <Button as="a" href={downloadLink} download={`${iconName}.svg`}>
            Last ned SVG
          </Button>
        )}
        <Button
          variant="secondary"
          as="a"
          href={`https://github.com/navikt/aksel/issues/new?labels=forespørsel+🥰&template=update-icon.yml&title=%5BInnspill+til+ikon%5D%3A+${iconName}`}
          target="_blank"
          rel="noreferrer noopener"
          icon={<Icons.BugIcon aria-hidden />}
        >
          Meld fra bug
        </Button>
      </HStack>

      <CodeBlock
        key={`${iconName}-import`}
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
        key={`${iconName}-usage`}
        showLineNumbers={false}
        tabs={codeTabs}
        defaultWrap={false}
      />
    </>
  );

  return (
    <div className={styles.iconDetails} data-inline data-dialog={isDialog}>
      <div className={styles.iconDetailsShowcase}>
        <IconComponent fontSize="2.5rem" />
      </div>
      <div className={styles.iconDetailsContent}>
        {isDialog ? (
          <Dialog.Header>
            <Dialog.Title>{iconName}</Dialog.Title>
          </Dialog.Header>
        ) : (
          <div>
            <Heading level="2" size="small">
              {iconName}
            </Heading>
            <HStack gap="space-2">
              <Icons.ArrowDownRightIcon fontSize="1.5rem" aria-hidden />
              <BodyShort>{metaData?.sub_category}</BodyShort>
            </HStack>
            <HStack gap="space-8" marginBlock="space-12" as="ul">
              {[...dedupedKeywords.keys()].map((keyword) => (
                <li key={keyword}>
                  <Tag size="small" variant="neutral-moderate">
                    {keyword}
                  </Tag>
                </li>
              ))}
            </HStack>
          </div>
        )}
        {isDialog ? (
          <Dialog.Body>{dialogActions}</Dialog.Body>
        ) : (
          <div>{dialogActions}</div>
        )}
      </div>
    </div>
  );
}

export { IconPageIconDetails };
