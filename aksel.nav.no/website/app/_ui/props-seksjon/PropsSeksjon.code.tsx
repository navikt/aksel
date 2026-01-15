"use client";

import { Highlight } from "prism-react-renderer";
import { Box } from "@navikt/ds-react";
import { AkselPrismTheme } from "@/app/_ui/code-block/CodePrismTheme";
import styles from "./PropsSeksjon.module.css";

function PropsSeksjonCode({
  code,
  title,
  wrap = false,
}: {
  code?: string;
  title: string;
  wrap?: boolean;
}) {
  if (!code || code === `""`) {
    return null;
  }

  return (
    <li className={styles.propsSeksjonLi}>
      <div className={styles.propsSeksjonLiTitle}>{`${title}:`}</div>

      <div className={styles.propsSeksjonCodeExample}>
        <Highlight code={code} language="tsx" theme={AkselPrismTheme}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <Box
              style={style}
              overflowX="auto"
              as={wrap ? "div" : "pre"}
              paddingInline="space-8"
              borderRadius="4"
            >
              <code>
                {tokens.map((line, i) => (
                  <div
                    key={i}
                    {...getLineProps({ line })}
                    className={styles.propsSeksjonCode}
                  >
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </Box>
          )}
        </Highlight>
      </div>
    </li>
  );
}

export { PropsSeksjonCode };
