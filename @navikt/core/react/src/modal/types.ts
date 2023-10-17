export interface ModalProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "onClick"> {
  /**
   * Content for the header. Alteratively you can use <Modal.Header> instead for more control,
   * but then you have to set `aria-label` or `aria-labelledby` on the modal manually.
   */
  header?: {
    label?: string;
    icon?: React.ReactNode;
    heading: string;
    /**
     * Heading size
     * @default "medium"
     * */
    size?: "medium" | "small";
    /**
     * Removes close-button (X) when false
     * @default true
     */
    closeButton?: boolean;
  };
  /**
   * Modal content
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
   * Called when the user wants to close the modal (clicked the close button or pressed Esc).
   * @returns Whether to close the modal
   */
  onBeforeClose?: () => boolean | void;
  /**
   * Called when the user presses the Esc key, unless `onBeforeClose()` returns `false`.
   */
  onCancel?: React.ReactEventHandler<HTMLDialogElement>;
  /**
   * Whether to close when clicking on the backdrop.  *** TODO RULES ***
   * @default false
   */
  closeOnClickOutside?: boolean;
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
   * Sets aria-labelledby on modal.
   * No need to set this manually if the `header` prop is used. A reference to `header.heading` will be created automatically.
   * @warning If not using `header`, you should set either `aria-labelledby` or `aria-label`.
   */
  "aria-labelledby"?: string;
}
