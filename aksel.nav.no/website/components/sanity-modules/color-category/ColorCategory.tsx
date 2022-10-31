import { AmplitudeEvents, logAmplitudeEvent } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Modal, Table } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import ColorModal from "./modal/ColorModal";
import { GlobalTableRow, SemanticTableRow } from "./Rows";
import { compare } from "./sort";

const ColorCategory = ({
  node,
}: {
  node: SanityT.Schema.ds_color_categories;
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const router = useRouter();

  const setQuery = useCallback(
    (color: string) => {
      const query = router.query;
      query.color = color;
      router.replace(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const logColorClick = useCallback((c: any) => {
    logAmplitudeEvent(AmplitudeEvents.fargeklikk, {
      farge: c.full_title,
    });
  }, []);

  const handleSelect = useCallback(
    (c: any) => {
      if (!c) {
        return;
      }

      logColorClick(c);
      setSelectedColor(c);
      setOpen(true);
      setQuery(c.full_title.slice(2));
    },
    [logColorClick, setQuery]
  );

  const handlePageEntry = useCallback((c: any) => {
    if (!c) {
      return;
    }
    setSelectedColor(c);
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedColor(null);

    const query = router.query;
    delete query["color"];

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  useEffect(() => {
    router.query.color &&
      handlePageEntry(
        node.colors.find((x) => x.full_title === `--${router.query.color}`)
      );
  }, [handlePageEntry, node.colors, router.query]);

  node.colors.sort(compare);

  return (
    <div className="mb-8">
      {node?.description && <SanityBlockContent blocks={node?.description} />}
      {node.colors[0].color_type === "global" ? (
        <div className="flex w-auto max-w-[calc(theme(spacing.text)_-_2rem)] flex-col rounded shadow-[0_0_0_1px] shadow-border-muted">
          {node.colors?.map((color, i) => (
            <GlobalTableRow
              onClick={() => handleSelect(color)}
              prop={color}
              key={color._key}
              first={i === 0}
              last={i === node.colors.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[400px] table-fixed">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="text-text-muted">
                  Token
                </Table.HeaderCell>
                {node.colors[0].color_type === "semantic" && (
                  <Table.HeaderCell className="text-text-muted">
                    Rolle
                  </Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {node.colors?.map((color) => (
                <SemanticTableRow
                  onClick={() => handleSelect(color)}
                  prop={color}
                  key={color._key}
                />
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
      <Modal open={open} onClose={() => handleClose()}>
        <Modal.Content>
          {selectedColor && <ColorModal color={selectedColor} />}
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default withErrorBoundary(ColorCategory, "Fargekategori");
