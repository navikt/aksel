import React from "react";
import Tekstomrade, {
  createDynamicHighlightingRule,
  HighlightRule,
  BoldRule,
} from "nav-frontend-tekstomrade";

const Example = () => (
  <Tekstomrade
    rules={[HighlightRule, BoldRule, createDynamicHighlightingRule(["ruk"])]}
  >
    {"*Vi* kan bruke helt egne regler _her_"}
  </Tekstomrade>
);

export default Example;
