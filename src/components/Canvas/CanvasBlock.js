import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import createHoverImage from '../../common/createHoverImage';
import * as canvasActions from '../../actions/index';
import * as itemTypes from '../../constants/itemTypes/itemTypes';
import BlockItemContainer from './BlockItemContainer';

class CanvasBlock extends Component {
    componentDidMount() {
        const { title } = this.props.block;
        const img = new Image();
        img.src = createHoverImage(`${title} (canvas block)`, 500, 100, "#b67fe0", "black", 24);
        this.props.connectDragPreview(img);
    }

    render() {
        const { block, connectDragSource, isDragging } = this.props;
        const blockData = JSON.parse(block.content);
        return connectDragSource(
            <div
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    position: 'relative'
                }}
            >
                <div style={{ position: 'absolute', top: 2, left: 2, zIndex: 2 }}>
                    <button onClick={() => this.props.dispatch(canvasActions.moveUpBlock(block))} style={{ display: 'inline-block', padding: '4px' }}>
                        <i className="material-icons" style={{ fontSize: '16px', cursor: 'pointer' }}>
                            arrow_upward
                        </i>
                    </button>
                    <button onClick={() => this.props.dispatch(canvasActions.moveDownBlock(block))} style={{ display: 'inline-block', padding: '4px' }}>
                        <i className="material-icons" style={{ fontSize: '16px', cursor: 'pointer' }}>
                            arrow_downward
                        </i>
                    </button>
                </div>
                <li style={{ display: 'block', position: 'relative' }}>
                    <BlockItemContainer blockIndex={block.index} data={blockData} />
                </li>
                <div style={{ position: 'absolute', top: 2, right: 2, zIndex: 2 }}>
                    <button onClick={() => this.props.dispatch(canvasActions.duplicateBlock(block))} style={{ display: 'inline-block', padding: '4px' }}>
                        <i className="material-icons" style={{ fontSize: '16px', cursor: 'pointer' }}>
                            file_copy
                        </i>
                    </button>
                    <button onClick={() => this.props.dispatch(canvasActions.removeBlock(block))} style={{ display: 'inline-block', padding: '4px' }}>
                        <i className="material-icons" style={{ fontSize: '16px', cursor: 'pointer' }}>
                            close
                        </i>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default DragSource(itemTypes.CUSTOMIZED_BLOCK,
    {
        beginDrag(props, _, connect) {
            connect.context.store.dispatch(canvasActions.updateDraggedElement({ type: itemTypes.CUSTOMIZED_BLOCK, value: props.block }));
            return props.block;
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
)(connect(mapStateToProps)(CanvasBlock));