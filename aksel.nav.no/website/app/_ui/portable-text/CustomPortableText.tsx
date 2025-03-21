import { PortableText, type PortableTextBlock } from "next-sanity";
import { useMemo } from "react";
import {
  CustomPortableTextComponentsProps,
  customPortableTextComponents,
} from "./CustomPortableText.components";

type CustomPortableTextProps = {
  value: PortableTextBlock[];
  lang?: string;
  className?: string;
} & CustomPortableTextComponentsProps;

function CustomPortableText({
  value,
  typoConfig,
  className,
  lang,
}: CustomPortableTextProps) {
  const customComponents = useMemo(
    () => customPortableTextComponents({ typoConfig }),
    [typoConfig],
  );

  return (
    <div className={className} lang={lang}>
      <PortableText components={customComponents} value={value ?? []} />
    </div>
  );
}

export { CustomPortableText };
