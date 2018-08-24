import { ChatThread } from "interface/Chat";
import { Styled } from "interface/global";
import { User } from "interface/User";

export interface GridLayoutProps extends Styled {
  gridLayoutId: number;
  userId: number;
}

export interface GridLayout {
  id: number;
  name: string;
  user: User;
}

export interface GridLayoutItem {
  id: number;
  gridLayout: GridLayout;
  gridLayoutItemProps: GridLayoutItemProps;
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

export enum GridLayoutItemType {
  CHATTING = "CHATTING",
  CALENDAR = "CALENDAR"
}

export interface GridLayoutItemProps {
  id: number;
  type: GridLayoutItemType;
  chatThread?: ChatThread;
}
