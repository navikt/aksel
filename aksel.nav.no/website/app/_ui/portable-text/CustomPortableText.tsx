import { PortableText, type PortableTextBlock } from "next-sanity";
import { useMemo } from "react";
import {
  CustomPortableTextComponentsProps,
  customPortableTextComponents,
} from "./CustomPortableText.components";

type CustomPortableTextProps = {
  value: PortableTextBlock[];
} & CustomPortableTextComponentsProps;

function CustomPortableText({ value, typoConfig }: CustomPortableTextProps) {
  const customComponents = useMemo(
    () => customPortableTextComponents({ typoConfig }),
    [typoConfig],
  );

  return <PortableText components={customComponents} value={value ?? []} />;
}

export { CustomPortableText };
