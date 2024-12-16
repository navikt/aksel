import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import * as tokens from "@navikt/ds-tokens/darkside-js";

/**
 * @note
 * - Unsure of token use here.
 */
const ScSVG = styled.svg`
  stroke: ${tokens.TextBrandMagentaStrong};
`;

/**
 * @note
 * - BgBrandMagentaModerate virker litt rart å bruke her.
 */
const ScPlusSVG = styled.svg`
  fill: ${tokens.BgBrandMagentaModerate};
`;

export const Ikon = ({ className }: { className?: string }) => {
  return (
    <span className={twMerge(`absolute block`, className)} aria-hidden="true">
      <span className="absolute">
        <ScPlusSVG
          role="img"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="16" y="36" width="64" height="24"></rect>
          <rect
            x="60"
            y="16"
            width="64"
            height="24"
            transform="rotate(90 60 16)"
          ></rect>
        </ScPlusSVG>
      </span>
      <span className="absolute" id=":R8imm:">
        <ScSVG
          role="img"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50.3637"
            cy="75.1818"
            r="8.68182"
            strokeWidth="3"
          ></circle>
          <path
            d="M12.1818 36H7.09091C4.27928 36 2 38.2793 2 41.0909V56.3636C2 63.3927 7.6982 69.0909 14.7273 69.0909V69.0909C21.7564 69.0909 27.4546 63.3927 27.4546 56.3637V41.0909C27.4546 38.2793 25.1753 36 22.3636 36H17.2727"
            strokeWidth="3"
          ></path>
          <path
            d="M14.7275 67.5454V87.909C14.7275 90.7207 17.0068 93 19.8185 93V93C22.6301 93 24.9094 90.7207 24.9094 87.9091V84.0909C24.9094 79.1705 28.8981 75.1818 33.8185 75.1818H42.7276"
            strokeWidth="3"
          ></path>
          <mask id="path-6-inside-1_19357_35375" fill="white">
            <rect x="48" y="5.99991" width="48" height="42" rx="2"></rect>
          </mask>
          <rect
            x="48"
            y="5.99991"
            width="48"
            height="42"
            rx="2"
            strokeWidth="6"
            mask="url(#path-6-inside-1_19357_35375)"
          ></rect>
          <line
            x1="50"
            y1="22.4999"
            x2="94"
            y2="22.4999"
            strokeWidth="3"
          ></line>
          <path d="M62 2L62 14" strokeWidth="3" strokeLinecap="round"></path>
          <path
            d="M62 29.9999L58 29.9999"
            strokeWidth="3"
            strokeLinecap="round"
          ></path>
          <path d="M62 38L58 38" strokeWidth="3" strokeLinecap="round"></path>
          <path
            d="M74 29.9999L70 29.9999"
            strokeWidth="3"
            strokeLinecap="round"
          ></path>
          <path d="M74 38L70 38" strokeWidth="3" strokeLinecap="round"></path>
          <path
            d="M86 29.9999L82 29.9999"
            strokeWidth="3"
            strokeLinecap="round"
          ></path>
          <path d="M86 38L82 38" strokeWidth="3" strokeLinecap="round"></path>
          <path d="M82 2L82 14" strokeWidth="3" strokeLinecap="round"></path>
        </ScSVG>
      </span>
    </span>
  );
};

export default Ikon;
