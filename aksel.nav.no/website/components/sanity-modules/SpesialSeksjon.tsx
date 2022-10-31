import React from "react";
import { withErrorBoundary } from "@/error-boundary";
import ComponentOverview from "./component-overview";
import { ColorCategory } from "./color-category";
import dynamic from "next/dynamic";

const IconSearch = dynamic(() => import("./icon-search"), {
  loading: () => <div className="h-screen w-full" />,
  ssr: false,
});

type SpesialT = {
  _key: string;
  _type: "spesial_seksjon";
  modul?: "farge_kategori" | "ikonsok" | "endringslogg" | "komponentoversikt";
  logs?: any[];
  komponenter?: any;
  farge?: any;
};

const SpesialSeksjon = ({ node }: { node: SpesialT }): JSX.Element => {
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
      default:
        return null;
    }
  };

  return <div className="mb-16">{GetModule()}</div>;
};

export default withErrorBoundary(SpesialSeksjon, "SpesialSeksjon");
