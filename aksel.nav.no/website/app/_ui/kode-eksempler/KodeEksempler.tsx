import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { KodeEksemplerIFrame } from "./KodeEksempler.iframe";
import { KodeEksemplerNavigation } from "./KodeEksempler.navigation";
import { KodeEksemplerProvider } from "./KodeEksempler.provider";

function KodeEksempler(props: ExtractPortableComponentProps<"kode_eksempler">) {
  const { dir, compact } = props.value;

  if (!dir?.filer || dir.filer.length === 0) {
    return null;
  }

  return (
    <div data-block-margin="space-28">
      <KodeEksemplerProvider value={props.value}>
        <KodeEksemplerNavigation value={props.value} />
        <KodeEksemplerIFrame dir={dir} compact={compact} />
      </KodeEksemplerProvider>
    </div>
  );
}

export { KodeEksempler };
