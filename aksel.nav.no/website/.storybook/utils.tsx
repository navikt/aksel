export function AkselTheme(Story) {
  return <div className="aksel-artikkel group/aksel">{Story()}</div>;
}

export function getKey() {
  return `${Math.random().toString(36).slice(2, 7)}`;
}

type BlockProps = { length?: number; heading?: boolean; link?: boolean };

export function getBlocks({
  length = 2,
  heading = false,
  link = true,
}: BlockProps): any[] {
  let blocks: any[] = [];

  [...Array(length).keys()].forEach((_, idx) =>
    blocks.push(getParagraph(link, idx))
  );

  if (heading) {
    blocks = [getHeading(), ...blocks];
  }
  return blocks;
}

const texts = [
  "Command station, this is ST 321. Code Clearance Blue. We're starting our approach.",
  "Deactivate the security shield. The security deflector shield will be deactivated when we have confirmation of your code transmission. Stand by. You are clear to proceed.",
  "Oh, my goodness! Do you understand anything they're saying? Oh, yes, Master Luke! Remember that I am fluent in over six million forms of communication.",
  "What are you telling them? Hello, I think. I could be mistaken. They're using a very primitive dialect. But I do believe they think I am some sort of god.",
  "Die Wanna Wanga! Oh, my! Die Wanna Wauaga. We -- we bring a message to your master, Jabba the Hutt...and a gift. Gift, what gift? Nee Jabba no badda. Me chaade su goodie.",
  "I do, yes, I do! Sick have I become. Old and weak. When nine hundred years old you reach, look as good you will not. Hmm? Soon will I rest.",
  "Oh, no. There goes our surprise attack. Look! Over there! Stop him! Not bad for a little furball. There's only one left.",
  "Center switch! Hey, wait! Ahhh! Move closer! Get alongside that one! Get him! Keep on that one! I'll take these two! Oh, General Solo, somebody's coming. Oh! Luke! Where's Leia? What? She didn't come back?",
  "I thought she was with you. We got separated. Hey, we better go look for her. Take the squad ahead. We'll meet at the shield generator at 0300. Come on, Artoo.",
  "I hope so, Commander, for your sake. The Emperor is not as forgiving as I am. Of course I'm worried. And you should be, too.",
  "I know that you are powerful, mighty Jabba, and that your anger with Solo must be equally powerful. I seek an audience with Your Greatness to bargain for Solo's life.",
  "With your wisdom, I'm sure that we can work out an arrangement which will be mutually beneficial and enable us to avoid any unpleasant confrontation. As a token of my goodwill, I present to you a gift: these two droids.",
];

function getParagraph(link: boolean, index: number) {
  const min = index % texts.length;
  const max = texts.length - 1;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;

  const paragraph = {
    _key: getKey(),
    children: [
      {
        _type: "span",
        marks: [],
        text: `${texts[random]}${link ? " " : " "}`,
        _key: getKey(),
      },
    ],
    markDefs: [
      {
        _type: "link",
        _key: "7f75ed319094",
        href: "https://example.com/",
      },
    ],
    _type: "block",
    style: "normal",
  };

  if (link && index % 3 === 0) {
    paragraph.children.push({
      _type: "span",
      marks: ["7f75ed319094"],
      text: "There'll be no escape for the Princess this time.",
      _key: getKey(),
    });
  }
  return paragraph;
}

function getHeading() {
  return {
    _key: getKey(),
    children: [
      {
        _type: "span",
        marks: [],
        text: "Heading",
        _key: getKey(),
      },
    ],
    markDefs: [],
    _type: "block",
    style: "h3",
  };
}
