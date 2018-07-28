import * as React from "react";
import { Calendar } from "antd";
import { DragSource } from "react-dnd";
import ItemTypes from "components/dragExamples/ItemTypes";

const boxSource = {
  beginDrag(props: any) {
    const { id, left, top } = props;
    return { id, left, top, type: "BOX" };
  }
};

class SmallCalender extends React.Component<any, any> {
  render() {
    const {
      hideSourceOnDrag,
      left,
      top,
      connectDragSource,
      isDragging,
      children
    } = this.props;

    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return connectDragSource(
      <div
        style={{
          width: 300,
          border: "1px solid #d9d9d9",
          position: "relative",
          borderRadius: 4,
          left,
          top
        }}
      >
        <Calendar fullscreen={false} />
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(SmallCalender);
