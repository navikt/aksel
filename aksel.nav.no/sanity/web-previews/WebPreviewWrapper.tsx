import { ExternalLink, Refresh } from "@navikt/ds-icons";
import { Button, Detail, HelpText, Link } from "@navikt/ds-react";
import { CopyToClipboard } from "@navikt/ds-react-internal";
import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  iframe {
    height: 100%;
    width: 100%;
  }
  height: 100%;
  width: 100%;
`;

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
`;

const ScTop = styled.div`
  padding: 0.25rem 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--card-shadow-outline-color);
`;

export const WebPreviewWrapper = (props: { url: string; dev?: boolean }) => {
  const reloadIframe = () => {
    const el: HTMLIFrameElement | null =
      document &&
      (document.getElementById("preview-iframe") as HTMLIFrameElement);
    if (el) {
      el.src = el.src;
    }
  };

  return (
    <StyledWrapper>
      <ScTop>
        <Detail size="small" style={{ overflowX: "auto" }}>
          {props.url}
        </Detail>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {props.dev && (
            <Link href="https://doc.nais.io/device/">Krever NAISDevice</Link>
          )}
          <CopyToClipboard
            size="small"
            popoverText={"Kopierte lenke"}
            copyText={props.url}
          >
            Kopier
          </CopyToClipboard>
          <Button
            size="small"
            onClick={() => reloadIframe()}
            icon={<Refresh title="refresh preview" />}
          />
          <Button
            as="a"
            target="_blank"
            href={props.url}
            size="small"
            icon={<ExternalLink title="Åpne preview i nytt vindu" />}
          />
        </div>
      </ScTop>
      <StyledDiv>
        <iframe id="preview-iframe" src={props.url} frameBorder={0} />
      </StyledDiv>
    </StyledWrapper>
  );
};
