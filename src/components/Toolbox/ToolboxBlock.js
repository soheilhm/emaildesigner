import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import createHoverImage from '../../common/createHoverImage';
import * as canvasActions from '../../actions/index';
import * as itemTypes from '../../constants/itemTypes/itemTypes';

class ToolboxBlock extends Component {
    componentDidMount() {
        const { title } = this.props.block;
        const img = new Image();
        img.src = createHoverImage(`${title} - from toolbox`, 500, 100, "orange", "black", 24);
        this.props.connectDragPreview(img);
    }
    render() {
        const { block, addBlock, connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div
                style={{
                    padding: '5px',
                    margin: '5px 0',
                    border: '1px solid gray',
                    cursor: 'move',
                    backgroundColor: isDragging ? 'orange' : 'lightgray'
                }}
            >
                <li style={{ display: 'inline-block', width: '50%', padding: '5px', margin: '0 5px' }}>{block.title}</li>
                <button onClick={() => addBlock(block)} style={{ display: 'inline-block', padding: '7px 14px', margin: '0', float: 'right' }}>Add</button>
            </div >
        );
    }
}

const mapStateToProps = state => state;

export default DragSource(itemTypes.STATIC_BLOCK,
    {
        beginDrag(props, _, connect) {
            connect.context.store.dispatch(canvasActions.updateDraggedElement({ type: itemTypes.STATIC_BLOCK, value: props.block }));
            return props.block;
        },
        endDrag(props, _, connect) {
            if (connect) {
                connect.context.store.dispatch(canvasActions.resetDraggedElement());
            }

        }
    },
    (connect, monitor) => {
        return {
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging()
        }
    }
)(connect(mapStateToProps)(ToolboxBlock));