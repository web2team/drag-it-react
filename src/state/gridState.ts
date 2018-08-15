import { observable, computed, action, autorun } from "mobx";
import * as store from "store";

export class GridState {
  @observable
  private _currentGridLayoutId: number;

  @computed
  get currentGridLayoutId(): number {
    return this._currentGridLayoutId || store.get("currentGridLayoutId");
  }

  set currentGridLayoutId(currentGridLayoutId: number) {
    store.set("currentGridLayoutId", currentGridLayoutId);
    this._currentGridLayoutId = currentGridLayoutId;
  }
}

export const gridState = new GridState();
