/* eslint-disable react/jsx-no-undef */
export const Page = () => {
  return (
    <SpeechBubble
      illustration={<Illustration />}
      topText="Ola Normann 01.01.21 14:00"
      backgroundColor="red"
      illustrationBgColor="blue"
    >
      <SpeechBubble.Bubble>
        Aute minim nisi sunt mollit duis sunt nulla minim non proident.
      </SpeechBubble.Bubble>
      <SpeechBubble.Bubble>
        Tempor fugiat amet eu sint in in ullamco.
      </SpeechBubble.Bubble>
      <SpeechBubble.Bubble>
        Adipisicing laborum est eu laborum est sit in commodo enim sint laboris
        labore nisi ut.
      </SpeechBubble.Bubble>
    </SpeechBubble>
  );
};
