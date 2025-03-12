"use client";

import { disableDraftMode, enableDraftMode } from "../actions";

export const Toggle = () => (
  <div>
    <button onClick={enableDraftMode}>enable</button>
    <button onClick={disableDraftMode}>disable</button>
  </div>
);
