import { authState } from "state/authState";
import { browserHistoryState } from "state/browserHistoryState";
import { gridState } from "./gridState";
import { projectState } from "./projectState";

const store = {
  authState,
  browserHistoryState,
  gridState,
  projectState
};

export default store;
