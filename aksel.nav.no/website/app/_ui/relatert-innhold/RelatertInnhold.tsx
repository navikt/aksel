import NextLink from "next/link";
import { LinkIcon } from "@navikt/aksel-icons";
import { HStack, Heading, Link } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { List, ListItem } from "../typography/List";
import styles from "./RelatertInnhold.module.css";

function RelatertInnhold(
  props: ExtractPortableComponentProps<"relatert_innhold">,
) {
  const { lenker, title } = props.value;

  if (!lenker || lenker?.length === 0) {
    return null;
  }

  const getHref = (pageLink: (typeof lenker)[number]): string => {
    let link = "#";
    if (pageLink?.intern && pageLink.intern_lenke) {
      link = `/${pageLink.intern_lenke}`;
    } else if (pageLink.ekstern_link) {
      link = pageLink.ekstern_link;
    }

    return link;
  };

  return (
    <div
      className={styles.relatertInnhold}
      data-block-margin="space-28"
      data-color-role="neutral"
    >
      <HStack gap="space-8" align="center" marginBlock="0 space-4">
        <LinkIcon fontSize="1.5rem" title="Lenker" aria-hidden />
        <Heading size="small" as="p">
          {title || "Relevante lenker"}
        </Heading>
      </HStack>
      <List as="ul">
        {lenker.map((pageLink) => (
          <ListItem key={pageLink._key} icon>
            <Link
              as={NextLink}
              href={getHref(pageLink)}
              data-umami-event="navigere"
              data-umami-event-kilde="relatert innhold"
              variant="neutral"
            >
              {pageLink.title || "Mangler tittel"}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export { RelatertInnhold };
