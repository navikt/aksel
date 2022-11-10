import GlobalView from "./global";

const TokenView = ({ cat }: { cat: string }) => {
  switch (true) {
    case cat === "font":
      break;
    case cat.startsWith("global"):
      return <GlobalView cat={cat} />;
    case cat === "semantic-color":
      break;
    case cat === "radius":
      break;
    case cat === "shadow":
      break;
    case cat === "spacing":
      break;
    case cat === "z-index":
      break;
    default:
      return null;
  }
};

export default TokenView;
