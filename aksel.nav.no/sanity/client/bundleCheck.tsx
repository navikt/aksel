import { useEffect } from "react";
import config from "config:sanity";

const BUNDLE_CHECK_INTERVAL = 60 * 1000;
const BUNDLE_CHECK_INTERVAL_DECLINED = 60 * 10000;
const CHANGES_AVAILABLE_MESSAGE =
  "Studioet er har nye endringer! For å ta i bruk disse vil siden nå oppdateres for den nyeste versjonen.";

async function getCurrentHash() {
  const basePath = (config.project && config.project.basePath) || "/";
  const html = await window.fetch(basePath).then((res) => res.text());
  const [, hash] = html.match(/app\.bundle\.js\?(\w+)/) || [];
  return hash;
}

let hash = null;
let interval = null;

const BundleChecker = () => {
  useEffect(() => {
    getCurrentHash().then((newHash) => {
      hash = newHash;
    });

    interval = createInterval();

    return () => clearInterval(interval);
  }, []);

  // We're a react component, in theory, so return null to not render anything
  return null;
};

export default BundleChecker;

const createInterval = (declined?: boolean) =>
  setInterval(
    async () => {
      const newHash = await getCurrentHash();

      if (hash && newHash !== hash) {
        clearInterval(interval);

        if (window.confirm(CHANGES_AVAILABLE_MESSAGE)) {
          window.location.reload();
        } else {
          interval = createInterval(true);
        }
      }
    },
    declined ? BUNDLE_CHECK_INTERVAL_DECLINED : BUNDLE_CHECK_INTERVAL
  );
