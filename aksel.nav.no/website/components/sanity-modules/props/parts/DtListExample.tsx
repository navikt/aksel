import Code from "@/cms/props/parts/Code";

const DtListDescription = ({ children }) => {
  return (
    <dd className="mt-3 grid text-sm">
      <Code>{children}</Code>
    </dd>
  );
};

export default DtListDescription;
