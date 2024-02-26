import { expectTypeOf } from "vitest";
import { ModalProps } from "./types";

test("ModalProps works as intended", () => {
  expectTypeOf({
    header: { heading: "Label" },
    children: "OK",
  }).toMatchTypeOf<ModalProps>();

  expectTypeOf({
    header: { heading: "Label" },
    "aria-label": "Label",
    children: "OK",
  }).toMatchTypeOf<ModalProps>();

  expectTypeOf({
    header: { heading: "Label" },
    "aria-labelledby": "Label",
    children: "OK",
  }).toMatchTypeOf<ModalProps>();

  expectTypeOf({
    "aria-label": "Label",
    children: "OK",
  }).toMatchTypeOf<ModalProps>();

  expectTypeOf({
    "aria-labelledby": "Label",
    children: "OK",
  }).toMatchTypeOf<ModalProps>();

  expectTypeOf({
    "aria-label": "Label",
    open: true,
    onClose: () => null,
    children: "OK",
  }).toMatchTypeOf<ModalProps>();

  expectTypeOf({
    children: "Mangler label",
  }).not.toMatchTypeOf<ModalProps>();

  expectTypeOf({
    open: true,
    children: "Mangler onClose eller label",
  }).not.toMatchTypeOf<ModalProps>();

  expectTypeOf({
    open: true,
    "aria-label": "Label",
    children: "Mangler onClose",
  }).not.toMatchTypeOf<ModalProps>();

  expectTypeOf({
    open: true,
    onClose: () => null,
    children: "Mangler label",
  }).not.toMatchTypeOf<ModalProps>();

  expectTypeOf({
    header: { heading: "Label" },
    open: true,
    children: "Mangler onClose",
  }).not.toMatchTypeOf<ModalProps>();

  expectTypeOf({
    header: { heading: "Label" },
    "aria-label": "Label",
    "aria-labelledby": "Label",
    children: "For mange labels",
  }).not.toMatchTypeOf<ModalProps>();

  expectTypeOf({
    "aria-label": "Label",
    "aria-labelledby": "Label",
    children: "For mange labels",
  }).not.toMatchTypeOf<ModalProps>();
});
