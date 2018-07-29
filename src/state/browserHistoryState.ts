import { observable, computed, action, autorun } from "mobx";
import { createBrowserHistory } from "history";

class BrowserHistoryState {
  @observable currentPath: string = "";
  history: any;

  constructor() {
    this.history = createBrowserHistory();

    this.history.listen((location, action) => {
      browserHistoryState.setCurrentPath(location.pathname);
    });
  }

  @computed
  get getCurrentPath() {
    return this.currentPath;
  }
  @action
  setCurrentPath(path: string) {
    this.currentPath = path;
  }

  push(path: string) {
    this.history.push(path);
  }

  get getHistory() {
    return this.history;
  }
}

export const browserHistoryState = new BrowserHistoryState();
