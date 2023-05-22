/* eslint-disable no-undef */
// @ts-ignore
figma.showUI(__html__, { width: 480, height: 600 });
// @ts-ignore
figma.ui.onmessage = (msg) => {
  if (msg.type === "create-icon") {
    const nodes = [];
    // @ts-ignore
    const icon = figma.createNodeFromSvg(msg.svg);
    icon.name = msg.name;
    icon.resize(msg.size, msg.size);
    nodes.push(icon);

    // @ts-ignore
    figma.currentPage.appendChild(icon);
    // @ts-ignore
    figma.viewport.scrollAndZoomIntoView(nodes);
    // @ts-ignore
    figma.ui.postMessage({
      type: "create-icon",
      message: `Created ${msg.count} icon}`,
    });
  }
  // @ts-ignore
  figma.closePlugin();
};
