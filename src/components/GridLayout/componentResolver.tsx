import { Chatting } from "components/Chatting";
import { Calendar } from "components/Calendar";
import { GridLayoutItemType } from "interface/GridLayout";

class ComponentResolver {
  map = new Map();

  constructor() {
    this.map.set(GridLayoutItemType.CHATTING, Chatting);
    this.map.set(GridLayoutItemType.CALENDAR, Calendar);
  }

  getComponent(componentType: string) {
    return this.map.get(componentType);
  }
}

const resolver = new ComponentResolver();

export const getComponent = (componentType: string) => {
  return resolver.getComponent(componentType);
};
