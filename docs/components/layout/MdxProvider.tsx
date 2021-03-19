import { MDXProvider } from "@mdx-js/react";
import { Heading, Paragraph } from "@navikt/ds-react";
import Bash from "../code/Bash";
import Import from "../code/Import";
import Preview from "../code-preview/Preview";
import Npm from "../npm/Npm";
import TableOfContents from "../table-of-contents/TableOfContents";
/* import { Button } from "@navikt/ds-react"; */

const MdxWrapper = (props) => (
  <MDXProvider
    components={{
      h1: (props) => (
        <Heading
          id={props.children.replace(/\s/g, "-")}
          size="xxl"
          level={1}
          {...props}
        />
      ),
      h2: (props) => (
        <Heading
          id={props.children.replace(/\s/g, "-")}
          size="large"
          level={2}
          {...props}
        />
      ),
      h3: (props) => (
        <Heading
          id={props.children.replace(/\s/g, "-")}
          size="small"
          level={3}
          {...props}
        />
      ),
      p: (props) => <Paragraph size="medium" {...props} />,
      Bash,
      Preview,
      Import,
      Npm,
      TableOfContents,
    }}
    {...props}
  />
);

export default MdxWrapper;
