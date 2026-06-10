import { format } from "date-fns/format";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { FileIcon } from "@navikt/aksel-icons";
import {
  BodyShort,
  Box,
  Dialog,
  HStack,
  Heading,
  InfoCard,
  List,
} from "@navikt/ds-react";
import { DialogBody, DialogHeader, DialogPopup } from "@navikt/ds-react/Dialog";
import {
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import { ListItem } from "@navikt/ds-react/List";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GP_CHANGELOGS_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { UmamiLink } from "@/app/_ui/umami/UmamiLink";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const [{ data: pageData }] = await Promise.all([
    sanityFetch({
      query: GP_CHANGELOGS_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
    }),
  ]);

  if (!pageData?.heading || !pageData._id) {
    notFound();
  }

  const changelogFor =
    pageData.artikler?.filter(
      (article) => !!article.slug && !!article.heading,
    ) ?? [];

  return (
    <Dialog defaultOpen>
      <DialogPopup width="large">
        <DialogHeader>
          <BodyShort textColor="subtle" data-color="brand-blue" size="small">
            Endringslogg
          </BodyShort>

          <Heading level="1" size="xlarge" data-aksel-heading-color>
            {pageData.heading}
          </Heading>
          <HStack gap="space-8" align="center">
            <BodyShort size="small" data-color="neutral" textColor="subtle">
              God praksis
            </BodyShort>
            <BodyShort
              as="span"
              aria-hidden
              data-color="neutral"
              textColor="subtle"
            >
              •
            </BodyShort>
            <BodyShort size="small" textColor="subtle" data-color="neutral">
              {format(new Date(pageData.endringsdato || ""), "d. MMMM yyy", {
                locale: nb,
              })}
            </BodyShort>
          </HStack>
        </DialogHeader>
        <DialogBody>
          <article>
            {changelogFor.length > 0 && (
              <InfoCard data-color="brand-blue">
                <InfoCardHeader icon={<FileIcon aria-hidden />}>
                  <InfoCardTitle>{`${changelogFor.length > 1 ? "Sider" : "Side"} som er endret`}</InfoCardTitle>
                </InfoCardHeader>
                <InfoCardContent>
                  <List>
                    {changelogFor.map((artikkel) => (
                      <ListItem key={artikkel.slug}>
                        <UmamiLink
                          href={`/${artikkel.slug!}`}
                          lenkegruppe="endringslogg-backlink"
                        >
                          {artikkel.heading}
                        </UmamiLink>
                      </ListItem>
                    ))}
                  </List>
                </InfoCardContent>
              </InfoCard>
            )}
            <Box marginBlock="space-48">
              <CustomPortableText
                value={(pageData.content ?? []) as PortableTextBlock[]}
              />
            </Box>
          </article>
        </DialogBody>
      </DialogPopup>
    </Dialog>
  );
}
