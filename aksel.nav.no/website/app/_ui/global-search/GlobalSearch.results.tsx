"use client";

import { Heading, Label } from "@navikt/ds-react";
import { ChangeLogIconOutline } from "@/assets/Icons";
import { globalSearchConfig } from "./GlobalSearch.config";
import { GlobalSearchHitCollection } from "./GlobalSearch.hit";
import styles from "./GlobalSearch.module.css";
import { useGlobalSearch } from "./GlobalSearch.provider";

const GlobalSearchResults = () => {
  const { queryResults } = useGlobalSearch();

  const showEmptystate = !queryResults?.result;

  const showEmptySearchState =
    !queryResults?.result?.totalHits && queryResults?.query;

  const showQueryResults =
    queryResults?.result && queryResults?.result?.totalHits > 0;

  return (
    <div className={styles.searchResults}>
      {showEmptystate && <EmptyState />}
      {showEmptySearchState && <EmptySearchState />}
      {showQueryResults && (
        <section aria-label="Søkeresultater">
          <Label as="p" className="sr-only" aria-live="polite">
            {`${queryResults?.result?.totalHits} treff på "${queryResults?.query}"`}
          </Label>
          <div className="pb-4">
            {queryResults?.result.topResults.length > 0 && (
              <GlobalSearchHitCollection
                heading={
                  <span className="flex items-center gap-2">
                    Beste treff på {`"${queryResults?.query}"`}
                    <ChangeLogIconOutline className="shrink-0" />
                  </span>
                }
                hits={queryResults?.result.topResults}
              />
            )}
            <>
              {Object.entries(queryResults?.result.groupedHits)
                .sort(
                  (a, b) =>
                    globalSearchConfig[a[0]].index -
                    globalSearchConfig[b[0]].index,
                )
                .map(([key, val]) => {
                  return (
                    <GlobalSearchHitCollection
                      key={key}
                      heading={`${globalSearchConfig[key].display} (${val.length})`}
                      tag={key as keyof typeof globalSearchConfig}
                      hits={val}
                    />
                  );
                })}
            </>
          </div>
        </section>
      )}
    </div>
  );
};

