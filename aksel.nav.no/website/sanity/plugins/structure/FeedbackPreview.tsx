import { Alert, BodyLong, Heading, Loader } from "@navikt/ds-react";
import { Card } from "@sanity/ui";
import {
  IntentButton,
  Preview,
  getPublishedId,
  useClient,
  useSchema,
} from "sanity";
import useSWR from "swr";

export function FeedbackView(props) {
  const { documentId } = props;

  const schema = useSchema();

  const schemaType = schema.get("aksel_feedback");

  const client = useClient({ apiVersion: "2021-06-07" });
  const { data, error, isValidating } = useSWR(
    `*[_type == "aksel_feedback" && references($id)]`,
    (query) =>
      client.fetch(query, {
        id: documentId,
      })
  );

  if (isValidating) {
    return (
      <div className="grid place-items-center px-6">
        <div className="mx-auto mt-24">
          <Loader size="xlarge" variant="neutral" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center">
        <div className="mx-auto mt-24 px-6">
          En feil oppstod, prøv å laste side på nytt eller kontakt utvikler.
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="grid place-items-center">
        <div className="mx-auto mt-24 px-6">
          Siden har ingen tilbakemeldinger enda.
        </div>
      </div>
    );
  }

  const done = data.filter((x) => x?.behandlet === true);
  const notDone = data.filter((x) => x?.behandlet === false);

  return (
    <div className="grid place-items-center">
      <div className="mx-auto mt-4 w-full px-6">
        <Alert variant="info">
          Løsning for tilbakemeldinger på Aksel er midlertidig slått av.
        </Alert>
        <div className="mt-7">
          <Heading level="2" size="small" spacing>
            Tilbakemeldinger
          </Heading>
          {notDone.length === 0 && (
            <BodyLong textColor="subtle">Ingen nye tilbakemeldinger</BodyLong>
          )}
          <ul>
            {notDone.map((x) => (
              <li key={x._id}>
                <Card flex={1}>
                  <IntentButton
                    key={x._id}
                    intent="edit"
                    mode="ghost"
                    padding={1}
                    radius={0}
                    params={{
                      type: "aksel_feedback",
                      id: getPublishedId(x._id),
                    }}
                    style={{ width: "100%" }}
                  >
                    <Preview
                      schemaType={schemaType}
                      value={x}
                      key={x._id}
                      layout="default"
                    />
                  </IntentButton>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        {done.length > 0 && (
          <div className="mt-7">
            <Heading level="2" size="small" spacing>
              Ferdig behandet
            </Heading>
            <ul>
              {done.map((x) => (
                <li key={x._id}>
                  <Card flex={1}>
                    <IntentButton
                      intent="edit"
                      mode="bleed"
                      radius={2}
                      params={{
                        type: "aksel_feedback",
                        id: getPublishedId(x._id),
                      }}
                    >
                      <Preview schemaType={schemaType} value={x} key={x._id} />
                    </IntentButton>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
