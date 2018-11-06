import { observable, computed, action, autorun } from "mobx";
import * as store from "store";

export class ProjectState {
  @observable
  private _currentProjectId: number;

  @computed
  get currentProjectId(): number { 
    return this._currentProjectId || store.get("currentProjectId");
  }

  set currentProjectId(currentProjectId: number) {
    store.set("currentProjectId", currentProjectId);
    this._currentProjectId = currentProjectId;
  }
}

export const projectState = new ProjectState();
