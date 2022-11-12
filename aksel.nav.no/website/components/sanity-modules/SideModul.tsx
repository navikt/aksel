import React from "react";
import { withErrorBoundary } from "@/error-boundary";
import ComponentOverview from "./component-overview";
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
    | "token_kategori";
  logs?: any[];
  komponenter?: any;
  farge?: any;
  token?: { title: string; kategori: string };
};

const SideModul = ({ node }: { node: SpesialT }): JSX.Element => {
  if (!node || !node.modul) {
    return null;
  }

  const GetModule = () => {
    switch (node.modul) {
      case "farge_kategori":
        return null;
      case "komponentoversikt":
        return <ComponentOverview node={node.komponenter} />;
      case "ikonsok":
        return <IconSearch />;
      case "token_kategori":
        return <TokenView token={node.token} />;
      default: {
        return null;
      }
    }
  };

  return <div className="mb-16">{GetModule()}</div>;
};

export default withErrorBoundary(SideModul, "SideModul");
