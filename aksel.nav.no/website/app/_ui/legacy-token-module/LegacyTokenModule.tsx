import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { TokenView } from "./token-view/TokenView";

function LegacyTokenModule(
  props: ExtractPortableComponentProps<"spesial_seksjon">,
) {
  const { modul, token } = props.value;

  if (!modul || !token || modul !== "token_kategori") {
    return null;
  }

  return (
    <div data-block-margin="space-28">
      <TokenView token={token} />
    </div>
  );
}

export { LegacyTokenModule };
