import defaultResolve, {
  PublishAction,
} from "part:@sanity/base/document-actions";
import SetAndPublishAction from "./actions/publishedAt";
/* import SetPrivateAction from "./actions/set-private"; */
import { allDocumentTypes } from "../config";

export default function resolveDocumentActions(props) {
  const [publish, ...rest] = defaultResolve(props).map((Action) => {
    return allDocumentTypes.includes(props.type) && Action === PublishAction
      ? SetAndPublishAction
      : Action;
  });
  return [publish /* SetPrivateAction */, ...rest];
}
