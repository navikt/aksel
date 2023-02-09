import "../dist/tw.css";
import "tailwindcss/tailwind.css";

export const NextDecorator = ({ children }: { children: React.ReactNode }) => (
  <div id="__next" className="aksel antialiased">
    {children}
  </div>
);
