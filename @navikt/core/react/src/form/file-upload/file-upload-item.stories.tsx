import { Meta, StoryObj } from "@storybook/react";
import React, { useRef, useState } from "react";
import { FileItem, FileUpload } from "..";
import { Button } from "../../button";
import { HStack, VStack } from "../../layout/stack";
import { Heading } from "../../typography";

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

export const Default: StoryObj<typeof FileUpload.Item> = {
  render: (props) => <FileUpload.Item {...props} file={fileDocx} />,
  args: {
    error: "",
    href: "",
  },
  argTypes: {
    status: {
      options: [undefined, "uploading", "downloading"],
      control: { type: "radio" },
    },
  },
};

export const Icons: StoryObj<typeof FileUpload.Item> = {
  render: () => (
    <FileUpload>
      <VStack gap="5" as="ul">
        <FileUpload.Item file={fileTxt} as="li" />
        <FileUpload.Item file={filePng} as="li" />
        <FileUpload.Item file={filePdf} as="li" />
        <FileUpload.Item file={fileDocx} as="li" />
        <FileUpload.Item file={fileDocx} as="li" status="uploading" />
        <FileUpload.Item file={fileDocx} as="li" status="downloading" />
        <FileUpload.Item file={fileXlsx} as="li" />
        <FileUpload.Item file={fileCsv} as="li" />
        <FileUpload.Item file={filePptx} as="li" />
        <FileUpload.Item file={fileWebp} as="li" />
      </VStack>
    </FileUpload>
  ),
};

export const Error: StoryObj<typeof FileUpload.Item> = {
  render: () => (
    <VStack gap="5">
      <Heading size="small">Vanlig error</Heading>
      <FileUpload.Item file={fileTxt} error="Plain error" />
      <Heading size="small">Error og uploading</Heading>
      <FileUpload.Item
        file={fileTxt}
        error="Error og uploading"
        status="uploading"
        onRetry={() => onRetry(fileTxt)}
        onDelete={() => onDelete(fileTxt)}
      />
    </VStack>
  ),
};

export const Buttons: StoryObj<typeof FileUpload.Item> = {
  render: () => (
    <VStack gap="5">
      <FileUpload.Item
        file={fileDocx}
        onDelete={() => onDelete(fileDocx)}
        onRetry={() => onRetry(fileDocx)}
        status="uploading"
        itemAction="delete"
      />
      <FileUpload.Item
        file={fileDocx}
        onDelete={() => onDelete(fileDocx)}
        onRetry={() => onRetry(fileDocx)}
        status="downloading"
        itemAction="retry"
      />
      <FileUpload.Item
        file={fileCsv}
        error="Error og onRetry"
        onRetry={() => onRetry(fileCsv)}
        itemAction="retry"
      />
      <FileUpload.Item
        file={filePptx}
        error="Error og onDelete"
        onDelete={() => onDelete(filePptx)}
        itemAction="delete"
      />
    </VStack>
  ),
};

export const Download: StoryObj = {
  render: () => (
    <VStack gap="5">
      <FileUpload.Item
        file={{
          name: "withOnClick.txt",
          size: 1_048_576,
        }}
        onClick={() => alert("onClick")}
      />
      <FileUpload.Item
        file={{
          name: "withOnClickAndDelete.txt",
          size: 600_000_000,
        }}
        onClick={() => alert("onClick")}
        onDelete={() =>
          onDelete({
            name: "withOnClickAndDelete.txt",
            size: 600_000_000,
          })
        }
      />
      <FileUpload.Item
        file={{
          name: "withHref.txt",
          size: 1,
        }}
        href="https://www.nav.no"
      />
      <FileUpload.Item
        file={{
          name: "withHrefAndDelete.txt",
          size: 1,
        }}
        onDelete={() =>
          onDelete({
            name: "withHref.txt",
            size: 1,
          })
        }
        href="https://www.nav.no"
      />
      <FileUpload.Item
        file={{
          name: "withoutHrefOrOnClick.txt",
          size: 2_000_000,
        }}
      />
      <FileUpload.Item file={fileTxt} />
    </VStack>
  ),
};

export const Animated: StoryObj = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [files, setFiles] = useState<any>({
      first: {
        file: fileTxt,
        status: undefined,
        error: undefined,
        onRetry: undefined,
        onDelete: undefined,
      },
      second: {
        file: filePdf,
        status: undefined,
        error: undefined,
        onRetry: undefined,
        onDelete: undefined,
      },
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const timeout = useRef<NodeJS.Timeout>();

    const start = () => {
      setFiles({
        first: {
          file: fileTxt,
          status: "uploading",
          error: undefined,
          onRetry: undefined,
          onDelete: undefined,
        },
        second: {
          file: filePdf,
          status: "uploading",
          error: undefined,
          onRetry: undefined,
          onDelete: undefined,
        },
      });

      timeout.current = setTimeout(() => {
        setFiles({
          first: {
            file: fileTxt,
            status: undefined,
            error: "Failed to upload",
            onRetry: () => null,
            onDelete: undefined,
          },
          second: {
            file: filePdf,
            status: "uploading",
            error: undefined,
            onRetry: undefined,
            onDelete: undefined,
          },
        });
        timeout.current = setTimeout(
          () =>
            setFiles({
              first: {
                file: fileTxt,
                status: undefined,
                error: "Kunne ikke laste opp filen",
                onRetry: () => null,
                onDelete: undefined,
              },
              second: {
                file: filePdf,
                status: undefined,
                error: "Filen er for stor. Maks 20MB",
                onRetry: undefined,
                onDelete: () => null,
              },
            }),
          1500,
        );
      }, 2000);
    };

    return (
      <VStack gap="6">
        <VStack gap="3">
          <FileUpload.Item
            file={files.first.file}
            status={files.first.status}
            error={files.first.error}
            onRetry={files.first.onRetry}
          />
          <FileUpload.Item
            file={files.second.file}
            status={files.second.status}
            error={files.second.error}
            onRetry={files.second.onRetry}
          />
        </VStack>

        <HStack gap="2">
          <Button onClick={start}>Start</Button>
          <Button
            onClick={() => {
              timeout.current && clearTimeout(timeout.current);
              start();
            }}
          >
            Restart
          </Button>
        </HStack>
      </VStack>
    );
  },
};
