import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { MenuElipsisVerticalCircleIcon } from "@navikt/aksel-icons";
import { FileItem, FileUpload } from ".";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { ActionMenu } from "../../overlays/action-menu";

const meta: Meta<typeof FileUpload.Item> = {
  title: "ds-react/FileUpload/Item",
  component: FileUpload.Item,
  decorators: [
    (Story) => (
      <div style={{ width: 400, maxWidth: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const onDelete = (file: FileItem) => alert(`Delete ${file.name}`);
const onRetry = (file: FileItem) => alert(`Retry ${file.name}`);
const fileTxt = new File(["abc".repeat(10000)], "file.txt");
const filePng = new File(["abc".repeat(10000)], "file.png");
const filePdf = new File(["abc".repeat(100000)], "file.pdf");
const fileXlsx = new File(["abc"], "file.xlsx");
const fileCsv = new File(["abc"], "file.csv");
const filePptx = new File(["abc"], "file.pptx");
const fileWebp = new File(["abc"], "file.webp");
const fileDocx = new File(["abc"], "file.docx");

export const Icons: StoryFn = () => {
  return (
    <FileUpload>
      <VStack gap="5" as="ul">
        <FileUpload.Item file={fileTxt} as="li" />
        <FileUpload.Item file={filePng} as="li" />
        <FileUpload.Item file={fileWebp} as="li" />
        <FileUpload.Item file={filePdf} as="li" />
        <FileUpload.Item file={fileDocx} as="li" />
        <FileUpload.Item file={fileDocx} as="li" status="uploading" />
        <FileUpload.Item file={fileDocx} as="li" status="downloading" />
        <FileUpload.Item file={fileXlsx} as="li" />
        <FileUpload.Item file={fileCsv} as="li" />
        <FileUpload.Item file={filePptx} as="li" />
      </VStack>
    </FileUpload>
  );
};

export const States: StoryFn = () => {
  return (
    <div>
      <h2>Error</h2>
      <FileUpload.Item file={fileTxt} error="Plain error" />
      <h3>error + status</h3>
      <FileUpload.Item
        file={fileTxt}
        error="Error og uploading"
        status="uploading"
        button={{
          onClick: () => onDelete(fileTxt),
          action: "delete",
        }}
      />
      <h2>Item Actions</h2>
      <h3>status + delete</h3>
      <FileUpload.Item
        file={fileDocx}
        status="uploading"
        button={{
          onClick: () => onDelete(fileDocx),
          action: "delete",
        }}
      />
      <h3>status + retry</h3>
      <FileUpload.Item
        file={fileDocx}
        status="downloading"
        button={{
          onClick: () => onRetry(fileDocx),
          action: "retry",
        }}
      />
      <h3>retry</h3>
      <FileUpload.Item
        file={fileCsv}
        button={{
          onClick: () => onRetry(fileCsv),
          action: "retry",
        }}
      />
      <h3>delete</h3>
      <FileUpload.Item
        file={filePptx}
        button={{
          onClick: () => onDelete(filePptx),
          action: "delete",
        }}
      />
      <h3>retry + error</h3>
      <FileUpload.Item
        file={fileCsv}
        error="Error og onRetry"
        button={{
          onClick: () => onRetry(fileCsv),
          action: "retry",
        }}
      />
      <h3>delete + error</h3>
      <FileUpload.Item
        file={filePptx}
        error="Error og onDelete"
        button={{
          onClick: () => onDelete(filePptx),
          action: "delete",
        }}
      />
    </div>
  );
};

export const CustomButton: StoryFn = () => {
  return (
    <FileUpload.Item
      file={{ name: "custom button.png", size: 200000 }}
      button={
        <ActionMenu>
          <ActionMenu.Trigger>
            <Button
              variant="tertiary-neutral"
              icon={<MenuElipsisVerticalCircleIcon aria-hidden />}
            />
          </ActionMenu.Trigger>
          <ActionMenu.Content>
            <ActionMenu.Group label="Systemer og oppslagsverk">
              <ActionMenu.Item onSelect={console.info}>
                Action one
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info}>
                Action two
              </ActionMenu.Item>
            </ActionMenu.Group>
          </ActionMenu.Content>
        </ActionMenu>
      }
    />
  );
};

export const Download: StoryFn = () => {
  return (
    <VStack gap="5">
      <FileUpload.Item
        file={{
          name: "with onClick.txt",
          size: 1_048_576,
        }}
        onFileClick={() => alert("onFileClick")}
      />
      <FileUpload.Item
        file={{
          name: "with href.txt",
          size: 1,
        }}
        href="https://www.nav.no"
      />
      <FileUpload.Item
        file={{
          name: "without href/onFileClick.txt",
          size: 2_000_000,
        }}
      />
      <FileUpload.Item file={fileTxt} />
    </VStack>
  );
};

export const Description: StoryFn = () => {
  return (
    <VStack gap="5">
      <FileUpload.Item file={fileTxt} description="Mottat 11.11.11" />
      <FileUpload.Item
        file={fileTxt}
        description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim officiis nisi beatae quia non iste nihil accusantium nobis amet, officia eius, repellendus a cupiditate, commodi eos! Quis illum repudiandae exercitationem."
      />
    </VStack>
  );
};
