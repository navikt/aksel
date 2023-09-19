import { BodyLong, Heading, ShowMore } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ minHeight: "316px" }}>
      <ShowMore aria-label="Facts" collapsedHeight="8rem">
        <Heading size="small">Facts</Heading>
        <BodyLong>
          Did you hear that? They&apos;ve shut down the main reactor. We&apos;ll
          be destroyed for sure. This is madness! We&apos;re doomed!
          There&apos;ll be no escape for the Princess this time. What&apos;s
          that? Artoo! Artoo-Detoo, where are you? At last! Where have you been?
          They&apos;re heading in this direction. What are we going to do?
          We&apos;ll be sent to the spice mine of Kessel or smashed into who
          knows what! Wait a minute, where are you going? The Death Star plans
          are not in the main computer. Where are those transmissions you
          intercepted? What have you done with those plans? We intercepted no
          transmissions. Aaah....This is a consular ship.
        </BodyLong>
      </ShowMore>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
