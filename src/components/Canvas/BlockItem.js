import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import * as canvasActions from '../../actions/index';
import * as itemTypes from '../../constants/itemTypes/itemTypes';

class BlockItem extends Component {
    render() {
        const { columnIdx, columnNum, background, content, connectDragSource, isDragging, isDraggedFromCurrentBlock } = this.props;
        const BLOCK_WIDTH = 570;
        const BORDER_BOUNDRY_SIZE = 2;

        return connectDragSource(
            <div
                key={columnIdx}
                id={columnIdx}
                style={{
                    display: 'inline-block',
                    border: isDraggedFromCurrentBlock ? `${BORDER_BOUNDRY_SIZE}px solid lightgray` : `${BORDER_BOUNDRY_SIZE}px solid ${background}`,
                    cursor: 'move',
                    // opacity: isDragging ? 0.5 : 1,
                    width: `calc(${BLOCK_WIDTH / columnNum}px - ${2 * BORDER_BOUNDRY_SIZE}px)`,
                    height: '75px',
                    background: isDraggedFromCurrentBlock ? "repeating-linear-gradient(45deg, white, white 5px, lightgray 5px, lightgray 10px)" : background,
                }}
            >
                {/* Based on column.type different elements should be rendered, this is just for test: */}
                <p 
                    style={{ 
                        padding: "10px", 
                        textAlign: 'center', 
                        color: isDragging ? 'transparent' : 'black', 
                        fontSize: '16px', 
                        fontWeight: "bold" 
                        }}
                >
                    {content}
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        draggedElement: state.draggedElement.present
    };
};

export default DragSource(itemTypes.CUSTOMIZED_BLOCK_CHILD,
    {
        beginDrag(props, _, connect) {
            const { blockIndex, columnIdx, columnNum, content, background } = props;
            connect.context.store.dispatch(canvasActions.updateDraggedElement({
                type: itemTypes.CUSTOMIZED_BLOCK_CHILD,
                value: {
                    blockIndex, columnIdx, columnNum, content, background
                },
                source: itemTypes.ITEM_SOURCE_CANVAS
            }));
            return props;
        },
        endDrag(props, _, connect) {
            connect.context.store.dispatch(canvasActions.resetDraggedElement());
        }
    },
    (connect, monitor) => {
        return {
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging()
        }
    }
)(connect(mapStateToProps)(BlockItem));