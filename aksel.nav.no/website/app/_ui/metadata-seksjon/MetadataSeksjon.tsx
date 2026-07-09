import { BodyShort, Box, Heading } from "@navikt/ds-react";
import type { AkselColorRole } from "@navikt/ds-tokens/types";
import type { KOMPONENT_BY_SLUG_QUERY_RESULT } from "@/app/_sanity/query-types";
import headingStyles from "../portable-text/CustomPortableText.module.css";
import { PropsSeksjonCode } from "../props-seksjon/PropsSeksjon.code";
import { PropsSeksjonDescription } from "../props-seksjon/PropsSeksjon.decription";
import { PropsSeksjonDeprecation } from "../props-seksjon/PropsSeksjon.deprecation";
import styles from "../props-seksjon/PropsSeksjon.module.css";
import { Code } from "../typography/Code";

type ComponentMetadata =
  NonNullable<KOMPONENT_BY_SLUG_QUERY_RESULT>["component_metadata"];

type ComponentMetadataEnties =
  | NonNullable<ComponentMetadata>["components"]
  | NonNullable<ComponentMetadata>["utils"];
type ComponentMetadataEntry = NonNullable<ComponentMetadataEnties>[number];

function MetadataSeksjon({ metadata }: { metadata: ComponentMetadata }) {
  if (!metadata) {
    return null;
  }

  return (
    <div data-block-margin="space-28">
      <Heading
        className={headingStyles.headingElement}
        tabIndex={-1}
        level="2"
        size="large"
        data-level="2"
        data-text-prose
        data-outside-block
        id="metadata-props"
      >
        Props
      </Heading>
      <PropsSeksjon entries={metadata.components} />
      <PropsSeksjon entries={metadata.utils} />
    </div>
  );
}

function PropsSeksjon({ entries }: { entries: ComponentMetadataEnties }) {
  if (!entries || entries.length === 0) {
    return null;
  }

  return entries.map((entry) => <PropTable entry={entry} key={entry?._key} />);
}

function PropTable({ entry }: { entry: ComponentMetadataEntry }) {
  const { overridable, displayname, props } = entry;

  const propList =
    props
      ?.filter((prop) => !prop.description?.includes("@private"))
      .sort((prop_a, prop_b) => {
        let comparator_value = 0;

        if ("deprecated" in prop_a) {
          comparator_value += 1;
        }
        if ("deprecated" in prop_b) {
          comparator_value -= 1;
        }
        return comparator_value;
      }) ?? [];

  if (overridable) {
    propList.push({
      description: "OverridableComponent-api",
      required: false,
      name: "as",
      type: "React.ElementType",
      _type: "prop",
      _key: "overridable",
      unpackedType: null,
    });
  }

  if (propList.length === 0) {
    return null;
  }

  return (
    <div lang="en" data-block-margin="space-28" className={styles.propsSeksjon}>
      <Heading
        size="xsmall"
        level="3"
        className={styles.propsSeksjonHeader}
        id={entry._key}
      >
        {displayname}
      </Heading>
      <dl>
        {propList.map((prop) => (
          <div className={styles.propsSeksjonRow} key={prop.name}>
            <PropEntry prop={prop} />
          </div>
        ))}
      </dl>
    </div>
  );
}

const PropEntry = ({
  prop,
}: {
  prop: NonNullable<NonNullable<ComponentMetadataEntry["props"]>>[0];
}) => {
  const type = prop.type === "AkselColor" ? unpackedAkselColorType : prop.type;

  return (
    <>
      <Box as="dt" paddingBlock="space-8 space-0" paddingInline="space-8">
        <Code
          as="h4"
          highlighted
          strikethrough={!!prop.deprecated}
        >{`${prop.name}${prop?.required ? "" : "?"}`}</Code>
      </Box>
      <BodyShort as="dd">
        <Box as="ul" overflowX="auto">
          {prop.deprecated && (
            <PropsSeksjonDeprecation text={prop.deprecated} />
          )}
          <PropsSeksjonCode code={type} title="Type" wrap />
          <PropsSeksjonCode
            /* We assume that if type starts with ", its an union-type */
            code={prop.defaultValue}
            title="Default"
            wrap
          />
          <PropsSeksjonDescription
            description={prop.description}
            params={prop.params}
            returnVal={prop.return}
          />
          <PropsSeksjonCode code={prop.example} title="Example" />
        </Box>
      </BodyShort>
    </>
  );
};

const colors: Record<AkselColorRole, boolean> = {
  accent: true,
  neutral: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  "meta-purple": true,
  "meta-lime": true,
  "brand-beige": true,
  "brand-blue": true,
  "brand-magenta": true,
};

const unpackedAkselColorType = Object.keys(colors)
  .map((key) => `"${key}"`)
  .join(" | ");

export { MetadataSeksjon };
