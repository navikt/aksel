import { useRouter } from "@tanstack/react-router";

const pathToName = (path: string) => {
  const parsed = path.replace(/\//g, " ").trim();
  if (parsed === "") return "Hjem";
  return parsed;
};

export const RouteMapper = ({
  children,
  skipRoot = false,
}: {
  children: (path: string, name: string, root: boolean) => React.ReactNode;
  skipRoot?: boolean;
}) => {
  const { routesByPath } = useRouter();
  let paths = Object.keys(routesByPath);
  if (skipRoot) {
    paths = paths.filter((path) => path !== "/");
  }

  // paths = paths.filter((path) => path === "/aktivitetsplan");

  return (
    <>
      {paths.map((path) => {
        const name = pathToName(path);
        return children(path, name, path === "/");
      })}
    </>
  );
};
