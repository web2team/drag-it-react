export enum GridComponentType {
  CHATTING
}

export interface GridData {
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

export interface GridDraggableProps {
  gridData: GridData;
  gridComponentType: string;
  gridComponentProps?: any;
}
