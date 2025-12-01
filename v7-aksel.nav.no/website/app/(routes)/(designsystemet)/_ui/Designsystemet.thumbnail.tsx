import { ImageAsThemedSvg } from "@/app/_ui/image-as-svg/ImageAsSvg";
import styles from "./Designsystemet.module.css";

function DesignsystemetThumbnail({ thumbnailUrl }: { thumbnailUrl?: string }) {
  if (!thumbnailUrl) {
    return null;
  }

  return (
    <div className={styles.thumbnailContainer}>
      <CubeShape />
      <ImageAsThemedSvg
        size={280}
        url={thumbnailUrl}
        className={styles.thumbnailImage}
      />
    </div>
  );
}

function CubeShape() {
  return (
    <svg
      width="817"
      height="289"
      viewBox="0 0 817 289"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={styles.thumbnailCube}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M778.342 -296.311C776.611 -298.043 773.803 -298.043 772.071 -296.311L533.962 -58.2022C532.231 -56.4706 532.231 -53.663 533.962 -51.9313L772.071 186.178C773.803 187.909 776.611 187.909 778.342 186.178L1016.45 -51.9313C1018.18 -53.6629 1018.18 -56.4705 1016.45 -58.2022L778.342 -296.311ZM775.207 -286.905L1007.04 -55.0667L775.207 176.771L543.369 -55.0668L775.207 -286.905Z"
        fill="var(--ax-bg-brand-blue-soft)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M302.748 -62.907C301.572 -62.907 300.445 -62.4398 299.613 -61.6082L61.5029 176.502C60.2347 177.77 59.8554 179.677 60.5417 181.334C61.228 182.991 62.8449 184.072 64.6384 184.072L302.391 184.072C303.567 184.072 304.695 183.604 305.527 182.773L543.637 -55.3373C544.905 -56.6055 545.285 -58.5127 544.598 -60.1697C543.912 -61.8266 542.295 -62.907 540.502 -62.907L302.748 -62.907ZM304.585 -54.0386L529.797 -54.0386L300.555 175.203H75.3435L304.585 -54.0386Z"
        fill="var(--ax-bg-brand-blue-soft)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.1787 173.097C69.447 171.365 66.6394 171.365 64.9078 173.097L-173.201 411.206C-174.933 412.938 -174.933 415.745 -173.201 417.477L64.9077 655.586C66.6394 657.318 69.447 657.318 71.1786 655.586L309.288 417.477C311.019 415.745 311.019 412.938 309.288 411.206L71.1787 173.097ZM68.0432 182.503L299.881 414.341L68.0432 646.18L-163.795 414.341L68.0432 182.503Z"
        fill="var(--ax-bg-brand-blue-soft)"
      />
    </svg>
  );
}

export { DesignsystemetThumbnail };
