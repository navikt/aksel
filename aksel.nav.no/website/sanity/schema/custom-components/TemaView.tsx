import { Card, Heading, Stack } from "@sanity/ui";
import { useEffect, useState } from "react";
import {
  getPublishedId,
  IntentButton,
  Preview,
  useClient,
  useFormValue,
  useSchema,
} from "sanity";

export function TemaView() {
  const client = useClient({ apiVersion: "2021-06-07" });
  const title = useFormValue([`title`]);
  const schema = useSchema();

  const [tema, setTema] = useState([]);

  const type = schema.get("aksel_artikkel");

  useEffect(() => {
    const query = `*[_type == "aksel_tema" && !(_id in path("drafts.**"))]{_id,title,seksjoner, "artikler":*[_type == "aksel_artikkel" && !(_id in path("drafts.**")) && ^._id in tema[]._ref]{_id}}`;
    client.fetch(query).then(setTema);
  }, [client]);

  const sider = tema
    .find((x) => x.title === title)
    ?.["seksjoner"]?.reduce(
      (b, n) => [...b, ...(n?.sider?.map((x) => x._ref) ?? [])],
      []
    );
  const artikler = tema.find((x) => x.title === title)?.["artikler"];

  if (!sider || !artikler) {
    return null;
  }

  const notFound = artikler.filter((x) => !sider.includes(x._id));

  return (
    <Stack space={3}>
      <Heading size={1}>
        {`Artikler ikke i seksjoner (${notFound.length})`}
      </Heading>
      {notFound.map((x) => (
        <Card key={x._id} flex={1}>
          <IntentButton
            intent="edit"
            mode="ghost"
            padding={1}
            radius={0}
            params={{
              type: "aksel_artikkel",
              id: getPublishedId(x._id),
            }}
            style={{ width: "100%" }}
          >
            <Preview layout="default" schemaType={type} value={x} key={x._id} />
          </IntentButton>
        </Card>
      ))}
    </Stack>
  );
}
