import React from "react";

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="decorator-content">
      <style>
        {`.decorator-content {
          width: 100%;
          padding-block: 5rem;
          padding-inline: 0.25rem;
          height: 100%;
          display: grid;
          place-content: center;
          background: repeating-linear-gradient(
            45deg,
            #eee,
            #eee 10px,
            #fff 10px,
            #fff 20px
          );`}
      </style>
      {children}
    </div>
  );
}

export { Content };
