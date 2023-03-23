import {
  DocumentBadgeComponent,
  DocumentBadgeDescription,
  DocumentBadgeProps,
} from "sanity";

export const createBadgeComponent = (badgeAction: DocumentBadgeComponent) => {
  const WrappedBadge = (
    props: DocumentBadgeProps
  ): DocumentBadgeDescription | null => {
    const originalBadgeDescription = badgeAction(props);

    return (
      originalBadgeDescription && {
        ...originalBadgeDescription,
      }
    );
  };
  return WrappedBadge;
};
