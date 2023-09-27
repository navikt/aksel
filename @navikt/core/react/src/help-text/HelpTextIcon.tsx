import cl from "clsx";
import React from "react";
import { useId } from "../util/useId";

export const HelpTextIcon = ({
  title,
  filled = false,
}: {
  title: string;
  filled?: boolean;
}) => {
  let titleId: string | undefined = useId();
  titleId = title ? `title-${titleId}` : undefined;
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      role="img"
      aria-labelledby={titleId}
      className={cl("navds-help-text__icon", {
        "navds-help-text__icon--filled": filled,
      })}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <circle
        cx="12"
        cy="12"
        r="11"
        strokeWidth="2"
        stroke="currentColor"
        fill={filled ? "currentColor" : "transparent"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.75 9C9.75 7.75736 10.7574 6.75 12 6.75H12.1716C13.3195 6.75 14.25 7.68054 14.25 8.82843C14.25 9.37966 14.031 9.90832 13.6412 10.2981L12.6412 11.2981C11.7504 12.1889 11.25 13.3971 11.25 14.6569C11.25 15.0711 11.5858 15.4069 12 15.4069C12.4142 15.4069 12.75 15.0711 12.75 14.6569C12.75 13.7949 13.0924 12.9682 13.7019 12.3588L14.7019 11.3588C15.373 10.6877 15.75 9.77748 15.75 8.82843C15.75 6.85212 14.1479 5.25 12.1716 5.25H12C9.92893 5.25 8.25 6.92893 8.25 9V9.5C8.25 9.91421 8.58579 10.25 9 10.25C9.41421 10.25 9.75 9.91421 9.75 9.5V9ZM12 16.5C11.4477 16.5 11 16.9477 11 17.5C11 18.0523 11.4477 18.5 12 18.5C12.5523 18.5 13 18.0523 13 17.5C13 16.9477 12.5523 16.5 12 16.5Z"
        fill={filled ? "var(--a-surface-default)" : "currentColor"}
      />
    </svg>
  );
};
