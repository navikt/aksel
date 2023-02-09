import { Meta } from "@storybook/react";
import React from "react";
import {
  BodyLong as DsBodyLong,
  BodyShort as DsBodyShort,
  Detail as DsDetail,
  ErrorMessage as DsErrorMessage,
  Ingress as DsIngress,
  Label as DsLabel,
} from "..";

export default {
  title: "ds-react/Typography",
  component: DsBodyLong,
  subcomponents: {
    DsBodyShort,
    DsDetail,
    DsErrorMessage,
    DsIngress,
    DsLabel,
  },
} as Meta;

export const Ingress = () => (
  <>
    <DsIngress spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsIngress>
    <DsIngress>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsIngress>
  </>
);

export const BodyLong = () => (
  <>
    <DsBodyLong spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip. Aute amet
      occaecat ex aliqua irure elit labore pariatur. Proident pariatur proident
      pariatur magna consequat velit id commodo quis sunt tempor ullamco aliquip
      pariatur.
    </DsBodyLong>
    <DsBodyLong>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip. Aute amet
      occaecat ex aliqua irure elit labore pariatur. Proident pariatur proident
      pariatur magna consequat velit id commodo quis sunt tempor ullamco aliquip
      pariatur.
    </DsBodyLong>
  </>
);

export const BodyLongSmall = () => (
  <>
    <DsBodyLong size="small" spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip. Aute amet
      occaecat ex aliqua irure elit labore pariatur. Proident pariatur proident
      pariatur magna consequat velit id commodo quis sunt tempor ullamco aliquip
      pariatur.
    </DsBodyLong>
    <DsBodyLong size="small">
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip. Aute amet
      occaecat ex aliqua irure elit labore pariatur. Proident pariatur proident
      pariatur magna consequat velit id commodo quis sunt tempor ullamco aliquip
      pariatur.
    </DsBodyLong>
  </>
);

export const BodyShort = () => (
  <>
    <DsBodyShort spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsBodyShort>
    <DsBodyShort>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsBodyShort>
  </>
);

export const BodyShortSmall = () => (
  <>
    <DsBodyShort size="small" spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsBodyShort>
    <DsBodyShort size="small">
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsBodyShort>
  </>
);

export const Label = () => (
  <>
    <DsLabel spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsLabel>
    <DsLabel>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsLabel>
  </>
);

export const LabelSmall = () => (
  <>
    <DsLabel size="small" spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsLabel>
    <DsLabel size="small">
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsLabel>
  </>
);

export const Detail = () => (
  <>
    <DsDetail spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsDetail>
    <DsDetail>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsDetail>
  </>
);

export const DetailUppercase = () => (
  <>
    <DsDetail spacing uppercase>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsDetail>
    <DsDetail uppercase>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsDetail>
  </>
);

export const DetailSmall = () => (
  <>
    <DsDetail size="small" spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsDetail>
    <DsDetail size="small">
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsDetail>
  </>
);

export const ErrorMessage = () => (
  <>
    <DsErrorMessage spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsErrorMessage>
    <DsErrorMessage>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsErrorMessage>
  </>
);

export const ErrorMessageSmall = () => (
  <>
    <DsErrorMessage size="small" spacing>
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsErrorMessage>
    <DsErrorMessage size="small">
      Deserunt veniam eu fugiat ad est occaecat aliqua nisi aliquip.
    </DsErrorMessage>
  </>
);
