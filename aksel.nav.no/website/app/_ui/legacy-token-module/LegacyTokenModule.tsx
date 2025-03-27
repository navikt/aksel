import { ExtractPortableComponentProps } from "@/app/_sanity/types";

function LegacyTokenModule(
  props: ExtractPortableComponentProps<"spesial_seksjon">,
) {
  const { modul } = props.value;

  if (!modul) {
    return null;
  }

  if (modul !== "token_kategori") {
    return null;
  }

  return <div data-block-margin="space-28">123</div>;
}

export { LegacyTokenModule };
