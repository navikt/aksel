import React from "react";
import { withErrorBoundary } from "@/error-boundary";
import ComponentOverview from "./component-overview";
import { ColorCategory } from "./color-category";
import dynamic from "next/dynamic";
import TokenView from "./token-view";

const IconSearch = dynamic(() => import("./icon-search"), {
  loading: () => <div className="h-screen w-full" />,
  ssr: false,
});

type SpesialT = {
  _key: string;
  _type: "spesial_seksjon";
  modul?:
    | "farge_kategori"
    | "ikonsok"
    | "endringslogg"
    | "komponentoversikt"
    | "tokens_font"
    | "tokens_global-color"
    | "tokens_semantic-color"
    | "tokens_radius"
    | "tokens_shadow"
    | "tokens_spacing"
    | "tokens_z-index";
  logs?: any[];
  komponenter?: any;
  farge?: any;
};

const SideModul = ({ node }: { node: SpesialT }): JSX.Element => {
  if (!node || !node.modul) {
    return null;
  }

  const GetModule = () => {
    switch (node.modul) {
      case "farge_kategori":
        return <ColorCategory node={node.farge} />;
      case "komponentoversikt":
        return <ComponentOverview node={node.komponenter} />;
      case "ikonsok":
        return <IconSearch />;
      default: {
        if (node.modul.startsWith("tokens_")) {
          return <TokenView cat={node.modul.replace("tokens_", "")} />;
        }
        return null;
      }
    }
  };

  return <div className="mb-16">{GetModule()}</div>;
};

export default withErrorBoundary(SideModul, "SideModul");
