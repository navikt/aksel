import { BodyLong, Heading, ShowMore } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div style={{ minHeight: "400px" }}>
      <ShowMore aria-label="Facts">
        <Heading size="small">Facts</Heading>
        <BodyLong spacing>
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
        <BodyLong>
          Well, see what you can do with him. I&apos;ll be right back. Just you
          reconsider playing that message for him. No, I don&apos;t think he
          likes you at all.
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
  index: 0,
};
