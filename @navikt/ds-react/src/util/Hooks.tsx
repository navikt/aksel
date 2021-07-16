import { useContext, useEffect, useState } from "react";
import { FieldsetContext } from "../index";
import { v4 as uuidv4 } from "uuid";

export function useFormHandler(props) {
  const {
    error,
    errorId: oldErrorId,
    id: oldId,
    disabled,
    size: oldSize,
    ...rest
  } = props;

  const [intId, setIntId] = useState("");
  const [intErrorId, setIntErrorId] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [errorId, setErrorId] = useState<string>();
  const [id, setId] = useState("");
  const [renderErrorMsg, setRenderErrorMsg] = useState(false);
  const [size, setSize] = useState("m");

  const context = useContext(FieldsetContext);

  useEffect(() => {
    setIntId(() => uuidv4());
    setIntErrorId(() => uuidv4());
  }, []);

  useEffect(() => {
    setErrorMsg(context.error ?? error);
  }, [error, context.error]);

  useEffect(() => {
    setErrorId(context.errorId ?? oldErrorId ?? intErrorId);
  }, [oldErrorId, context.errorId, intErrorId]);

  useEffect(() => {
    setId(oldId ?? intId);
  }, [oldId, intId]);

  useEffect(() => {
    setRenderErrorMsg(!context.error && !!errorMsg && !disabled);
  }, [context.error, disabled, errorMsg]);

  useEffect(() => {
    setSize(oldSize ? oldSize : context.size ?? "m");
  }, [context.size, oldSize]);

  return {
    isInvalid: !!errorMsg && !disabled,
    errorMsg,
    errorId,
    id,
    renderErrorMsg,
    size,
    restProps: rest,
  };
}
