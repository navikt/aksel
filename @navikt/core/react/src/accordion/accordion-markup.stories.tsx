import React from "react";
import { Accordion } from ".";
import { Collapsible } from "../collapsible";

export default {
  title: "testing/Accordion-markup",
  component: Accordion,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const MarkupTestOne = () => {
  return (
    <div>
      <h2>
        Markup-test med h-tag rundt button, aria-controls på knapp, role region
        på innhold og aria-labelledby på innhold
      </h2>
      <Collapsible>
        <h3>
          <Collapsible.Trigger id="button-1">
            Accordion heading en
          </Collapsible.Trigger>
        </h3>
        <Collapsible.Content role="region" aria-labelledby="button-1">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible>
        <h3>
          <Collapsible.Trigger id="button-2">
            Accordion heading to
          </Collapsible.Trigger>
        </h3>
        <Collapsible.Content role="region" aria-labelledby="button-2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible>
        <h3>
          <Collapsible.Trigger id="button-3">
            Accordion heading tre
          </Collapsible.Trigger>
        </h3>
        <Collapsible.Content role="region" aria-labelledby="button-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
};

export const MarkupTestTwo = () => {
  return (
    <div>
      <h2>
        Markup-test med h-tag rundt button, aria-controls på knapp og role
        region på innhold.
      </h2>
      <Collapsible>
        <h3>
          <Collapsible.Trigger>Accordion heading en</Collapsible.Trigger>
        </h3>
        <Collapsible.Content role="region">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible>
        <h3>
          <Collapsible.Trigger>Accordion heading to</Collapsible.Trigger>
        </h3>
        <Collapsible.Content role="region">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible>
        <h3>
          <Collapsible.Trigger>Accordion heading tre</Collapsible.Trigger>
        </h3>
        <Collapsible.Content role="region">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
};

export const MarkupTestThree = () => {
  return (
    <div>
      <h2>Markup-test med h-tag rundt button og aria-controls på knapp.</h2>
      <Collapsible>
        <h3>
          <Collapsible.Trigger>Accordion heading en</Collapsible.Trigger>
        </h3>
        <Collapsible.Content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible>
        <h3>
          <Collapsible.Trigger>Accordion heading to</Collapsible.Trigger>
        </h3>
        <Collapsible.Content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible>
        <h3>
          <Collapsible.Trigger>Accordion heading tre</Collapsible.Trigger>
        </h3>
        <Collapsible.Content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
};

export const MarkupTestFour = () => {
  return (
    <div>
      <h2>
        Markup-test med h-tag rundt button, aria-controls på knapp, role region
        på innhold, aria-labelledby på innhold og aria-controls på innhold.
      </h2>
      <Collapsible>
        <h3>
          <Collapsible.Trigger id="button-1">
            Accordion heading en
          </Collapsible.Trigger>
        </h3>
        <Collapsible.Content
          role="region"
          aria-labelledby="button-1"
          aria-controls="button-1"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible>
        <h3>
          <Collapsible.Trigger id="button-2">
            Accordion heading to
          </Collapsible.Trigger>
        </h3>
        <Collapsible.Content
          role="region"
          aria-labelledby="button-2"
          aria-controls="button-2"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible>
        <h3>
          <Collapsible.Trigger id="button-3">
            Accordion heading tre
          </Collapsible.Trigger>
        </h3>
        <Collapsible.Content
          role="region"
          aria-labelledby="button-3"
          aria-controls="button-3"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Aspernatur, distinctio blanditiis. Repellat quibusdam magni,
            recusandae cupiditate blanditiis veniam, debitis dignissimos quod
            quam reiciendis minima vel fugiat, saepe nulla sunt est.
          </p>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
};
