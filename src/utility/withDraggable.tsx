import * as React from "react";

interface DraggableProps {
  key: any;
  x: number;
  y: number;
  w: number;
  h: number;
  draggableHandle: string;
}
export const withDraggable = (Component: any) => {
  return class extends React.Component<DraggableProps, any> {
    render() {
      const { key, x, y, w, h, draggableHandle } = this.props;

      return (
        <div
          key={key}
          data-grid={{
            x,
            y,
            w,
            h,
            draggableHandle: draggableHandle
          }}
        >
          <Component />
        </div>
      );
    }
  };
};
