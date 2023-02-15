import React from "react";
import { ExpansionPanel } from ".";
import ExpansionPanelContent from "./ExpansionPanelContent";
import ExpansionPanelHeader from "./ExpansionPanelHeader";
import { Star } from "@navikt/ds-icons";

export default {
  title: "ds-react/ExpansionPanel",
  component: ExpansionPanel,
  subcomponents: [ExpansionPanelHeader, ExpansionPanelContent],
};

export const Default = {
  render: () => {
    return (
      <div
        style={{
          width: "600px",
          height: "100vh",
          padding: "10rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <ExpansionPanel>
          <ExpansionPanel.Header
            description="odit quaerat exercitationem fugit veritatis"
            title="Tittel"
          />
          <ExpansionPanel.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionPanel.Content>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanel.Header title="Tittel" />
          <ExpansionPanel.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionPanel.Content>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanel.Header
            avatar={<Star aria-hidden />}
            title="Tittel"
            description="odit quaerat exercitationem fugit veritatis"
          />
          <ExpansionPanel.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionPanel.Content>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanel.Header avatar={<Star aria-hidden />} title="Tittel" />
          <ExpansionPanel.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionPanel.Content>
        </ExpansionPanel>
      </div>
    );
  },
};
