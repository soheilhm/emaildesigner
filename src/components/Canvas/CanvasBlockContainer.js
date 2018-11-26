import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from "react-dnd";
import * as itemTypes from '../../constants/itemTypes/itemTypes';
import CanvasStaticBlockDropZone from './CanvasStaticBlockDropZone';
import CanvasCustomizedBlockDropZone from './CanvasCustomizedBlockDropZone';
import CanvasBlock from './CanvasBlock';

class CanvasBlockContainer extends Component {
    render() {
        const { block, connectDropTarget, isOver, draggedElement } = this.props;
        const elementType = draggedElement && draggedElement.type;
        return connectDropTarget(
            <div id={`container-${block.index}`} style={{ margin: '1px' }}>
                <CanvasStaticBlockDropZone blockIndex={block.index} position="before" isOverBlock={isOver} shouldRender={elementType === itemTypes.STATIC_BLOCK} />
                <CanvasCustomizedBlockDropZone blockIndex={block.index} position="before" isOverBlock={isOver} shouldRender={elementType === itemTypes.CUSTOMIZED_BLOCK} />
                <CanvasBlock block={block} />
                <CanvasCustomizedBlockDropZone blockIndex={block.index} position="after" isOverBlock={isOver} shouldRender={elementType === itemTypes.CUSTOMIZED_BLOCK} />
                <CanvasStaticBlockDropZone blockIndex={block.index} position="after" isOverBlock={isOver} shouldRender={elementType === itemTypes.STATIC_BLOCK} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        canvasBlocks: state.canvasBlocks.present,
        draggedElement: state.draggedElement.present
    };
};

export default DropTarget([itemTypes.STATIC_BLOCK, itemTypes.CUSTOMIZED_BLOCK],
    {
        canDrop: (props) => true
    },
    (connect, monitor) => {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver(),                         // to detect outermost drop
            isOverCurrent: monitor.isOver({ shallow: true }), // to detect nested drop (greedy)
            canDrop: monitor.canDrop()
        }
    }
)(connect(mapStateToProps)(CanvasBlockContainer));