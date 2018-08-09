import * as React from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface DraggableProps {
  x: number;
  y: number;
  w: number;
  h: number;
  draggableHandle: string;
}
interface Props {
  draggableProps: DraggableProps;
}
export const withDraggable = (Component: any) => {
  return class extends React.Component<Props, any> {
    render() {
      const { x, y, w, h, draggableHandle } = this.props.draggableProps;

      return (
        <div
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
