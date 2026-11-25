import { differenceInDays, format } from "date-fns";
import { type ComponentType, useState } from "react";
import {
  type ObjectFieldProps,
  type ObjectInputProps,
  set,
  useClient,
  useFormValue,
} from "sanity";
import { HourglassBottomFilledIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, InfoCard } from "@navikt/ds-react";
import {
  DEFAULT_OUTDATED_THRESHOLD,
  SANITY_API_VERSION,
} from "../../sanity.env";

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
      onChange(set(updatePayload.updateInfo));
    } finally {
      setUpdating(false);
    }
  };

  return (
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
  );
};

const UpdateInfo: ComponentType<ObjectFieldProps> = (props) => {
  const verified = useFormValue(["updateInfo", "lastVerified"]);

  if (typeof verified !== "string") {
    return null;
  }

  // oxlint-disable-next-line react/purity -- Age relative to now is intended.
  const diffInDays = differenceInDays(new Date(), new Date(verified));
  const outdated = diffInDays >= DEFAULT_OUTDATED_THRESHOLD;

  if (!outdated) {
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
        <BodyLong size="small" spacing>
          En artikkel regnes som utdatert etter 12 måneder.
        </BodyLong>
        {props.children}
      </InfoCard.Content>
    </InfoCard>
  );
};

export { UpdateInfo, UpdateInfoInput };
