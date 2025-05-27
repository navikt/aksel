import { PortableTextBlock, defineQuery } from "next-sanity";
import Image from "next/image";
import { BodyShort, HStack, Heading, Tag, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { urlForImage } from "@/app/_sanity/utils";
import { DesignsystemetPageLayout } from "../../../_ui/DesignsystemetPage";
import TokenTableOfContents from "../../darkside/design-tokens/_ui/TokenTableOfContents";
import styles from "../_ui/Changelog.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function (props: Props) {
  const { slug } = await props.params;
  const logEntry = (
    await sanityFetch({
      query: defineQuery(
        `*[_type == "ds_endringslogg_artikkel" && slug.current == $slug]{heading, "slug": slug.current, endringsdato, endringstype, fremhevet, herobilde, innhold}`,
      ),
      params: { slug: `${slug}` },
    })
  ).data[0];

  return (
    <DesignsystemetPageLayout layout="with-toc">
      <VStack>
        <BodyShort
          size="medium"
          className={
            logEntry.fremhevet ? styles["kategori-fremhevet"] : styles.kategori
          }
        >
          {logEntry.endringstype}
        </BodyShort>
        <Heading
          size="xlarge"
          level="1"
          spacing
          className={logEntry.fremhevet && "text-[--aksel-brand-pink-1000]"}
        >
          {logEntry.heading}
        </Heading>
        <HStack gap="space-16" marginBlock="space-0 space-28">
          <BodyShort
            size="small"
            className={logEntry.fremhevet && "text-[--aksel-brand-pink-900]"}
          >
            {new Date(logEntry.endringsdato).toLocaleDateString("NO", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </BodyShort>
          {logEntry.fremhevet && (
            <Tag size="xsmall" variant="neutral-filled" className={styles.tag}>
              Fremhevet
            </Tag>
          )}
        </HStack>
        {logEntry.fremhevet && logEntry.herobilde && (
          <Image
            data-block-margin="space-28"
            className={styles.herobilde}
            // style={{
            //   backgroundColor:
            //     logEntry.fremhevet && logEntry.herobilde?.bakgrunnsfarge
            //       ? logEntry.herobilde.bakgrunnsfarge
            //       : "",
            //   "--herobilde-bg-color-first":
            //     logEntry.herobilde.bakgrunnsfarge ||
            //     "var(--aksel-brand-pink-400)",
            //   "--herobilde-bg-color-last":
            //     logEntry.herobilde.bakgrunnsfarge ||
            //     "var(--aksel-brand-pink-700)",
            //   "--herobilde-bg-degrees": "130deg",
            // }}
            alt={logEntry.herobilde.alt}
            loading="lazy"
            decoding="async"
            src={urlForImage(logEntry.herobilde)?.auto("format").url() || ""}
            width={1200}
            height={630}
          />
        )}
        <CustomPortableText value={logEntry.innhold as PortableTextBlock[]} />
      </VStack>
      <TokenTableOfContents />
    </DesignsystemetPageLayout>
  );
}
