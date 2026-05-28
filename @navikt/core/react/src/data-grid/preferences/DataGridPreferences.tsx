import React, { forwardRef } from "react";
import { CogIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";
import { cl } from "../../utils/helpers";
import { useDataGridContext } from "../root/DataGridRoot.context";

interface DataGridPreferencesProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: never;
}

/**
 * Component for displaying preferences/settings for data-grid.
 *
 * **WARNING: This component is in active development and may receive breaking changes outside major releases!**
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/datagrid)
 * @see 🏷️ {@link DataGridPreferences}
 *
 * @example
 * ```jsx
 * ```
 */
const DataGridPreferences = forwardRef<
  HTMLButtonElement,
  DataGridPreferencesProps
>(({ className, ...rest }: DataGridPreferencesProps, forwardedRef) => {
  const context = useDataGridContext(false);

  if (!context) {
    throw new Error(
      "[Aksel] DataGrid.Preferences must be used within a DataGrid",
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          ref={forwardedRef}
          {...rest}
          variant="tertiary"
          size="small"
          data-color="neutral"
          icon={<CogIcon />}
          className={cl("aksel-data-grid__preferences-button", className)}
        />
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader withClosebutton>
          <DialogTitle>Innstillinger</DialogTitle>
        </DialogHeader>
        <DialogBody>Forms</DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button variant="secondary">Avbryt</Button>
          </DialogCloseTrigger>
          <DialogCloseTrigger>
            <Button>Lagre</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
});

export { DataGridPreferences }; // DataGridRoot needs to be exported b.c. of docgen
export default DataGridPreferences;
