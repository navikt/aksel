"use client";

import { Highlight, themes } from "prism-react-renderer";
import { Box } from "@navikt/ds-react";
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
  if (!code) {
    return null;
  }

  return (
    <li className={styles.propsSeksjonLi}>
      <div className={styles.propsSeksjonLiTitle}>{`${title}:`}</div>

      <div className={styles.propsSeksjonCodeExample}>
        <Highlight code={code} language="tsx" theme={themes.github}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <Box
              style={style}
              overflowX="auto"
              as={wrap ? "div" : "pre"}
              paddingInline="space-8"
              borderRadius="medium"
            >
              {tokens.map((line, i) => (
                <code
                  key={i}
                  {...getLineProps({ line })}
                  className={styles.propsSeksjonCode}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </code>
              ))}
            </Box>
          )}
        </Highlight>
      </div>
    </li>
  );
}

export { PropsSeksjonCode };
