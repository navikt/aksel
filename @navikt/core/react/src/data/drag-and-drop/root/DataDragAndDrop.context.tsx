import { createStrictContext } from "../../../utils/helpers";

interface DataDragAndDropContextType {
  inputMethod: "mouse" | "keyboard" | null;
}

export const {
  Provider: DataDragAndDropProvider,
  useContext: useDataDragAndDropContext,
} = createStrictContext<DataDragAndDropContextType | undefined>({
  errorMessage:
    "useDataDragAndDropContext must be used within a DataDragAndDropProvider",
  name: "DataDragAndDropContext",
});
