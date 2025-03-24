import { BodyShort, Box, Heading } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { Code } from "../typography/Code";
import { PropsSeksjonCode } from "./PropsSeksjon.code";
import { PropsSeksjonDescription } from "./PropsSeksjon.decription";
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
    propref?.proplist?.filter(
      (prop) => !prop.description?.includes("@private"),
    ) ?? [];

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
            <Box as="dt" paddingBlock="space-8 0" paddingInline="space-8">
              <Code as="h4" highlighted>{`${prop.name}${
                prop?.required ? "" : "?"
              }`}</Code>
            </Box>
            <BodyShort as="dd">
              <Box as="ul" overflowX="auto">
                <PropsSeksjonCode code={prop.type} title="Type" wrap />
                <PropsSeksjonCode
                  code={prop.defaultValue}
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
          </div>
        ))}
      </dl>
    </div>
  );
}

export { PropsSeksjon };
