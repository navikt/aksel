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

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default async (props: Props) => {
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
          className={logEntry.fremhevet && "text-[--aksel-brand-pink-900]"}
        >
          {capitalizeFirstLetter(logEntry.endringstype)}
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
            <Tag
              size="xsmall"
              variant="neutral-filled"
              style={{
                borderRadius: "var(--ax-radius-4)",
                backgroundColor: "var(--aksel-brand-pink-700)",
              }}
            >
              Fremhevet
            </Tag>
          )}
        </HStack>
        {logEntry.fremhevet && logEntry.herobilde && (
          <Image
            data-block-margin="space-28"
            className={
              styles.herobilde +
              (logEntry.fremhevet && logEntry.bakgrunnsfarge
                ? ` bg-[${logEntry.bakgrunnsfarge}]`
                : "")
            }
            style={{
              "--herobilde-bg-color-first":
                logEntry.herobilde.bakgrunnsfarge ||
                "var(--aksel-brand-pink-400)",
              "--herobilde-bg-color-last":
                logEntry.herobilde.bakgrunnsfarge ||
                "var(--aksel-brand-pink-700)",
              "--herobilde-bg-degrees": "130deg",
            }}
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
};
