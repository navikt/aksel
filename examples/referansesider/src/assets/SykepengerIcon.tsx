import * as tokens from "@navikt/ds-tokens/js";

export const Ikon = ({ darkmode = false }: { darkmode?: boolean }) => {
  const lightColor = darkmode ? tokens.Neutral400A : tokens.BrandMagenta400A;
  const strongColor = darkmode
    ? tokens.BrandMagenta500
    : tokens.BrandMagenta800;
  return (
    <svg
      role="img"
      width="96"
      height="96"
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M60.5 80V16H36.5V80H60.5Z" fill={lightColor} />
      <path d="M80.5 36H60.5V60H80.5V36Z" fill={lightColor} />
      <path d="M16.5 36H36.5V60H16.5V36Z" fill={lightColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50.8635 68C46.8971 68 43.6816 71.2154 43.6816 75.1818C43.6816 79.1482 46.897 82.3636 50.8635 82.3636C54.8299 82.3636 58.0453 79.1482 58.0453 75.1818C58.0453 71.2154 54.8299 68 50.8635 68ZM40.6816 75.1818C40.6816 69.5585 45.2402 65 50.8635 65C56.4867 65 61.0453 69.5585 61.0453 75.1818C61.0453 80.8051 56.4867 85.3636 50.8635 85.3636C45.2402 85.3636 40.6816 80.8051 40.6816 75.1818Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 41.0909C1 37.4509 3.95085 34.5 7.59091 34.5H12.6818V37.5H7.59091C5.60771 37.5 4 39.1077 4 41.0909V56.3636C4 62.5643 9.02663 67.5909 15.2273 67.5909C21.428 67.5909 26.4546 62.5643 26.4546 56.3637V41.0909C26.4546 39.1077 24.8469 37.5 22.8636 37.5H17.7727V34.5H22.8636C26.5037 34.5 29.4546 37.4509 29.4546 41.0909V56.3637C29.4546 64.2211 23.0848 70.5909 15.2273 70.5909C7.36977 70.5909 1 64.2211 1 56.3636V41.0909Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7275 87.909V67.5454H16.7275V87.909C16.7275 89.8923 18.3353 91.5 20.3185 91.5C22.3017 91.5 23.9094 89.8923 23.9094 87.9091V84.0909C23.9094 78.3421 28.5697 73.6818 34.3185 73.6818H43.2276V76.6818H34.3185C30.2266 76.6818 26.9094 79.9989 26.9094 84.0909V87.9091C26.9094 91.5491 23.9586 94.5 20.3185 94.5C16.6784 94.5 13.7275 91.5491 13.7275 87.909Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50.5 5.99994H94.5C95.6046 5.99994 96.5 6.89537 96.5 7.99994V45.9999C96.5 47.1045 95.6046 47.9999 94.5 47.9999H50.5C49.3954 47.9999 48.5 47.1045 48.5 45.9999V7.99994C48.5 6.89537 49.3954 5.99994 50.5 5.99994ZM51.5 44.9999V8.99994H93.5V44.9999H51.5Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M94.5 23.9999H50.5V20.9999H94.5V23.9999Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.5 0.5C63.3284 0.5 64 1.17157 64 2V14C64 14.8284 63.3284 15.5 62.5 15.5C61.6716 15.5 61 14.8284 61 14V2C61 1.17157 61.6716 0.5 62.5 0.5Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M57 29.9999C57 29.1715 57.6716 28.4999 58.5 28.4999H62.5C63.3284 28.4999 64 29.1715 64 29.9999C64 30.8283 63.3284 31.4999 62.5 31.4999H58.5C57.6716 31.4999 57 30.8283 57 29.9999Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M57 38C57 37.1716 57.6716 36.5 58.5 36.5H62.5C63.3284 36.5 64 37.1716 64 38C64 38.8284 63.3284 39.5 62.5 39.5H58.5C57.6716 39.5 57 38.8284 57 38Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69 29.9999C69 29.1715 69.6716 28.4999 70.5 28.4999H74.5C75.3284 28.4999 76 29.1715 76 29.9999C76 30.8283 75.3284 31.4999 74.5 31.4999H70.5C69.6716 31.4999 69 30.8283 69 29.9999Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69 38C69 37.1716 69.6716 36.5 70.5 36.5H74.5C75.3284 36.5 76 37.1716 76 38C76 38.8284 75.3284 39.5 74.5 39.5H70.5C69.6716 39.5 69 38.8284 69 38Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81 29.9999C81 29.1715 81.6716 28.4999 82.5 28.4999H86.5C87.3284 28.4999 88 29.1715 88 29.9999C88 30.8283 87.3284 31.4999 86.5 31.4999H82.5C81.6716 31.4999 81 30.8283 81 29.9999Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81 38C81 37.1716 81.6716 36.5 82.5 36.5H86.5C87.3284 36.5 88 37.1716 88 38C88 38.8284 87.3284 39.5 86.5 39.5H82.5C81.6716 39.5 81 38.8284 81 38Z"
        fill={strongColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.5 0.5C83.3284 0.5 84 1.17157 84 2V14C84 14.8284 83.3284 15.5 82.5 15.5C81.6716 15.5 81 14.8284 81 14V2C81 1.17157 81.6716 0.5 82.5 0.5Z"
        fill={strongColor}
      />
    </svg>
  );
};

export default Ikon;
