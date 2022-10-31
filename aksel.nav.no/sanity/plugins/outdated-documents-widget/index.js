/* https://github.com/sanity-io/dashboard-widget-document-list/blob/master/src/DocumentList.js */

import client from "@sanity/client";
import { Button, Flex } from "@sanity/ui";
import { DashboardWidget } from "@sanity/dashboard";

import React, { useEffect, useState, useRef, useCallback } from "react";
import config from "../../config";
import SanityConfig from "../../sanity.json";
import moment from "moment";
import styles from "./widget.css";
import { Item, List } from "part:@sanity/components/lists/default";
import { IntentLink } from "part:@sanity/base/router";
import { getPublishedId } from "part:@sanity/base/util/draft-utils";
import { Tag } from "@navikt/ds-react";

const sanityClient = client({
  projectId: SanityConfig.api.projectId,
  dataset: SanityConfig.api.dataset,
  apiVersion: "2020-06-19",
  useCdn: false,
});

const OutDatedComponents = ({ type }) => {
  const query = `*[_type in [${config.allDocumentTypes.map((x) => `"${x}"`)}]]`;
  const [docs, setDocs] = useState([]);
  const [loading, setloading] = useState(true);
  const [timer, setTimer] = useState(new Date());
  const [fromTime, setFromTime] = useState(moment(new Date()).fromNow());

  const success = (v) => {
    setDocs(
      v
        .filter((x) => {
          if (!x?._updatedAt) return false;
          const lastUpdate = moment(x._updatedAt);
          const daysSince = moment().diff(lastUpdate, "days");
          return type === "error"
            ? daysSince > 180
            : daysSince >= 90 && daysSince < 180;
        })
        .sort((a, b) => {
          const lastUpdateA = moment(a._updatedAt);
          const lastUpdateB = moment(b._updatedAt);
          return lastUpdateA.diff(lastUpdateB, "days");
        })
    );
    setloading(false);
    setTimer(new Date());
  };

  const load = useCallback(() => {
    setloading(true);
    sanityClient.fetch(query).then(success, (e) => console.error(e));
  }, []);

  useEffect(() => {
    load();
  }, []);

  /* Refreshes every 5 minutes */
  useEffect(() => {
    const interval = setInterval(() => {
      load();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFromTime(moment(timer).fromNow());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const refresh = () => {
    load();
  };

  const footer = (
    <Flex direction="column" align="stretch">
      <Button
        fontSize={[2]}
        tone="primary"
        paddingX={2}
        paddingY={4}
        text={`Updated ${fromTime}`}
        onClick={() => refresh()}
        mode="bleed"
        loading={loading}
        disabled={loading}
      />
    </Flex>
  );

  return (
    <DashboardWidget
      header={type === "error" ? "Utdaterte sider" : "Stagnerte sider"}
      footer={footer}
    >
      <List>
        {docs &&
          docs.map((doc) => {
            const lastUpdate = moment(doc._updatedAt);
            const daysSince = moment().diff(lastUpdate, "days");

            return (
              <Item key={doc._id}>
                <IntentLink
                  intent="edit"
                  params={{
                    type: doc._type,
                    id: getPublishedId(doc._id),
                  }}
                  className={styles.link}
                >
                  <span className={styles.spacing}>
                    <Tag size="small" variant={type}>
                      {daysSince}d
                    </Tag>
                    {doc?.heading}
                  </span>
                </IntentLink>
              </Item>
            );
          })}
      </List>
    </DashboardWidget>
  );
};

export default {
  name: "outdated-documents-widget",
  component: OutDatedComponents,
};
