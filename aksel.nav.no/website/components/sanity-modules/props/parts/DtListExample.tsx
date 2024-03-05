import Code from "@/cms/props/parts/Code";

const DtListDescription = ({ children }) => {
  return (
    <div className="mt-3 grid text-sm">
      <Code>{children}</Code>
    </div>
  );
};

export default DtListDescription;
