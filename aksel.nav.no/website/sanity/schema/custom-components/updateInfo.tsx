import { differenceInDays, differenceInMonths, format } from "date-fns";
import { ComponentType, useState } from "react";
import {
  ObjectFieldProps,
  ObjectInputProps,
  set,
  useClient,
  useFormValue,
} from "sanity";
import { HourglassBottomFilledIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Button, InfoCard } from "@navikt/ds-react";
import { SANITY_API_VERSION } from "@/sanity/config";

const UpdateInfoInput: ComponentType<ObjectInputProps> = (props) => {
  const { onChange, readOnly } = props;

  const client = useClient({ apiVersion: SANITY_API_VERSION });

  const documentId = useFormValue(["_id"]) as string | undefined;

  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    if (!documentId) return;

    setUpdating(true);
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const publishedId = documentId.replace(/^drafts\./, "");
      const updatePayload = { updateInfo: { lastVerified: today } };

      await client
        .patch(publishedId)
        .set(updatePayload)
        .commit()
        .catch(() => {
          console.warn(
            `Failed to update lastVerified for document ${publishedId}. Document might not be published yet.`,
          );
        });
      onChange(set(updatePayload));
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Box marginBlock="space-16 space-0">
      <Button
        size="small"
        variant="primary"
        loading={updating}
        onClick={handleUpdate}
        disabled={readOnly}
        data-color="neutral"
      >
        Oppdater godkjenningsdato
      </Button>
    </Box>
  );
};

const UpdateInfo: ComponentType<ObjectFieldProps> = (props) => {
  const articleType = useFormValue(["_type"]);

  const verified: any = useFormValue(["updateInfo", "lastVerified"]);

  if (!verified) {
    return null;
  }

  const diff = differenceInMonths(new Date(), new Date(verified));
  const diffInDays = differenceInDays(new Date(), new Date(verified));
  const outDated = diff >= (articleType === "aksel_artikkel" ? 12 : 6);

  if (!outDated) {
    return null;
  }

  return (
    <InfoCard size="small" data-color="warning">
      <InfoCard.Header icon={<HourglassBottomFilledIcon aria-hidden />}>
        <InfoCard.Title>
          Artikkelen er utdatert ({diffInDays} dager siden sist godkjent)
        </InfoCard.Title>
      </InfoCard.Header>
      <InfoCard.Content style={{ background: "transparent" }}>
        <BodyLong size="small" spacing>
          Artikkelen trenger ny godkjenning. Les gjennom og oppdater innholdet,
          for så å oppdatere godkjenningsdatoen.
        </BodyLong>
        <BodyLong size="small">
          {articleType === "aksel_artikkel"
            ? "En God praksis-artikkel regnes som utdatert etter 12 måneder."
            : "En Designsystem-artikkel regnes som utdatert etter 6 måneder."}
        </BodyLong>
        {props.children}
      </InfoCard.Content>
    </InfoCard>
  );
};

export { UpdateInfo, UpdateInfoInput };
