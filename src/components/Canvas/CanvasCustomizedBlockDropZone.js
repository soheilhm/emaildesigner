import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from "react-dnd";
import * as canvasActions from '../../actions/index';
import * as itemTypes from '../../constants/itemTypes/itemTypes';

class CanvasCustomizedBlockDropZone extends Component {
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
                    border: isOverCurrent ? '2px solid purple' : '2px solid lightgray',
                    background: isOverCurrent ? "repeating-linear-gradient(45deg, white, white 5px, #e6a9fc 5px, #e6a9fc 10px)" : "repeating-linear-gradient(45deg, white, white 5px, lightgray 5px, lightgray 10px)"
                }}
            >
                <p style={{ textAlign: 'center' }}>DROP HERE</p>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default DropTarget(itemTypes.CUSTOMIZED_BLOCK,
    {
        canDrop: (props) => true,
        drop: (props, _, connect) => {
            const { blockIndex, position } = props;
            const state = connect.context.store.getState();
            const draggedElement = state.draggedElement.present;
            if (draggedElement.type === itemTypes.CUSTOMIZED_BLOCK) {
                const draggedBlockIdx = draggedElement.value.index;
                connect.context.store.dispatch(canvasActions.swapBlocks({
                    draggedBlockIdx,
                    droppedPosition: position,
                    droppedBlockIdx: blockIndex
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
)(connect(mapStateToProps)(CanvasCustomizedBlockDropZone));