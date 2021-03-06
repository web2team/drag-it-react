import * as React from "react";
import { Card } from "antd";
import { DragSource } from "react-dnd";
import ItemTypes from "components/dragExamples/ItemTypes";

const Meta = Card.Meta;

const boxSource = {
  beginDrag(props: any) {
    const {id, left, top} = props;
    return {id, left, top, type: "CARD"};
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  hideSourceOnDrag: true
}))
export default class DraggableCard extends React.Component<any, any> {
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
              hoverable={true}
              cover={
                <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
          >
            <Meta title="Europe Street beat" description="www.instagram.com"/>
          </Card>
        </div>
    );
  }
}