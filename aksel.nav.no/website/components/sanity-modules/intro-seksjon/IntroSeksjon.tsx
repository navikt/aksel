import ErrorBoundary from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { AkselGrunnleggendeDocT, AkselKomponentDocT } from "@/types";
import { List, ListItem } from "@/web/List";
import { TextWithMarkdown } from "@/web/TextWithMarkdown";

type IntroProps = {
  node: AkselKomponentDocT["intro"] | AkselGrunnleggendeDocT["intro"];
  internal?: boolean;
};

const Intro = ({ node, internal }: IntroProps) => {
  if (!node || !node.body || !node.brukes_til) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 id="intro" className="sr-only">
        Intro
      </h2>
      <SanityBlockContent blocks={node.body} />
      <div className="mt-7 space-y-6">
        <List title="Egnet til:">
          {internal && <ListItem icon>Bruk på interne flater</ListItem>}
          {node.brukes_til.map((x) => (
            <ListItem icon key={x}>
              <TextWithMarkdown>{x}</TextWithMarkdown>
            </ListItem>
          ))}
        </List>
        {node?.brukes_ikke_til && (
          <List title="Uegnet til:">
            {node.brukes_ikke_til.map((x) => (
              <ListItem icon key={x}>
                <TextWithMarkdown>{x}</TextWithMarkdown>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

export default function Component(props: IntroProps) {
  return (
    <ErrorBoundary boundaryName="Intro-modul">
      <Intro {...props} />
    </ErrorBoundary>
  );
}
