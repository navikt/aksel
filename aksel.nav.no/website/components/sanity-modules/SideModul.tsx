import React from "react";
import { withErrorBoundary } from "@/error-boundary";
import TokenView from "./token-view";

type SpesialT = {
  _key: string;
  _type: "spesial_seksjon";
  modul?: "ikonsok" | "token_kategori";
  logs?: any[];
  komponenter?: any;
  farge?: any;
  token?: { title: string; kategori: string };
};

const SideModul = ({ node }: { node: SpesialT }) => {
  if (!node || !node.modul) {
    return null;
  }

  const GetModule = () => {
    switch (node.modul) {
      case "ikonsok":
        return null;
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
