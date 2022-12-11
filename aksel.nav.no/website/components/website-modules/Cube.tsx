const Rect = ({ ...props }) => (
  <svg
    width="28.125rem"
    height="28.125rem"
    viewBox="0 0 450 450"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <path
      d="M2.55469 447.272H446.775L446.774 3.05239H2.55424L2.55469 447.272Z"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
  </svg>
);

const Skewed = ({ ...props }) => (
  <svg
    width="14.1875rem"
    height="42rem"
    viewBox="0 0 227 672"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <path
      d="M224.332 224.831L224.333 669.053L2.55446 447.275L2.55401 3.05265L224.332 224.831Z"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const AkselCube = () => (
  <div className="aksel-cube">
    <Skewed className="aksel-cube-1" />
    <Rect className="aksel-cube-2" />
    <Skewed className="aksel-cube-3" />
    <Rect className="aksel-cube-4" />
    <Skewed className="aksel-cube-5" />
    <Skewed className="aksel-cube-6" />
  </div>
);
