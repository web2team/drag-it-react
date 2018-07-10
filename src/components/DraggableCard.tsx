import * as React from "react";
import { Card } from "antd";
import { DragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";
const Meta = Card.Meta;

const boxSource = {
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top, type: "CARD" };
  }
};

class DraggableCard extends React.Component<any, any> {
  render() {
    const {
      left,
      top,
      hideSourceOnDrag,
      connectDragSource,
      isDragging
    } = this.props;

    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return connectDragSource(
      <div
        style={{
          width: 200,
          position: "relative",
          left,
          top
        }}
      >
        <Card
          //@ts-ignore
          hoverable={true}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(DraggableCard);
