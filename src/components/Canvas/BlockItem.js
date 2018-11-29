import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import createHoverImage from '../../common/createHoverImage';
import * as canvasActions from '../../actions/index';
import * as itemTypes from '../../constants/itemTypes/itemTypes';

class BlockItem extends Component {
    state= {
        overBlockItem: false,
        overSplitIcon: false,
        overMergeIcon: false
    }
    componentDidMount() {
        const { size } = this.props;
        const img = new Image();
        const BLOCK_WIDTH = 570;
        let BlockItemWidth, dragPreviewWidth;
        switch(size) {
            case "1":
                BlockItemWidth = BLOCK_WIDTH;
                dragPreviewWidth = 600;
                break;
            case "3/4":
                BlockItemWidth = BLOCK_WIDTH * (3 / 4);
                dragPreviewWidth = 450;
                break;
            case "1/2":
                BlockItemWidth = BLOCK_WIDTH / 2;
                dragPreviewWidth = 300;
                break;
            case "1/3":
                BlockItemWidth = BLOCK_WIDTH / 3;
                dragPreviewWidth = 200;
                break;
            case "1/4":
                BlockItemWidth = BLOCK_WIDTH / 4;
                dragPreviewWidth = 150;
                break;
            default:
        }
        this.setState({ BlockItemWidth });
        img.src = createHoverImage(`item (size: ${size})`, dragPreviewWidth, 100, "lightgreen", "black", 18);
        this.props.connectDragPreview(img);
    }
    render() {
        const { blockIndex, columnIdx, size, isItemMergeable, columnNum, background, content, connectDragSource, isDragging } = this.props;
        const BORDER_BOUNDRY_SIZE = 2;

        return connectDragSource(
            <div
                style={{
                    display: 'inline-block',
                    cursor: 'move',
                    opacity: isDragging ? 0.25 : 1,
                    width: `calc(${this.state.BlockItemWidth}px - ${2 * BORDER_BOUNDRY_SIZE}px)`,
                    height: '75px',
                    lineHeight: 0,
                    border: '1px dashed lightgray',
                    background: background,
                }}
                onMouseOver={() => this.setState({ overBlockItem: true })}
                onMouseLeave={() => this.setState({ overBlockItem: false })}
            >
                {/* Based on column.type different elements should be rendered, this is just for test: */}
                <p
                    style={{
                        padding: "10px",
                        textAlign: 'center',
                        color: isDragging ? 'transparent' : 'white',
                        textShadow: isDragging ? 'none' : '1px 1px 1px black',
                        fontSize: '16px',
                        fontWeight: "bold"
                    }}
                >
                    {content} - {columnIdx}
                </p>
                {
                    this.state.overBlockItem && columnNum <= 3 && size !== '1/4' &&
                    <button
                        onMouseOver={() => this.setState({ overSplitIcon: true })}
                        onMouseLeave={() => this.setState({ overSplitIcon: false })}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            backgroundColor: this.state.overSplitIcon ? 'white' :'lightgray',
                            color: this.state.overSplitIcon ? 'black' : 'gray',
                            borderRadius: '50%',
                            top: -15,
                            left: 'calc(50% - 10px)',
                            zIndex: 2,
                            padding: 2,
                            outline: 'none'
                        }}
                        onClick={() => this.props.dispatch(canvasActions.splitBlockItem({blockIndex, columnIdx}))}
                    >
                        <i className="material-icons" style={{width: 16, height:16, fontSize: 16}}>
                            call_split
                        </i>
                    </button>
                }
                {
                    this.state.overBlockItem && isItemMergeable &&
                    <div
                        onMouseOver={() => this.setState({ overMergeIcon: true })}
                        onMouseLeave={() => this.setState({ overMergeIcon: false })}
                    >
                        <button
                            style={{
                                cursor: 'pointer',
                                position: 'absolute',
                                backgroundColor: this.state.overMergeIcon ? 'white' : 'lightgray',
                                color: this.state.overMergeIcon ? 'black' : 'gray',
                                borderRadius: '50%',
                                top: -15,
                                right: -10,
                                zIndex: 2,
                                padding: 2,
                                outline: 'none'
                            }}
                            onClick={() => this.props.dispatch(canvasActions.mergeBlockItems({blockIndex, columnIdx}))}
                        >
                            <i className="material-icons" style={{width: 16, height:16, fontSize: 16}}>
                                call_merge
                            </i>
                        </button>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        draggedElement: state.draggedElement
    };
};

export default DragSource(itemTypes.CUSTOMIZED_BLOCK_CHILD,
    {
        beginDrag(props, _, connect) {
            const { blockIndex, columnIdx, columnNum, content, background, type } = props;
            connect.context.store.dispatch(canvasActions.updateDraggedElement({
                type: itemTypes.CUSTOMIZED_BLOCK_CHILD,
                value: {
                    blockIndex, columnIdx, columnNum, content, background, type
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