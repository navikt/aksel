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
  Tag,
  VStack,
} from "@navikt/ds-react";
import SnippetLazy from "@/cms/code-snippet/SnippetLazy";
import styles from "./IconPage.module.css";

function IconPageDetails({ iconName }: { iconName?: string }) {
  return (
    <div>
      {iconName ? <Details iconName={iconName} /> : <InitialView />}
      <Feedback />
    </div>
  );
}

function Details({ iconName }: { iconName?: string }) {
  const T = Icons[`${iconName}Icon`]; // eslint-disable-line import/namespace
  const metaData = useMemo(() => {
    if (!iconName) {
      return null;
    }
    const iconMeta = meta[iconName];
    if (!iconMeta) {
      return null;
    }

    return iconMeta;
  }, [iconName]);

  if (T === undefined) {
    return null;
  }

  const svgString = ReactDOMServer.renderToString(<T />)
    .replaceAll("currentColor", "#000")
    .replaceAll("1em", "24");

  return (
    <div className={styles.iconDetails}>
      <div className={styles.iconDetailsShowcase}>
        <T fontSize="2rem" />
      </div>
      <VStack gap="space-24" className={styles.iconDetailsContent}>
        <div>
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
        </div>
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
      </VStack>
      <div className=""></div>
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
    <div className="mt-12">
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
