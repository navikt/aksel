import { stegaClean } from "next-sanity";
import { BodyShort, Box, Heading } from "@navikt/ds-react";
import type { AkselColorRole } from "@navikt/ds-tokens/types";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { Code } from "../typography/Code";
import { PropsSeksjonCode } from "./PropsSeksjon.code";
import { PropsSeksjonDescription } from "./PropsSeksjon.decription";
import { PropsSeksjonDeprecation } from "./PropsSeksjon.deprecation";
import styles from "./PropsSeksjon.module.css";

type PropsSeksjonT = ExtractPortableComponentProps<"props_seksjon">;
type PropsSeksjonComponentT = NonNullable<
  PropsSeksjonT["value"]["komponenter"]
>[number];

function PropsSeksjon(props: ExtractPortableComponentProps<"props_seksjon">) {
  const { komponenter } = props.value;

  if (!komponenter || komponenter.length === 0) {
    return null;
  }

  return komponenter.map((prop) => (
    <PropTable component={prop} key={prop?._key} />
  ));
}

function PropTable({ component }: { component: PropsSeksjonComponentT }) {
  const { propref, title, overridable } = component;

  const propList =
    propref?.proplist
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
        level={stegaClean(component.heading_level) || "3"}
        className={styles.propsSeksjonHeader}
        id={component._key}
      >
        {title ?? "Props"}
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
  prop: NonNullable<
    NonNullable<PropsSeksjonComponentT["propref"]>["proplist"]
  >[0];
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

export { PropsSeksjon };
