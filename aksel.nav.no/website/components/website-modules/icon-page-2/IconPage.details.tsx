import { useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import * as Icons from "@navikt/aksel-icons";
import meta from "@navikt/aksel-icons/metadata";
import {
  ActionMenu,
  BodyShort,
  Button,
  HStack,
  Heading,
  Modal,
  Tag,
  VStack,
} from "@navikt/ds-react";
import SnippetLazy from "@/cms/code-snippet/SnippetLazy";
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

function Details({
  iconName,
  inModal = false,
}: {
  iconName?: string;
  inModal?: boolean;
}) {
  const IconComponent = Icons[`${iconName}Icon`]; // eslint-disable-line import/namespace
  const metaData = useMemo(
    () => (iconName ? meta[iconName] : null),
    [iconName],
  );

  if (!IconComponent) {
    return null;
  }

  const svgString = ReactDOMServer.renderToString(<IconComponent />)
    .replaceAll("currentColor", "#000")
    .replaceAll("1em", "24");

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
          <Heading level="3" size="small">
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
          <div className="flex gap-px">
            <Button className="rounded-r-none">Kopier react</Button>
            <ActionMenu>
              <ActionMenu.Trigger>
                <Button
                  className="rounded-l-none"
                  icon={<Icons.ChevronDownIcon title="Meny" />}
                />
              </ActionMenu.Trigger>
              <ActionMenu.Content align="end">
                <ActionMenu.Item
                  onSelect={() => {
                    try {
                      navigator.clipboard.writeText(svgString);
                    } catch {
                      console.error("Unable to copy using Clipboard API");
                    }
                  }}
                >
                  Kopier SVG
                </ActionMenu.Item>
                <ActionMenu.Item
                  as="a"
                  href={URL.createObjectURL(
                    new Blob([svgString], {
                      type: "image/svg+xml",
                    }),
                  )}
                  download={iconName}
                >
                  Last ned SVG
                </ActionMenu.Item>
              </ActionMenu.Content>
            </ActionMenu>
          </div>
          <SnippetLazy
            node={{
              title: "TSX",
              code: {
                code: `import { ${iconName}Icon } from '@navikt/aksel-icons';`,
                language: "jsx",
              },
            }}
          />
        </div>
      </VStack>
    </div>
  );
}

function InitialView() {
  return (
    <div className={`${styles.iconDetails} p-5`}>
      <BodyShort spacing>
        Alle ikonene er tilgjengelige som React-komponenter
      </BodyShort>
      <SnippetLazy
        node={{
          title: "",
          code: {
            code: `yarn install @navikt/aksel-icons`,
            language: "bash",
          },
        }}
      />
      <SnippetLazy
        node={{
          title: "TSX",
          code: {
            code: `import { ChevronDownIcon, TrashIcon, FilterIcon } from "@navikt/aksel-icons";

function MyComponent () {
  return (
    <div>
      <ChevronDownIcon />
      <TrashIcon />
      <FilterIcon />
    </div>
  )
}`,
            language: "tsx",
          },
        }}
      />
    </div>
  );
}

function Feedback({ iconName }: { iconName?: string }) {
  const config = useMemo(() => {
    if (iconName) {
      return {
        title: "Har du innspill til ikonet?",
        href: `https://github.com/navikt/aksel/issues/new?labels=forespørsel+🥰&template=update-icon.yml&title=%5BInnspill+til+ikon%5D%3A+${iconName}`,
      };
    }
    return {
      title: "Har du innspill til ikonene?",
      href: "https://github.com/navikt/aksel/issues/new?labels=nytt+✨%2Cikoner+🖼%2Cforespørsel+🥰&template&template=new-icon.yaml&title=%5BNytt+ikon%5D%3A+",
    };
  }, [iconName]);

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
