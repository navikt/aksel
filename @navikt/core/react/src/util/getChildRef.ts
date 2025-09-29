export const getChildRef = <T>(
  children: React.ReactElement<React.RefAttributes<T>>,
): React.Ref<T> | undefined =>
  Object.prototype.propertyIsEnumerable.call(children.props, "ref")
    ? (children.props as any).ref // React 19 (children.ref still works, but gives a warning)
    : (children as any).ref; // React <19
