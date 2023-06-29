import React, { forwardRef, useEffect, useRef } from "react";
import cl from "clsx";
import { Button } from "..";
import { XMarkIcon } from "@navikt/aksel-icons";
import ModalContent from "./ModalContent";

export interface ModalProps
  extends Omit<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    "tabIndex" | "open"
  > {
  /**
   * Open state for modal.
   * @default false
   */
  open?: boolean;
  /**
   * If modal should close on overlay click (click outside Modal).
   * @default true
   */
  shouldCloseOnOverlayClick?: boolean;
  /**
   * If modal should close when the Escape key is pressed.
   * @default true
   */
  shouldCloseOnEsc?: boolean;
  /**
   * Removes the close button (X) when `false`.
   * @default true
   */
  closeButton?: boolean;
}

export const Modal = forwardRef<HTMLDialogElement | null, ModalProps>(
  (
    {
      children,
      open = false,
      className,
      closeButton = true,
      shouldCloseOnOverlayClick = true,
      shouldCloseOnEsc = true,
      ...rest
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (ref === null) {
        return;
      }

      if (typeof ref === "function") {
        ref(dialogRef.current);
        return;
      }

      ref.current = dialogRef.current;
    }, [dialogRef, ref]);

    useEffect(() => {
      if (dialogRef.current === null) {
        return;
      }

      if (open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }, [open, dialogRef]);

    useEffect(() => {
      if (shouldCloseOnEsc) {
        return;
      }

      const preventCloseOnEsc = (e: KeyboardEvent) => {
        if (e.key !== "Escape") {
          return;
        }

        e.preventDefault();

        if (closeButtonRef.current !== null) {
          focusCloseButton(closeButtonRef.current);
        }
      };

      window.addEventListener("keydown", preventCloseOnEsc);

      return () => window.removeEventListener("keydown", preventCloseOnEsc);
    }, [shouldCloseOnEsc]);

    const closeOnOverlayClick: React.MouseEventHandler<HTMLDialogElement> = (
      e
    ) => {
      if (shouldCloseOnOverlayClick) {
        if (e.target === e.currentTarget) {
          dialogRef.current?.close();
        }

        return;
      }

      if (
        closeButton &&
        closeButtonRef.current !== null &&
        e.target === e.currentTarget
      ) {
        focusCloseButton(closeButtonRef.current);
      }
    };

    return (
      <dialog
        {...rest}
        ref={dialogRef}
        className={cl("navds-modal", className)}
        onClick={closeOnOverlayClick}
      >
        {children}
        {closeButton ? (
          <Button
            ref={closeButtonRef}
            className="navds-modal__button"
            size="small"
            variant="tertiary-neutral"
            onClick={() => dialogRef.current?.close()}
            icon={<XMarkIcon title="Lukk modalvindu" />}
          />
        ) : null}
      </dialog>
    );
  }
);

const focusCloseButton = (closeButton: HTMLButtonElement) => {
  /**
   * `HTMLElement.focus()` does not currently show focus ring consistently.
   * In Firefox this means never. In Chrome it means only when the Escape key is pressed.
   * To control this behaviour, the specification has been updated to allow `focusVisible` to be passed to `HTMLElement.focus()`.
   *
   * See:
   * - https://github.com/whatwg/html/pull/8087
   * - https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#parameters
   * - https://bugzilla.mozilla.org/show_bug.cgi?id=1765083
   * - https://github.com/mdn/content/issues/19302
   *
   * However this is only implemented in Firefox and not yet reflected in TypeScript.
   * `focusVisible` is ignored by other browsers.
   *
   * `focusVisible: true` has been forcefully added to the parameter object below via type assertion below.
   *
   * TODO: Remove type assertion when TypeScript has added `focusVisible` to `HTMLElement.focus()` parameters.
   */
  closeButton.focus({ preventScroll: true, focusVisible: true } as {
    preventScroll: boolean;
  });
  closeButton.animate(
    { transform: ["rotate(10deg)", "rotate(-10deg)"] },
    { duration: 100, iterations: 2, fill: "none" }
  );
};

/**
 * A component that displays a modal dialog.
 * A wrapper around the HTML `<dialog>` element.
 *
 * @warning Do not add padding to the `Modal` (`<dialog>`) component or margin to `Modal.Content`, this will make the close on overlay click behave inconsistently.
 * Use padding on `Modal.Content` instead.
 *
 * To style the backdrop, target the `className::backdrop` pseudo-element.
 *
 * The `tabindex` attribute must not be used on the `<dialog>` element. It is therefore omitted from the `ModalProps` interface.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog | MDN: The Dialog element}
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/modal)
 * @see 🏷️ {@link ModalProps}
 *
 * @example
 * ```jsx
 * const [open, setOpen] = useState(false);
 *
 * <Modal
 *   open={open}
 *   onClose={() => setOpen((x) => !x)}
 *   aria-label="Modal demo"
 *   aria-labelledby="modal-heading"
 * >
 *   <Modal.Content>
 *     <Heading spacing level="1" size="large" id="modal-heading">
 *       Viktig info
 *     </Heading>
 *     <BodyLong spacing>
 *       Hallo!
 *     </BodyLong>
 *   </Modal.Content>
 * </Modal>
 * ```
 */
const CompoundModal = Object.assign(Modal, { Content: ModalContent });

export default CompoundModal;
