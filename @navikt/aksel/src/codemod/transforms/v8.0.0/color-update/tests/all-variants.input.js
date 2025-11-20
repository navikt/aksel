import { Tag } from "@navikt/ds-react";

const Component = () => {
  return <div>
    <Tag variant="info">Text</Tag>
    <Tag variant="info-moderate">Text</Tag>
    <Tag variant="info-filled">Text</Tag>
    <Tag data-color="info" variant="info">Text</Tag>
    <Tag data-color="info" variant="info-moderate">Text</Tag>
    <Tag data-color="info" variant="info-filled">Text</Tag>
  </div>;
}
