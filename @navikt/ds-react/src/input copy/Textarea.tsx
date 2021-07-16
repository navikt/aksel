import React, {
  forwardRef,
  TextareaHTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";
import { FieldsetContext } from "../index";
import Throttle from "lodash.throttle";
import mergeRefs from "react-merge-refs";
import { requestAnimationFrame } from "../index";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  label?: React.ReactNode;
  description?: React.ReactNode;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
  /**
   * Visually allowed length of content
   * @default 2000
   */
  maxLength?: number;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size,
      id,
      label,
      description,
      error,
      errorId,
      maxLength,
      value,
      onChange,
      ...rest
    },
    ref
  ) => {
    const mirrorRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const mergedRef = mergeRefs([textareaRef, ref]);
    const maxLengthId = useRef(uuidv4());
    const internalId = useRef(uuidv4());
    const internalErrorId = useRef(uuidv4());

    const context = useContext(FieldsetContext);

    const errorMsg = context.error ?? error;
    const errorUuid = context.errorId ?? errorId ?? internalErrorId.current;

    const selectedSize = size ? size : context.size ?? "m";

    const updateHeight = useCallback(() => {
      if (mirrorRef.current && textareaRef.current) {
        mirrorRef.current.textContent = `${textareaRef.current.value} `;
        textareaRef.current.style.height = `${
          mirrorRef.current.offsetHeight + 25
        }px`;
      }
    }, []);

    useEffect(() => {
      updateHeight();
    }, [value, updateHeight]);

    useEffect(() => {
      // @ts-ignore
      requestAnimationFrame.call(window, updateHeight, 0);
    }, [updateHeight]);

    return (
      <div
        className={cl("navds-form__element", {
          "navds-textarea--error": !!errorMsg,
        })}
      >
        {label && (
          <label htmlFor={id ?? internalId.current}>
            <div
              className={cl("navds-form__label", "navds-label", {
                "navds-label--s": selectedSize === "s",
              })}
            >
              {label}
            </div>
            {description && (
              <div
                className={cl("navds-form__description", "navds-body-short", {
                  "navds-body--s": selectedSize === "s",
                })}
              >
                {description}
              </div>
            )}
          </label>
        )}
        <div className="navds-textarea__wrapper">
          {maxLength && (
            <span id={maxLengthId.current} className="sr-only">
              Tekstområde med plass til {maxLength} tegn., Textarea can have{" "}
              {maxLength} signs.
            </span>
          )}
          <textarea
            id={id ?? internalId.current}
            ref={mergedRef}
            className={cl(
              "navds-textarea",
              className,
              `navds-textarea--${selectedSize}`,
              "navds-body-short",
              { "navds-body--s": selectedSize === "s" }
            )}
            value={value}
            onChange={(e) => onChange(e)}
            aria-invalid={rest.disabled ? undefined : !!errorMsg}
            aria-describedby={
              rest.disabled ? undefined : !!errorMsg && errorUuid
            }
            {...rest}
          />
          <Counter
            maxLength={maxLength}
            currentLength={value.length}
            size={size}
          />
        </div>
        <div
          className={cl("navds-label", "navds-form--error", {
            "navds-label--s": selectedSize === "s",
          })}
          id={errorUuid}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {!context.error && errorMsg && !rest.disabled && (
            <div>{errorMsg}</div>
          )}
        </div>
        <div
          className={cl(
            "navds-textarea",
            "navds-textarea__mirror",
            `navds-textarea--${selectedSize}`,
            "navds-body-short",
            { "navds-body--s": selectedSize === "s" }
          )}
          ref={mirrorRef}
          aria-hidden="true"
        />
      </div>
    );
  }
);

const Counter = ({ maxLength, currentLength, size }) => {
  const difference = maxLength - currentLength;

  if (maxLength <= 0) {
    return null;
  }
  return (
    <p
      className={cl("navds-textarea__counter", "navds-body-short", {
        "navds-body--s": size === "s",
      })}
    >
      <span
        className={cl("navds-textarea__counter-text", {
          "navds-textarea__counter-text--error": difference < 0,
        })}
        aria-live="polite"
      >
        {difference >= 0 && `Du har ${difference} tegn igjen`}
        {difference < 0 && `Du har ${Math.abs(difference)} tegn for mye`}
      </span>
    </p>
  );
};

export default Textarea;
