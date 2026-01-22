import { Link } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { EditorPanel } from "@/app/_ui/editor-panel/EditorPanel";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";

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
    <EditorPanel variant="links" heading={title ?? undefined} headingTag="div">
      <WebsiteList as="ul">
        {lenker.map((pageLink) => (
          <WebsiteListItem key={pageLink._key} icon>
            <Link
              as={NextLink}
              href={getHref(pageLink)}
              data-umami-event="navigere"
              data-umami-event-kilde="relatert innhold"
              data-umami-event-url={getHref(pageLink)}
              variant="neutral"
            >
              {pageLink.title || "Mangler tittel"}
            </Link>
          </WebsiteListItem>
        ))}
      </WebsiteList>
    </EditorPanel>
  );
}

export { RelatertInnhold };
