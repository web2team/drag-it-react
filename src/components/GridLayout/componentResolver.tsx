import { Chatting } from "components/Chatting";
import { Calendar } from "components/Calendar";
import { TextEditor } from "components/TextEditor";
import { GridLayoutItemType } from "interface/GridLayout";

// componentRosolver 
// 컴포넌트 타입에 맞는 인스턴스를 반환해줌
// if - else refactorying -> map container
class ComponentResolver {
  map = new Map();

  constructor() {
    this.map.set(GridLayoutItemType.CHATTING, Chatting);
    this.map.set(GridLayoutItemType.CALENDAR, Calendar);
    this.map.set(GridLayoutItemType.TEXT_EDITOR, TextEditor);
  }

  getComponent(componentType: string) {
    return this.map.get(componentType);
  }
}

const resolver = new ComponentResolver();

export const getComponent = (componentType: string) => {
  return resolver.getComponent(componentType);
};
