type Node = {
  name: string;
  children?: Node[];
};

const pathsToTree: (paths: string[]) => Node[] = (paths: string[]) =>
  paths.reduce((list, path) => {
    path.split("/").reduce((list, name, i, a) => {
      let node = list.find((item) => item.name === name);
      if (!node) {
        node = { name };
        list.push(node);
      }
      if (!node.children && i !== a.length - 1) {
        node.children = [];
      }
      return node.children;
    }, list);
    return list;
  }, []);

export default pathsToTree;
