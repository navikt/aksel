interface ModalPropsBase extends React.DialogHTMLAttributes<HTMLDialogElement> {
  /**
   * Affects internal padding
   */
  size?: "small" | "medium";
  /**
   * Content for the header. Alteratively you can use `<Modal.Header>` instead for more control, but then you have to set `aria-label` or `aria-labelledby` on the modal manually.
   */
  header?: {
    label?: string;
    icon?: React.ReactNode;
    heading: string;
    /**
     * Heading size.
     * @default "medium"
     */
    size?: "medium" | "small";
    /**
     * Removes close-button (X) when false.
     * @default true
     */
    closeButton?: boolean;
  };
  /**
   * Modal content.
   */
  children: React.ReactNode;
  /**
   * Whether the modal should be visible or not.
   * Remember to use the `onClose` callback to keep your local state in sync.
   * You can also use `ref.current.openModal()` and `ref.current.close()`.
   */
  open?: boolean;
  /**
   * Called when the modal has been closed
   */
  onClose?: React.ReactEventHandler<HTMLDialogElement>;
  /**
   * Called when the user tries to close the modal by one of the built-in methods.
   * Used if you want to ask the user for confirmation before closing.
   * @warning Will not always be called when pressing Esc. See `onCancel` for more info.
   * @returns Whether to close the modal or not
   */
  onBeforeClose?: () => boolean;
  /**
   * _Sometimes*_ called when the user presses the Esc key.
   *
   *  *: Some browsers does not always trigger this event. Chrome only triggers it if you have
   *  interacted with the modal, and will not trigger it a second time if you press Esc twice in a row.
   */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;
  /**
   * Whether to close when clicking on the backdrop.
   * @warning Users may click outside by accident. Don't use if closing can cause data loss, or the modal contains important info.
   * @default false
   */
  closeOnBackdropClick?: boolean;
  /**
   * @default fit-content (up to 700px)
   * */
  width?: "medium" | "small" | number | `${number}${string}`;
  /**
   * Lets you render the modal into a different part of the DOM.
   * Will use `rootElement` from `Provider` if defined, otherwise `document.body`.
   */
  portal?: boolean;
  /**
   * User defined classname for modal
   */
  className?: string;
  /**
   * ID of the element that labels the modal.
   * No need to set this manually if the `header` prop is used. A reference to `header.heading` will be created automatically.
   * @warning If not using `header`, you should set either `aria-labelledby` or `aria-label`.
   */
  "aria-labelledby"?: string;
  /**
   * String value that labels the modal.
   * No need to set this if the `header` prop is used.
   * @warning If not using `header`, you should set either `aria-labelledby` or `aria-label`.
   */
  "aria-label"?: string;
}

// Require onClose if you use open  &  Require either header, aria-labelledby or aria-label
export type ModalProps = ModalPropsBase &
  (
    | { onClose: ModalPropsBase["onClose"]; open: boolean | undefined }
    | { onClose?: ModalPropsBase["onClose"]; open?: never }
  ) &
  (
    | {
        header: ModalPropsBase["header"];
        "aria-labelledby": string;
        "aria-label"?: never;
      }
    | {
        header: ModalPropsBase["header"];
        "aria-label": string;
        "aria-labelledby"?: never;
      }
    | {
        header: ModalPropsBase["header"];
        "aria-labelledby"?: never;
        "aria-label"?: never;
      }
    | { "aria-labelledby": string; "aria-label"?: never }
    | { "aria-labelledby"?: never; "aria-label": string }
  );
