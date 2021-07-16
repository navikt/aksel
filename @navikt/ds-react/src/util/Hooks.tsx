import { useContext, useEffect, useState } from "react";
import { FieldsetContext } from "../index";
import { v4 as uuidv4 } from "uuid";

export function useFormHandler({ error, errorId: oldErrorId, id: oldId }) {
  const [intId, setIntId] = useState("");
  const [intErrorId, setIntErrorId] = useState("");
  const [errorMsg, setErrorMsg] = useState<string>();
  const [errorId, setErrorId] = useState<string>();
  const [id, setId] = useState("");

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

  return { isInvalid: !!errorMsg, errorMsg, errorId, id };
}
