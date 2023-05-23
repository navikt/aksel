/* eslint-disable no-undef */

figma.showUI(__html__, { width: 480, height: 600 });

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-icon") {
    const nodes = [];

    const icon = figma.createNodeFromSvg(msg.svg);
    icon.name = msg.name;
    icon.resize(msg.size, msg.size);
    nodes.push(icon);

    figma.currentPage.appendChild(icon);

    figma.viewport.scrollAndZoomIntoView(nodes);

    figma.ui.postMessage({
      type: "create-icon",
      message: `Created ${msg.name} icon}`,
    });
  }
};

// https://github.com/figma/plugin-samples#icon-drag-and-drop
figma.on("drop", (event) => {
  const { files, node } = event;

  if (files.length > 0 && files[0].type === "image/svg+xml") {
    files[0].getTextAsync().then((text) => {
      const newNode = figma.createNodeFromSvg(text);
      newNode.name = `${files[0].name.replace(".svg", "")}Icon`;
      newNode.resize(24, 24);

      // We can only append page nodes to documents
      if ("appendChild" in node && node.type !== "DOCUMENT") {
        node.appendChild(newNode);
      }

      newNode.x = event.x;
      newNode.y = event.y;

      figma.currentPage.selection = [newNode];
    });

    return false;
  }
});
