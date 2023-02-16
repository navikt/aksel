import React from "react";
import { ExpansionCard } from ".";
import ExpansionCardContent from "./ExpansionCardContent";
import ExpansionCardHeader from "./ExpansionCardHeader";
import { Star } from "@navikt/ds-icons";

export default {
  title: "ds-react/ExpansionCard",
  component: ExpansionCard,
  subcomponents: [ExpansionCardHeader, ExpansionCardContent],
};

export const Default = {
  render: () => {
    return (
      <div
        style={{
          width: "600px",
          minHeight: "100vh",
          padding: "10rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <ExpansionCard>
          <ExpansionCard.Header
            description="odit quaerat exercitationem fugit veritatis"
            title="Tittel"
          />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header title="Tittel" />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header
            avatar={<Star aria-hidden />}
            title="Tittel"
            description="odit quaerat exercitationem fugit veritatis"
          />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header avatar={<Star aria-hidden />} title="Tittel" />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header
            avatar={<Star aria-hidden />}
            title="Tittel"
            avatarVariant="neutral"
          />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header
            avatar={<Star aria-hidden />}
            title="Tittel"
            avatarVariant="success"
          />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header
            avatar={<Star aria-hidden />}
            title="Tittel"
            avatarVariant="warning"
          />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header
            avatar={<Star aria-hidden />}
            title="Tittel"
            avatarVariant="danger"
          />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header
            avatar={<Star aria-hidden />}
            title="Tittel"
            avatarVariant="info"
          />
          <ExpansionCard.Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cum soluta consequatur tempora sint alias non nostrum, delectus,
            eveniet, odit quaerat exercitationem fugit veritatis! Alias qui
            molestiae porro placeat? Non.
          </ExpansionCard.Content>
        </ExpansionCard>
      </div>
    );
  },
};
