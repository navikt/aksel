import React, { useState, useEffect, useRef } from "react";
import { withDocument } from "part:@sanity/form-builder";
import {
  TextInput,
  Stack,
  Label,
  Checkbox,
  Radio,
  Flex,
  Text,
  Box,
  Card,
} from "@sanity/ui";
import styled from "styled-components";
/* TODO: Implement this. Issue now is that document returns null in props */
const CustomDisplay = React.forwardRef((props, ref) => {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    doc && setDoc(props.document);
  }, [props]);

  return (
    <Stack space={0} ref={ref}>
      <Card padding={0}>T</Card>
    </Stack>
  );
});

export default withDocument(CustomDisplay);
