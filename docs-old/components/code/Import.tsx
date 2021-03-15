import Bash from "./Bash";

interface ImportProps {
  from: string;
  imports: string | string[];
  namedExport?: boolean;
}

const Import = ({ namedExport = true, from, imports }: ImportProps) => {
  const genCode = () => {
    if (Array.isArray(imports)) {
      return `import { ${imports.join(", ")} } from "${from}";`;
    } else if (!namedExport) {
      return `import ${imports} from "${from}";`;
    } else {
      return `import { ${imports} } from "${from}";`;
    }
  };
  return <Bash code={genCode()} copy language="jsx"></Bash>;
};

export default Import;
