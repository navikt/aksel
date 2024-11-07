import { DocumentActionComponent, useDocumentOperation } from "sanity";

export function createPublishWithDateAction(
  originalAction: DocumentActionComponent,
): DocumentActionComponent {
  return (props) => {
    const originalResult = originalAction(props);

    const { patch } = useDocumentOperation(props.id, props.type);
    if (!originalResult) {
      return null;
    }
    return {
      ...originalResult,
      onHandle: () => {
        patch.execute([
          { setIfMissing: { publishedAt: new Date().toISOString() } },
        ]);
        originalResult?.onHandle?.();
      },
    };
  };
}
