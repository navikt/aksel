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

const Demo = () => {
  return (
    <div className="aksel-cube-wrapper grid h-screen w-full place-items-center ">
      <div className="aksel-cube relative">
        <Skewed className="aksel-cube-1 " />
        <Rect className="aksel-cube-2 " />
        <Skewed className="aksel-cube-3 " />
        <Rect className="aksel-cube-4 " />
        <Skewed className="aksel-cube-5 " />
        <Skewed className="aksel-cube-6 " />
      </div>
    </div>
  );
};
export default Demo;
{
  /* <svg
        viewBox="0 0 2700 2700"
        width="2514"
        height="2509"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="aksel-cube absolute -top-[40%] -left-[14%]"
      >
        <path

          d="M316.642 2037.17L630.754 2351.29L317.113 2351.29L3.00021 2037.17L316.642 2037.17Z"
          stroke="#002252"
          strokeWidth="4.5"
          strokeLinejoin="round"
          className="aksel-cube-1"
        />
        <path

          d="M630.359 2038.04L944.471 1723.93L630.359 1409.81L316.248 1723.93L630.359 2038.04Z"
          stroke="#002252"
          strokeWidth="4.5"
          strokeLinejoin="round"
          className="aksel-cube-2"
        />
        <path

          d="M1257.25 1724.79L1571.36 1410.68H1257.72L943.61 1724.79H1257.25Z"
          stroke="#002252"
          strokeWidth="4.5"
          strokeLinejoin="round"
          className="aksel-cube-3"
        />
        <path

          d="M1570.5 1411.54L1884.61 1097.43L1570.5 783.318L1256.39 1097.43L1570.5 1411.54Z"
          stroke="#002252"
          strokeWidth="4.5"
          strokeLinejoin="round"
          className="aksel-cube-4"
        />
        <path

          d="M1569.64 784.181L1883.75 470.069H1570.11L1255.99 784.181H1569.64Z"
          stroke="#002252"
          strokeWidth="4.5"
          strokeLinejoin="round"
          className="aksel-cube-5"
        />
        <path

          d="M2197 156.82L2511.11 470.932L2197.47 470.933L1883.36 156.82L2197 156.82Z"
          stroke="#002252"
          strokeWidth="4.5"
          strokeLinejoin="round"
          className="aksel-cube-6"
        />
      </svg> */
}
