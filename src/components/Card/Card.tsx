import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "components/dragExamples/ItemTypes";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move"
};

const cardSource = {
  beginDrag(props: any) {
    return {
      id: props.id, 
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props: any, monitor: any, component: any) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const DOMNode: Element = findDOMNode(component) as Element;
    const hoverBoundingRect = DOMNode.getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    console.log(hoverIndex);

    props.moveCard(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card extends Component<any, any> {
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (connectDropTarget(
        connectDragSource(<div style={{...style, opacity}}>{text}</div>)
    ));
  }
}
