import * as React from "react";
import { GridComponentType } from "interface/Grid";
import { Chatting } from "components/Chatting";

class ComponentResolver {
  map = new Map();

  constructor() {
    this.map.set("CHATTING", Chatting);
  }

  getComponent(componentType: string) {
    return this.map.get(componentType);
  }
}

const resolver = new ComponentResolver();

export const getComponent = (componentType: string) => {
  return resolver.getComponent(componentType);
};
