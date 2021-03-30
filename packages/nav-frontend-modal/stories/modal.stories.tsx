import React from "react";
import Modal from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Modal",
  component: Modal,
} as Meta;

const Template = ({
  closeButton,
  isOpen,
  shouldCloseOnOverlayClick,
  ...args
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={() => null}
    closeButton={closeButton}
    contentLabel="Min modalrute"
  >
    <div>
      Innhold som vises i modal
      <p>
        Eu veniam nulla dolore culpa sint esse consectetur commodo non esse id.
        Aliquip nostrud incididunt quis minim aute eiusmod non fugiat nisi.
        Proident irure officia laboris ex in cupidatat minim cillum
        reprehenderit velit velit aliquip duis. Velit amet consequat aliquip
        reprehenderit consequat sunt occaecat ea aliqua incididunt fugiat enim
        dolore.
      </p>
    </div>
  </Modal>
);

export const All = Template.bind({});
All.args = {
  closeButton: true,
  isOpen: true,
};