function EmptySearchState() {
  return (
    <div className={styles.searchEmptyState}>
      <Heading
        size="medium"
        as="p"
        aria-live="polite"
        aria-atomic
        textColor="subtle"
      >
        Ingen resultater
      </Heading>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="200" height="200" fill="white" />
        <path
          d="M36.8896 98.813L33.6202 104.346C33.0894 105.244 33.0894 106.36 33.6202 107.258L36.8896 112.791C37.4046 113.663 38.3416 114.197 39.3538 114.197H46.2357C47.2593 114.197 48.2049 113.651 48.7159 112.764L51.9035 107.231C52.4131 106.347 52.4131 105.258 51.9035 104.373L48.7159 98.8403C48.2049 97.9534 47.2593 97.4069 46.2357 97.4069H39.3538C38.3416 97.4069 37.4046 97.9415 36.8896 98.813Z"
          fill="#D7E6F0"
        />
        <circle cx="111.98" cy="29.7801" r="6.56944" fill="#D7E6F0" />
        <circle
          cx="68.6985"
          cy="56.4138"
          r="32.9387"
          stroke="#417DA0"
          strokeWidth="6"
        />
        <path
          d="M82.9395 86.0389L105.044 135.401"
          stroke="#417DA0"
          strokeWidth="6"
        />
        <path
          d="M152.2 89.3289C153.037 88.6692 154.277 89.1075 154.514 90.1473L157.259 102.201C157.513 103.316 156.437 104.274 155.359 103.892L142.901 99.4864C141.822 99.105 141.588 97.6843 142.487 96.9767L152.2 89.3289Z"
          fill="#D7E6F0"
        />
        <path
          d="M137.588 51.1529C138.507 50.2337 139.997 50.2337 140.916 51.1529L147.471 57.7075C148.39 58.6267 148.39 60.1171 147.471 61.0363L140.916 67.5909C139.997 68.5101 138.507 68.5101 137.588 67.5909L131.033 61.0363C130.114 60.1171 130.114 58.6267 131.033 57.7075L137.588 51.1529Z"
          fill="#D7E6F0"
        />
        <ellipse
          cx="100"
          cy="154.406"
          rx="71.8774"
          ry="25.1185"
          fill="#417DA0"
        />
        <path
          d="M99.4819 149.73L107.052 176.809C107.06 176.84 107.088 176.863 107.121 176.865C114.966 177.401 122.847 176.745 130.496 174.919L130.795 174.848C130.833 174.839 130.854 174.798 130.839 174.762L124.026 158.612C121.323 152.204 121.484 144.947 124.467 138.665L124.895 137.764C126.37 134.656 127.04 131.228 126.842 127.794L125.767 109.138C125.642 106.966 123.664 105.381 121.517 105.732C119.983 105.983 118.458 105.239 117.711 103.875L117.093 102.746C116.307 101.311 114.59 100.666 113.053 101.229C111.776 101.696 110.343 101.335 109.44 100.318L108.582 99.3511C107.635 98.2838 106.043 98.085 104.862 98.8867C103.665 99.6995 102.049 99.4827 101.108 98.3833L100.284 97.4196C99.2512 96.2125 97.6171 95.7057 96.0827 96.1166C94.2793 96.5996 93.0253 98.2337 93.0253 100.101V116.757C93.0253 118.743 91.9525 120.574 90.2201 121.545C87.531 123.052 86.6102 126.478 88.1812 129.13L97.1533 144.278C98.1647 145.985 98.9476 147.818 99.4819 149.73Z"
          fill="#D7E6F0"
        />
        <path
          d="M61.248 48.5068V48.2486C61.248 45.2002 63.394 42.5731 66.3811 41.9648L66.7028 41.8993C68.733 41.4858 70.8304 42.1791 72.2142 43.7211V43.7211C74.1732 45.9039 74.2091 49.2012 72.2981 51.4262L70.5619 53.4477C70.2535 53.8067 69.9744 54.1898 69.7271 54.5933L69.4185 55.0969C67.905 57.5669 67.3567 60.5088 67.8786 63.3582V63.3582"
          stroke="#417DA0"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="68.5972" cy="70.0965" r="2.60311" fill="#417DA0" />
        <path
          d="M168.787 154.406C168.787 168.279 139.698 176.433 100.001 176.433C60.304 176.433 31.2148 168.279 31.2148 154.406"
          stroke="#417DA0"
          strokeWidth="6.18301"
        />
      </svg>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.searchEmptyState}>
      <Heading size="medium" as="span" aria-hidden data-state="hidden">
        Ingen resultater
      </Heading>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="200" height="200" fill="white" />
        <path
          d="M46.8963 30.8959L28.9467 61.6545C28.4969 62.4253 28.4969 63.3787 28.9467 64.1495L46.8963 94.9081C47.3399 95.6683 48.1538 96.1357 49.034 96.1357H85.9307C86.8206 96.1357 87.6419 95.658 88.082 94.8846L105.583 64.126C106.015 63.3671 106.015 62.4369 105.583 61.678L88.082 30.9194C87.6419 30.146 86.8206 29.6683 85.9307 29.6683H49.034C48.1538 29.6683 47.3399 30.1357 46.8963 30.8959Z"
          fill="#D7E6F0"
        />
        <path
          d="M112.59 68.7668L94.6401 99.5254C94.1903 100.296 94.1903 101.25 94.6401 102.02L112.59 132.779C113.033 133.539 113.847 134.007 114.727 134.007H151.624C152.514 134.007 153.335 133.529 153.775 132.755L171.276 101.997C171.708 101.238 171.708 100.308 171.276 99.5489L153.775 68.7903C153.335 68.0169 152.514 67.5392 151.624 67.5392H114.727C113.847 67.5392 113.033 68.0067 112.59 68.7668Z"
          fill="#D7E6F0"
        />
        <path
          d="M46.8963 105.092L28.9467 135.851C28.4969 136.621 28.4969 137.575 28.9467 138.346L46.8963 169.104C47.3399 169.864 48.1538 170.332 49.034 170.332H85.9307C86.8206 170.332 87.6419 169.854 88.082 169.081L105.583 138.322C106.015 137.563 106.015 136.633 105.583 135.874L88.082 105.116C87.6419 104.342 86.8206 103.864 85.9307 103.864H49.034C48.1538 103.864 47.3399 104.332 46.8963 105.092Z"
          fill="#D7E6F0"
        />
        <circle
          cx="89.7162"
          cy="97.1842"
          r="40.622"
          transform="rotate(-45 89.7162 97.1842)"
          stroke="#417DA0"
          strokeWidth="6"
        />
        <path
          d="M120.227 123L141.014 143.787"
          stroke="#417DA0"
          strokeWidth="6"
        />
        <path
          d="M141.014 143.787L161.801 164.574"
          stroke="#417DA0"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M124.264 47.8309L135.084 32.3734"
          stroke="#417DA0"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M136.629 56.3325L168.317 33.9191"
          stroke="#417DA0"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M142.039 71.0172L165.998 64.8342"
          stroke="#417DA0"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M66.4668 84.2435L79.9321 90.9761C81.0714 91.5458 81.0714 93.1716 79.9321 93.7412L66.4668 100.474"
          stroke="#417DA0"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M112.84 101.247L99.3746 94.5141C98.2353 93.9444 98.2353 92.3186 99.3746 91.7489L112.84 85.0163"
          stroke="#417DA0"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export { GlobalSearchResults };
