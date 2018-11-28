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
        const width = size === "1" ? 600 : (size === "1/2" ? 300 : (size === "1/3" ? 200 : 150));
        img.src = createHoverImage(`item (size: ${size})`, width, 100, "lightgreen", "black", 18);
        this.props.connectDragPreview(img);
    }
    render() {
        const { isLastItem, columnIdx, columnNum, background, content, connectDragSource, isDragging } = this.props;
        const BLOCK_WIDTH = 570;
        const BORDER_BOUNDRY_SIZE = 2;

        return connectDragSource(
            <div
                style={{
                    display: 'inline-block',
                    cursor: 'move',
                    opacity: isDragging ? 0.25 : 1,
                    width: `calc(${BLOCK_WIDTH / columnNum}px - ${2 * BORDER_BOUNDRY_SIZE}px)`,
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
                    this.state.overBlockItem && columnNum <= 3 &&
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
                    >
                        <i className="material-icons" style={{width: 16, height:16, fontSize: 16}}>
                            call_split
                        </i>
                    </button>
                }
                {
                    this.state.overBlockItem && !isLastItem &&
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