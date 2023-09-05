import React from "react";
import { Skeleton } from ".";
import { Alert } from "../alert";
import { Button } from "../button";
import { Checkbox } from "../form";
import { BodyLong, Heading } from "../typography";

export default {
  title: "ds-react/Skeleton",
  component: Skeleton,
  decorators: [
    (Story) => (
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  render: () => (
    <div>
      <Skeleton>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
        voluptas sint dolore omnis quia consequatur beatae vero cum officia
        debitis. Quidem debitis omnis reprehenderit nobis rerum. Nulla, magnam?
        Saepe, eveniet? Test
      </Skeleton>
      <Skeleton>
        <Alert variant="info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          voluptas sint dolore omnis quia consequatur beatae vero cum officia
          debitis. Quidem debitis omnis reprehenderit nobis rerum. Nulla,
          magnam? Saepe, eveniet?
        </Alert>
      </Skeleton>
      <Skeleton>
        <BodyLong>
          Quidem debitis omnis reprehenderit nobis rerum. Nulla, magnam? Saepe,
          eveniet?
        </BodyLong>
        <Checkbox value="test">Valg 1</Checkbox>
        <Checkbox value="tes2">Valg 2</Checkbox>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Button>Send inn</Button>
          <Button>Tilbake</Button>
        </div>
      </Skeleton>
    </div>
  ),
};

export const Shapes = {
  render: () => (
    <>
      <Skeleton variant="text"></Skeleton>
      <Skeleton variant="circle" width={60} height={60}></Skeleton>
      <Skeleton variant="rectangle" width={200} height={40}></Skeleton>
      <Skeleton variant="rounded" width={200} height={40}></Skeleton>
    </>
  ),
};

export const WrappingComponents = {
  render: () => (
    <Skeleton style={{ display: "grid", gap: "0.5rem" }}>
      <BodyLong>
        Quidem debitis omnis reprehenderit nobis rerum. Nulla, magnam? Saepe,
        eveniet?
      </BodyLong>
      <Checkbox value="test">Valg 1</Checkbox>
      <Checkbox value="tes2">Valg 2</Checkbox>
      <div style={{ display: "flex", gap: "2rem" }}>
        <Button>Send inn</Button>
        <Button>Tilbake</Button>
      </div>
    </Skeleton>
  ),
};

export const TextSizing = {
  render: () => (
    <div style={{ display: "grid", width: 300 }}>
      <Skeleton>
        <Heading level="1" size="xlarge">
          Placeholder
        </Heading>
      </Skeleton>
      <Skeleton>
        <BodyLong>Placeholder</BodyLong>
      </Skeleton>
      <BodyLong as={Skeleton}>Placeholder</BodyLong>
    </div>
  ),
};

export const NativeText = {
  render: () => (
    <div>
      <h1>
        <Skeleton>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          voluptas sint dolore omnis quia consequatur beatae vero cum officia
          debitis. Quidem debitis omnis reprehenderit nobis rerum. Nulla,
          magnam? Saepe, eveniet?
        </Skeleton>
      </h1>
      <Skeleton>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          voluptas sint dolore omnis quia consequatur beatae vero cum officia
          debitis. Quidem debitis omnis reprehenderit nobis rerum. Nulla,
          magnam? Saepe, eveniet?
        </p>
      </Skeleton>
    </div>
  ),
};

export const InlineText = {
  render: () => (
    <BodyLong>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
      voluptas sint dolore <Skeleton as="span">omnis quia consequatur</Skeleton>{" "}
      beatae vero cum officia debitis. Quidem debitis omnis reprehenderit nobis
      rerum. Nulla, magnam? Saepe, eveniet?
    </BodyLong>
  ),
};
