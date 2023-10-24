import React from "react";

export const Sandbox = () => {
  return (
    <>
      <style>{`
    #sandbox-iframe {
        width: 100%;
        height: 100vh;
    }
    `}</style>
      <iframe id="sandbox-iframe" src="/playroom/index.html" title="sandbox" />
    </>
  );
};

export default Sandbox;
