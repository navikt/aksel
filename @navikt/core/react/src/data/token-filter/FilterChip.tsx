import React, { useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { ActionMenu } from "../../action-menu";
import { Popover } from "../../popover";
import type { ExternalToken, OperationT } from "./TokenFilter.types";

type TokenFilterChipsProps = {
  tokens: ExternalToken[];
  removeToken: (index: number) => void;
  operation: OperationT;
  updateOperation: (operation: OperationT) => void;
};

function TokenFilterChips(props: TokenFilterChipsProps) {
  const { tokens, removeToken, operation, updateOperation } = props;

  if (tokens.length === 0) {
    return null;
  }

  return (
    <ul className="aksel-property-filter__chips">
      {tokens.map((token, index) => (
        <TokenFilterChip
          key={`${token.propertyKey}-${token.operator}-${token.value}`}
          onRemove={() => removeToken(index)}
          token={token}
          showOperation={index > 0}
          operation={operation}
          updateOperation={updateOperation}
        />
      ))}
    </ul>
  );
}

type TokenFilterChipProps = {
  token: ExternalToken;
  onRemove: () => void;
  showOperation: boolean;
  operation?: OperationT;
  updateOperation?: (operation: OperationT) => void;
};

function TokenFilterChip(props: TokenFilterChipProps) {
  const { token, onRemove, showOperation, operation } = props;
  const [popupAnchor, setPopupAnchor] = useState<HTMLButtonElement | null>(
    null,
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <li className="aksel-property-filter__chip">
      {showOperation && (
        <ActionMenu>
          <ActionMenu.Trigger>
            <button
              type="button"
              className="aksel-property-filter__chip-button"
              data-type="operation"
              /* onClick={onRemove} */
            >
              {operation === "and" ? "og" : "eller"}
            </button>
          </ActionMenu.Trigger>
          <ActionMenu.Content>
            <ActionMenu.Item onSelect={() => props.updateOperation?.("and")}>
              AND
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => props.updateOperation?.("or")}>
              OR
            </ActionMenu.Item>
          </ActionMenu.Content>
        </ActionMenu>
      )}
      <button
        type="button"
        data-type="value"
        className="aksel-property-filter__chip-button"
        ref={setPopupAnchor}
        onClick={() => setIsPopupOpen((open) => !open)}
      >{`${token.propertyKey} ${token.operator} ${token.value}`}</button>
      <Popover
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        anchorEl={popupAnchor}
        placement="bottom-start"
      >
        <Popover.Content>Edit filter</Popover.Content>
      </Popover>
      <button
        type="button"
        data-type="remove"
        className="aksel-property-filter__chip-button"
        onClick={onRemove}
      >
        <XMarkIcon aria-hidden fontSize="1.25rem" />
      </button>
    </li>
  );
}

export { TokenFilterChips };
