import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { ShowMore, ShowMoreProps } from ".";
import { BodyLong, HStack, Box, Heading, Bleed } from "..";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof ShowMore> = {
  title: "ds-react/ShowMore",
  component: ShowMore,
};
export default meta;

const variants = ["default", "subtle", "info"] as const;

const content = (
  <BodyLong style={{ maxWidth: 400 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisl eros,
    vestibulum et dui non, malesuada egestas nisi. Suspendisse neque ante,
    volutpat a ante eu, blandit scelerisque ex. Integer sit amet sapien eget mi
    molestie ultricies sit amet dictum metus. Morbi consequat urna tristique
    consectetur rhoncus. Phasellus ac facilisis libero. Maecenas quis nisi
    elementum, tincidunt justo a, fermentum massa. Vestibulum tincidunt in dolor
    eget rhoncus. <a href="/">Link</a>. Aliquam vehicula, nisl id sollicitudin
    congue, tortor eros tempor odio, a eleifend est ex vitae libero.
  </BodyLong>
);

export const Default: StoryFn<ShowMoreProps> = (props: ShowMoreProps) => {
  return <ShowMore {...props}>{content}</ShowMore>;
};
Default.argTypes = {
  as: {
    control: "radio",
    options: ["aside", "section"],
  },
  size: {
    control: "radio",
    options: ["medium", "small"],
  },
  variant: {
    control: "radio",
    options: variants,
  },
  collapsedHeight: {
    control: { type: "text" },
  },
  headingSize: {
    control: "radio",
    options: ["xlarge", "large", "medium", "small", "xsmall"],
  },
  headingLevel: {
    control: "radio",
    options: ["1", "2", "3", "4", "5", "6"],
  },
};
Default.args = {
  heading: "Heading",
};

export const Small = () => (
  <ShowMore heading="Lorem ipsum" size="small">
    {content}
  </ShowMore>
);

export const CustomHeight = () => (
  <HStack gap="8">
    <ShowMore as="section" heading="Tabellvisning" collapsedHeight="8rem">
      {content}
    </ShowMore>
    <ShowMore heading="Tabellvisning" collapsedHeight={90} size="small">
      {content}
    </ShowMore>
  </HStack>
);

export const Variants = () => (
  <HStack gap="12" style={{ padding: "1rem" }}>
    <Box background="bg-subtle" padding="6">
      <ShowMore heading="default" variant="default">
        {content}
      </ShowMore>
    </Box>
    {variants
      .filter((v) => !["inline", "default"].includes(v))
      .map((variant) => (
        <ShowMore heading={variant} key={variant} variant={variant}>
          {content}
        </ShowMore>
      ))}
  </HStack>
);

export const RemovePadding = () => (
  <Box borderWidth="1" padding="4">
    <Heading size="medium">This text should be aligned</Heading>
    <Bleed marginInline="4" asChild>
      <ShowMore heading="This text should be aligned" size="small">
        {content}
      </ShowMore>
    </Bleed>
  </Box>
);

export const Open: StoryFn = () => (
  <ShowMore heading="Lorem ipsum">{content}</ShowMore>
);
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
};

export const AccessibilityTest = () => (
  <div style={{ maxWidth: 500 }}>
    <Heading size="large">Test av tilgjengelighet.</Heading>
    <p>
      Dette er en story for å teste hvordan komponenten fungerer med
      skjermleser.
    </p>
    <p>Her kommer første eksempel:</p>
    <ShowMore
      as="aside"
      heading="Første ShowMore"
      headingLevel="2"
      size="small"
      variant="info"
    >
      <BodyLong>Test av ShowMore som aside.</BodyLong>
      <BodyLong>
        <a href="/">Link</a>. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Cras nisl eros, vestibulum et dui non, malesuada egestas nisi.
        Suspendisse neque ante, volutpat a ante eu, blandit scelerisque ex.
        Integer sit amet sapien eget mi molestie ultricies sit amet dictum
        metus. Morbi consequat urna tristique consectetur rhoncus.
      </BodyLong>
      <BodyLong>
        Phasellus ac facilisis libero. Maecenas quis nisi elementum, tincidunt
        justo a, fermentum massa.
      </BodyLong>
    </ShowMore>
    <p>Det var det første eksempelet. Under er det andre eksempelet:</p>
    <ShowMore
      as="section"
      heading="Andre ShowMore"
      size="small"
      variant="info"
      collapsedHeight="4rem"
    >
      <BodyLong>Test av ShowMore som section.</BodyLong>
      <BodyLong>
        <a href="/">Link</a>. Vestibulum tincidunt in dolor eget rhoncus.
        Aliquam vehicula, nisl id sollicitudin congue, tortor eros tempor odio,
        a eleifend est ex vitae libero.
      </BodyLong>
    </ShowMore>
    <p>
      Nå har du sett to eksempler på ShowMore. Det første brukte
      aside-elementet, mens det andre brukte section-elementet.
    </p>
  </div>
);

export const Long = () => (
  <div style={{ maxWidth: 400 }}>
    <BodyLong spacing>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec magna
      imperdiet, sodales ante ac, sodales felis.
    </BodyLong>

    <ShowMore heading="Heading" variant="subtle">
      <BodyLong>
        Curabitur ac commodo nisi, et tristique ligula. Vivamus vulputate luctus
        velit, sit amet luctus velit cursus eget. Donec iaculis fringilla nisl,
        sit amet finibus tortor pretium a. Donec enim urna, molestie vitae
        tristique vel, aliquet vel arcu. Curabitur ultrices ante in sem
        porttitor, quis semper enim faucibus. Proin tempus consectetur pharetra.
      </BodyLong>
      <BodyLong spacing>
        Nam id ipsum vel orci iaculis elementum nec rutrum metus. Donec
        vestibulum facilisis ullamcorper. Integer sagittis egestas ex ut
        faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Integer accumsan, diam pellentesque
        lacinia ultricies, nunc erat tempor risus, ut dignissim quam eros nec
        elit. Fusce eget congue est.
      </BodyLong>
      <BodyLong>
        Mauris a sem mattis, efficitur lorem sed, facilisis ex. Suspendisse
        potenti. Vestibulum viverra, leo ac bibendum maximus, purus neque mollis
        ligula, vel elementum risus odio eget felis. Proin pretium dolor erat.
        Praesent auctor, turpis at venenatis elementum, massa nisl eleifend
        dolor, et aliquet ligula arcu eu purus. Duis eu arcu molestie, tempus
        risus sed, ullamcorper metus. Quisque vel enim non metus semper maximus
        at a orci.
      </BodyLong>
    </ShowMore>

    <BodyLong spacing>
      Etiam id laoreet sem. Aenean finibus pellentesque nibh, id congue elit
      efficitur venenatis. Integer ut ligula maximus, sollicitudin risus nec,
      commodo orci. Quisque posuere nulla ac enim euismod, a convallis lectus
      finibus. Aliquam rhoncus sed nibh quis tincidunt. Quisque auctor sodales
      nunc, non facilisis nunc ornare at. Mauris id nunc sit amet quam tempor
      sollicitudin vel a augue. Maecenas eu risus eros. Fusce aliquam nibh
      nulla, ut consequat elit ultricies eget. Aliquam ut euismod erat. Aenean
      turpis odio, scelerisque eget enim in, sollicitudin sagittis erat.
    </BodyLong>
    <BodyLong spacing>
      Quisque massa tellus, condimentum id dui non, imperdiet sagittis sapien.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at luctus
      libero, vitae lacinia magna. Vestibulum sagittis libero nec viverra
      rhoncus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Quisque nec posuere neque. Nunc sodales tincidunt ante, vel volutpat ipsum
      iaculis eget. Aliquam posuere neque vel nulla hendrerit malesuada. Mauris
      elementum nibh mattis risus interdum, ac vulputate dolor aliquam. Quisque
      quis tempor lorem. Proin non sollicitudin erat. Nunc nibh neque, faucibus
      sit amet luctus vel, mattis sed tortor. Ut pretium purus non tortor
      elementum, in tempor mauris tincidunt. Interdum et malesuada fames ac ante
      ipsum primis in faucibus.
    </BodyLong>
    <BodyLong>
      Donec dolor arcu, sagittis nec lectus eu, dignissim congue augue. Aenean
      sit amet blandit eros, quis rutrum mauris. Phasellus accumsan est risus,
      sit amet vulputate nisi finibus ut. Ut in dui sem. Curabitur ornare,
      lectus at vestibulum consequat, lectus mi pretium enim, eu sagittis erat
      nibh ut ligula. Nulla porttitor sagittis mauris, a luctus augue cursus in.
      Cras efficitur mauris ac est ultrices, sagittis bibendum mi laoreet.
      Integer ac libero vel turpis finibus sagittis interdum eget ante. Ut
      tincidunt dolor non libero suscipit efficitur. Duis luctus, neque quis
      vulputate convallis, nulla nunc cursus erat, vitae maximus lacus est eu
      urna. Etiam non purus nisi. Praesent eget purus eget risus dignissim
      commodo.
    </BodyLong>
  </div>
);
