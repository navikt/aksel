import clsx from "clsx";
import dynamic from "next/dynamic";

export const Sticker = dynamic(() => Promise.resolve(_Sticker), { ssr: false });

const _Sticker = ({ text = "NEW!", large = false }) => {
  return (
    <>
      <style>
        {`
    .sticker {
        height: 3rem;
        width: 3rem;
        aspect-ratio: 1;
        display: inline-block;
        clip-path: path('M24 0L29.2178 4.52694L36 3.21539L38.2553 9.74473L44.7846 12L43.4731 18.7822L48 24L43.4731 29.2178L44.7846 36L38.2553 38.2553L36 44.7846L29.2178 43.4731L24 48L18.7822 43.4731L12 44.7846L9.74473 38.2553L3.21539 36L4.52694 29.2178L0 24L4.52694 18.7822L3.21539 12L9.74473 9.74473L12 3.21539L18.7822 4.52694L24 0Z');
        background: linear-gradient(to top right, var(--a-deepblue-300), var(--a-purple-200));
        position: absolute;
        right: -1rem;
        bottom: -1rem;
        transform: scale(1.2);
    }
    .new {
      color: #fff;
      font-size: calc(0.9rem);
      font-weight: bold;
      position: absolute;
      left: 0.5rem;
      top: 0.9rem;
      transform: rotate(-15deg);
    }

    .sticker--large {
        bottom: calc(1rem);
        right: calc(1rem);
        transform: scale(2);
    }
`}
      </style>
      <div
        className={clsx("sticker", {
          "sticker--large": large,
        })}
      >
        <span className="new">{text}</span>
      </div>
    </>
  );
};
