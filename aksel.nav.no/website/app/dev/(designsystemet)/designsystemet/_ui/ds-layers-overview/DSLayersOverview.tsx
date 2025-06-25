import NextLink from "next/link";
import {
  ComponentIcon,
  Density2Icon,
  SidebarLeftIcon,
  TokenIcon,
} from "@navikt/aksel-icons";
import {
  BodyLong,
  BoxNew,
  Heading,
  Link,
  List,
  VStack,
} from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";
import { DS_FRONT_PAGE_QUERYResult } from "@/app/_sanity/query-types";
import "./DSLayersOverview.css";

type DSLayersOverview = NonNullable<
  NonNullable<DS_FRONT_PAGE_QUERYResult>["ds_layers_overview"]
>;

type Props = {
  title: DSLayersOverview["title"];
  description: DSLayersOverview["ingress"];
};

const DottedLine = () => (
  <div className="aksel__ds-frontpage__dotted-line" aria-hidden="true" />
);

const DSLayersOverview = ({ title, description }: Props) => (
  <BoxNew
    background="brand-blue-soft"
    borderColor="brand-blue-subtle"
    borderWidth="1"
    borderRadius="xlarge"
    padding={{ xs: "space-16", md: "space-40" }}
    width="100%"
  >
    <VStack gap="space-24" align="center">
      <VStack align="center" gap="space-16" maxWidth="400px">
        {title && (
          <Heading level="2" size="large">
            {title}
          </Heading>
        )}
        {description && (
          <BodyLong size="large" as="p" align="center">
            {description}
          </BodyLong>
        )}
      </VStack>
      <BoxNew
        paddingBlock="space-24 0"
        maxWidth="600px"
        width="100%"
        paddingInline={{ xs: "0", md: "0 space-32" }}
      >
        <List className="aksel-layers-list">
          <ListItem icon={<SidebarLeftIcon fontSize="24" aria-hidden="true" />}>
            <Link as={NextLink} href="/dev/monster-maler" variant="neutral">
              Mønster og maler
              <DottedLine />
            </Link>
          </ListItem>
          <ListItem icon={<ComponentIcon fontSize="24" aria-hidden="true" />}>
            <div className="link-group">
              <Link
                as={NextLink}
                href="/dev/komponenter/core"
                variant="neutral"
              >
                Komponenter
              </Link>{" "}
              og{" "}
              <Link
                as={NextLink}
                href="/dev/komponenter/ikoner"
                variant="neutral"
              >
                ikoner
                <DottedLine />
              </Link>
            </div>
          </ListItem>
          <ListItem icon={<Density2Icon fontSize="24" aria-hidden="true" />}>
            <Link
              as={NextLink}
              href="/dev/komponenter/primitives"
              variant="neutral"
            >
              Layout primitives
              <DottedLine />
            </Link>
          </ListItem>
          <ListItem icon={<TokenIcon fontSize="24" aria-hidden="true" />}>
            <Link
              as={NextLink}
              href="/dev/grunnleggende/darkside/design-tokens"
              variant="neutral"
            >
              Design tokens
              <DottedLine />
            </Link>
          </ListItem>
        </List>
      </BoxNew>
    </VStack>
  </BoxNew>
);

export default DSLayersOverview;
