import { Suspense } from "react";
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
      <Suspense>
        <KodeEksemplerProvider value={props.value} compact={compact}>
          <KodeEksemplerNavigation value={props.value} />
          <KodeEksemplerIFrame dir={dir} />
        </KodeEksemplerProvider>
      </Suspense>
    </div>
  );
}

export { KodeEksempler };
