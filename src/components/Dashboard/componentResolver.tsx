import * as React from "react";
import { GridComponentType } from "interface/Grid";
import { Chatting } from "components/Chatting";

class ComponentResolver {
  map = new Map();

  constructor() {
    this.map.set(GridComponentType.CHATTING, Chatting);
  }

  getComponent(componentType: GridComponentType) {
    return this.map.get(componentType);
  }
}

const resolver = new ComponentResolver();

export const getComponent = (componentType) => {
  return resolver.getComponent(componentType);
};
