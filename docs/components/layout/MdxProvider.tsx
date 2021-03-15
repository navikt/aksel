import { MDXProvider } from "@mdx-js/react";
import { Heading, Paragraph } from "@navikt/ds-react";
/* import Bash from "../code/Bash";
import Preview from "../code-preview/Preview";
import Npm from "../npm/Npm"; */
/* import { Button } from "@navikt/ds-react"; */

const MdxWrapper = (props) => (
  <MDXProvider
    components={{
      h1: (props) => <Heading size="xxl" level={1} {...props} />,
      h2: (props) => <Heading size="large" level={2} {...props} />,
      h3: (props) => <Heading size="small" level={3} {...props} />,
      p: (props) => <Paragraph size="medium" {...props} />,
      /* Bash,
      Preview,
      Npm, */
    }}
    {...props}
  />
);

export default MdxWrapper;
