import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, VStack } from "@navikt/ds-react";
import { Code } from "../typography/Code";
import styles from "./PropsSeksjon.module.css";

function PropsSeksjonDescription({
  description,
  params,
  returnVal,
}: {
  description: string | undefined;
  params: string[] | undefined;
  returnVal: string | undefined;
}) {
  if (!description) {
    return null;
  }

  return (
    <li className={styles.propsSeksjonLi}>
      <div className={styles.propsSeksjonLiTitle}>Description:</div>

      <div>
        <VStack gap="space-8" marginInline="space-8">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: Code,
              a: LinkWrapper,
            }}
          >
            {description}
          </Markdown>
          {params && (
            <ul>
              {params.map((param) => {
                const [name, ...desc] = param.split(" ");
                return (
                  <li key={param}>
                    <strong>{name}: </strong>
                    {desc.join(" ")}
                  </li>
                );
              })}
            </ul>
          )}
          {returnVal && (
            <div>
              <strong>Return: </strong>
              {returnVal}
            </div>
          )}
        </VStack>
      </div>
    </li>
  );
}

function LinkWrapper({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  return <Link href={href}>{children}</Link>;
}

export { PropsSeksjonDescription };
