import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from "react-dnd";
import * as canvasActions from '../../actions/index';
import * as itemTypes from '../../constants/itemTypes/itemTypes';

class CanvasStaticBlockDropZone extends Component {
    render() {
        const { isOverCurrent, shouldRender, isOverBlock, connectDropTarget } = this.props;

        if (!shouldRender) {
            return null;
        }

        return connectDropTarget(
            <div
                style={{
                    display: isOverBlock ? 'block' : 'none',
                    padding: '2px 0',
                    lineHeight: '40px',
                    height: '60px',
                    margin: '0',
                    border: isOverCurrent ? '2px solid orange' : '2px solid lightgray',
                    background: isOverCurrent ? "repeating-linear-gradient(45deg, white, white 5px, orange 5px, orange 10px)" : "repeating-linear-gradient(45deg, white, white 5px, lightgray 5px, lightgray 10px)"
                }}
            >
                <p style={{ textAlign: 'center' }}>DROP HERE</p>
            </div>
        );
    }
}


const mapStateToProps = state => state;

export default DropTarget(itemTypes.STATIC_BLOCK,
    {
        canDrop: (props) => true,
        drop: (props, _, connect) => {
            const { blockIndex, position } = props;
            const state = connect.context.store.getState();
            const draggedElement = state.draggedElement;
            if (draggedElement.type === itemTypes.STATIC_BLOCK) {
                connect.context.store.dispatch(canvasActions.insertNewBlock({
                    droppedBlockIdx: blockIndex,
                    droppedPosition: position,
                    block: draggedElement.value
                }));
            }
        }
    },
    (connect, monitor) => {
        return {
            connectDropTarget: connect.dropTarget(),
            isOverCurrent: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop()
        }
    }
)(connect(mapStateToProps)(CanvasStaticBlockDropZone));