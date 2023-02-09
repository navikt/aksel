import "../dist/tw.css";
import "tailwindcss/tailwind.css";
import { Provider } from "@navikt/ds-react";
import { IdContext } from "components/website-modules/utils/contexts";

export const NextDecorator = ({ children }: { children: React.ReactNode }) => (
  <Provider>
    <IdContext.Provider value={{ id: "storybook-testid" }}>
      <div id="__next" className="aksel antialiased">
        {children}
      </div>
    </IdContext.Provider>
  </Provider>
);
