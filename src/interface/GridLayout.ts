import { ChatThread } from "interface/Chat";
import { Styled } from "interface/global";

export interface GridLayoutProps extends Styled {
  gridLayoutId: number;
  userId: number;
}

export enum GridLayoutItemType {
  CHATTING = "CHATTING"
}

export interface GridLayoutItem {
  id: number;
  gridLayoutItemType: GridLayoutItemType;
  gridLayoutItemProps?: GridLayoutItemProps;
  gridLayoutItemPosition: GridLayoutItemPosition;
}

export interface GridLayoutItemPosition {
  key: string;

  x: number;
  y: number;
  w: number;
  h: number;

  maxH?: number;
  maxW?: number;
  minH?: number;
  minW?: number;

  isDraggable?: boolean;
  isResizable?: boolean;
  static?: boolean;
  draggableHandle?: string;
}

export interface GridLayoutItemProps {
  id: number;
  chatThread?: ChatThread;
}
