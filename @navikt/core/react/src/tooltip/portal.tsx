/* https://github.com/radix-ui/primitives/blob/main/packages/react/portal/src/Portal.tsx */
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const hostElement = globalThis?.document?.body;

  if (hostElement) {
    return ReactDOM.createPortal(children, hostElement);
  }

  // bail out of ssr
  return null;
};

export default Portal;
