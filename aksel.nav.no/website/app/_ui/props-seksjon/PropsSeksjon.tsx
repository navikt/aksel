import { BodyShort, Box, Heading } from "@navikt/ds-react";
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
  const { komponenter, title } = props.value;

  if (!komponenter || komponenter.length === 0 || !title) {
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
  if (prop.deprecated) {
    return (
      <>
        <Box
          as="dt"
          paddingBlock="space-8 0"
          paddingInline="space-8"
          className="inline-block"
        >
          <Code as="h4" className="mr-2" strikethrough highlighted>{`${
            prop.name
          }${prop?.required ? "" : "?"}`}</Code>
        </Box>
        <BodyShort as="dd">
          <Box as="ul" overflowX="auto">
            <PropsSeksjonDeprecation text={prop.deprecated} />
            <PropsSeksjonCode code={prop.type} title="Type" wrap />
            <PropsSeksjonCode
              /* We assume that if type starts with ", its an union-type */
              code={
                (prop.type ?? "").startsWith('"') &&
                !prop.defaultValue?.startsWith('"')
                  ? `"${prop.defaultValue}"`
                  : prop.defaultValue
              }
              title="Default"
              wrap
            />
            <PropsSeksjonDescription
              description={prop.description}
              params={prop.params}
            />
            <PropsSeksjonCode code={prop.example} title="Example" />
          </Box>
        </BodyShort>
      </>
    );
  }
  return (
    <>
      <Box as="dt" paddingBlock="space-8 0" paddingInline="space-8">
        <Code as="h4" highlighted>{`${prop.name}${
          prop?.required ? "" : "?"
        }`}</Code>
      </Box>
      <BodyShort as="dd">
        <Box as="ul" overflowX="auto">
          <PropsSeksjonCode code={prop.type} title="Type" wrap />
          <PropsSeksjonCode
            /* We assume that if type starts with ", its an union-type */
            code={
              (prop.type ?? "").startsWith('"')
                ? `"${prop.defaultValue}"`
                : prop.defaultValue
            }
            title="Default"
            wrap
          />
          <PropsSeksjonDescription
            description={prop.description}
            params={prop.params}
          />
          <PropsSeksjonCode code={prop.example} title="Example" />
        </Box>
      </BodyShort>
    </>
  );
};

export { PropsSeksjon };
