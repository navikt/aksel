import { Latest, LatestT } from "./Latest";

export type BlocksT = LatestT;

export const FrontpageBlock = ({ blocks }: { blocks: BlocksT[] }) => {
  console.log(blocks);
  if (!blocks || !blocks.length) {
    return null;
  }
  return (
    <div className="lg:px-18 px-2">
      {blocks.map((x) => {
        switch (x._type) {
          case "nytt_fra_aksel":
            return <Latest block={x} key={x._key} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
