import Code from "@/web/Code";

const DtListDescription = ({ children }) => {
  return (
    <div className="mt-3">
      <span className="font-size-2 ml-4 text-gray-700">Example: </span>
      <Code>{children}</Code>
    </div>
  );
};

export default DtListDescription;
