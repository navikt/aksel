import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { KodeEksemplerNavigation } from "./KodeEksempler.navigation";
import { KodeEksemplerProvider } from "./KodeEksempler.provider";

function KodeEksempler(props: ExtractPortableComponentProps<"kode_eksempler">) {
  const { dir } = props.value;

  if (!dir?.filer || dir.filer.length === 0) {
    return null;
  }

  return (
    <KodeEksemplerProvider value={props.value}>
      <div data-block-margin="space-28">
        <KodeEksemplerNavigation value={props.value} />
      </div>
    </KodeEksemplerProvider>
  );
}

export { KodeEksempler };
