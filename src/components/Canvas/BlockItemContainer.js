import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from "react-dnd";
import * as itemTypes from '../../constants/itemTypes/itemTypes';
import BlockItem from './BlockItem';
import BlockItemDropZone from './BlockItemDropZone';

class BlockItemContainer extends Component {
    render() {
        const { data, blockIndex, draggedElement, isOver, connectDropTarget } = this.props;
        const { paddingTop, paddingBottom, columnNum, columns, backgroundColor } = data;
        const elementIsBlockItem = draggedElement && draggedElement.type === itemTypes.CUSTOMIZED_BLOCK_CHILD;
        return connectDropTarget(
            <div>
                <div
                    style={{
                        padding: `${paddingTop}px 10px ${paddingBottom}px`,
                        cursor: 'move',
                        border: '1px dashed lightgray',
                        backgroundColor,
                        position: 'relative'
                    }}
                >
                    <div style={{ margin: '0 auto', width: '570px' }} >
                        {console.log({columns})}
                        {columns.map((column, index) => {
                            const isLastItem = index === columns.length - 1;
                            const isItemMergeable = !isLastItem && (column.type === columns[index +1].type);
                            return (
                                <div
                                key={column.columnIdx}
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    height: 75
                                }}
                            >
                                <BlockItemDropZone blockIndex={blockIndex} columnNum={columnNum} {...column} isOverBlockItem={isOver} shouldRender={elementIsBlockItem} />
                                <BlockItem blockIndex={blockIndex} columnNum={columnNum} isItemMergeable={isItemMergeable} {...column} />
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        draggedElement: state.draggedElement
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