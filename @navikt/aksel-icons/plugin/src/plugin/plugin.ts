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

  figma.closePlugin();
};
