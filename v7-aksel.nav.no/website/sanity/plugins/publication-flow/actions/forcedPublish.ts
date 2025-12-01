import { DocumentActionComponent } from "sanity";

/**
 * Extended version of the "publish" action that allows publishing without an updated approval.
 * We only do this to update labels, so the user knows what they are doing.
 */
export function forcedPublishActions(
  originalAction: DocumentActionComponent,
): DocumentActionComponent {
  return (props) => {
    const originalResult = originalAction(props);

    if (!originalResult || !props.published) {
      return null;
    }

    return {
      ...originalResult,
      shortcut: undefined,
      label: "Publiser uten oppdatert godkjenning",
    };
  };
}
