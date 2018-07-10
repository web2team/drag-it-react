import React, { Component } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { DropTarget, DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import ItemTypes from "./ItemTypes";
import SmallCalender from "./SmallCalender";
import DraggableCard from "./DraggableCard";

const styles = {
  width: "100%",
  height: "100%",
  position: "relative"
};

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    console.log("_", item);
    if (item.type === "BOX") {
      component.moveBox(item.id, left, top);
    }
    if (item.type === "CARD") {
      component.moveCard(item.id, left, top);
    }
  }
};

class Container extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      boxes: {
        a: { top: 200, left: 80 }
      },
      cards: {
        b: { top: 200, left: 500 }
      }
    };
  }

  moveBox(id, left, top) {
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top }
          }
        }
      })
    );
  }

  moveCard(id, left, top) {
    this.setState(
      update(this.state, {
        cards: {
          [id]: {
            $merge: { left, top }
          }
        }
      })
    );
  }

  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props;
    const { boxes, cards } = this.state;

    return connectDropTarget(
      // @ts-ignore
      <div style={styles}>
        <div style={{ position: "absolute" }}>
          {Object.keys(boxes).map(key => {
            const { left, top, title } = boxes[key];
            return (
              <SmallCalender
                key={key}
                id={key}
                left={left}
                top={top}
                hideSourceOnDrag={hideSourceOnDrag}
              />
            );
          })}
        </div>
        <div>
          {Object.keys(cards).map(key => {
            const { left, top, title } = cards[key];
            return (
              <DraggableCard
                key={key}
                id={key}
                left={left}
                top={top}
                hideSourceOnDrag={hideSourceOnDrag}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(
  DropTarget(ItemTypes.BOX, boxTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(Container)
);
