import { PortableText, type PortableTextBlock } from "next-sanity";
import {
  CustomPortableTextComponentsProps,
  customPortableTextComponents,
} from "./CustomPortableText.components";

type CustomPortableTextProps = {
  value: PortableTextBlock[];
  className?: string;
} & CustomPortableTextComponentsProps &
  React.HTMLAttributes<HTMLDivElement>;

function CustomPortableText({
  value,
  typoConfig,
  className,
  ...rest
}: CustomPortableTextProps) {
  return (
    <div className={className} {...rest}>
      <PortableText
        components={customPortableTextComponents({ typoConfig })}
        value={value ?? []}
      />
    </div>
  );
}

export { CustomPortableText };
