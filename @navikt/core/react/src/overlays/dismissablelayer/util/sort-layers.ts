type DismissableLayerElement = HTMLDivElement;

function getSortedLayers(
  layers: Set<DismissableLayerElement>,
  branchedLayers: Map<DismissableLayerElement, Set<DismissableLayerElement>>,
): DismissableLayerElement[] {
  const sorted: DismissableLayerElement[] = [];
  const visited = new Set<DismissableLayerElement>();
  const parentMap = new Map<DismissableLayerElement, DismissableLayerElement>();

  branchedLayers.forEach((children, parent) => {
    children.forEach((child) => {
      if (child !== parent) {
        parentMap.set(child, parent);
      }
    });
  });

  const walk = (layer: DismissableLayerElement) => {
    if (visited.has(layer)) {
      return;
    }

    const parent = parentMap.get(layer);
    if (parent && !visited.has(parent)) {
      walk(parent);
      if (visited.has(layer)) {
        return;
      }
    }

    visited.add(layer);
    sorted.push(layer);

    const children = branchedLayers.get(layer);
    if (children) {
      children.forEach(walk);
    }
  };

  layers.forEach(walk);

  return sorted;
}

export { getSortedLayers };
