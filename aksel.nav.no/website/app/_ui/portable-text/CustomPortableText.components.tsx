import { type PortableTextComponents } from "next-sanity";

type CustomPortableTextComponentsProps = {
  typoConfig?: {
    size?: "small" | "medium" | "large";
    type: "short" | "long";
  };
};

function customPortableTextComponents(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: CustomPortableTextComponentsProps,
): PortableTextComponents {
  return {};
}

export { customPortableTextComponents };
export type { CustomPortableTextComponentsProps };
