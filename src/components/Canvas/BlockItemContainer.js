import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from "react-dnd";
import * as itemTypes from '../../constants/itemTypes/itemTypes';
import BlockItem from './BlockItem';
import BlockItemDropZone from './BlockItemDropZone';

class BlockItemContainer extends Component {
    render() {
        const { data, blockIndex, draggedElement, isOver, connectDropTarget } = this.props;
        const { paddingTop, paddingBottom, columnNum, columns } = data;
        const elementIsBlockItem = draggedElement && draggedElement.type === itemTypes.CUSTOMIZED_BLOCK_CHILD;
        return connectDropTarget(
            <div>
                <div
                    style={{
                        padding: `${paddingTop}px 10px ${paddingBottom}px`,
                        border: "2px solid #e0cb7f",
                        cursor: 'move',
                        background: "repeating-linear-gradient(45deg, white, white 5px, #e0cb7f 5px, #e0cb7f 10px)",
                        position: 'relative'
                    }}
                >
                    <div style={{ margin: '0 auto', width: '570px' }} >
                        {columns.map((column, index) =>
                            <div
                                key={column.columnIdx}
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    height: 75
                                }}
                            >
                                <BlockItemDropZone blockIndex={blockIndex} columnNum={columnNum} {...column} isOverBlockItem={isOver} shouldRender={elementIsBlockItem} />
                                <BlockItem blockIndex={blockIndex} columnNum={columnNum} {...column} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        draggedElement: state.draggedElement.present
    };
};

export default DropTarget(itemTypes.CUSTOMIZED_BLOCK_CHILD,
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
)(connect(mapStateToProps)(BlockItemContainer));