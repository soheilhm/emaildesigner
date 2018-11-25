import React, { Component } from 'react';
import { connect } from 'react-redux';
import Block from './Block';
import * as canvasActions from '../../actions/index';

function clearSelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE?
        document.selection.empty();
    }
}

class Canvas extends Component {
    state = {
        blocksDraggable: true,
        componentsDraggable: true,
        blockDropZoneVisible: false,
        isBlockDragging: false,
        addedBlockFromToolbox: null,
        addedBlockFromToolboxStatus: null
    }

    componentWillReceiveProps(nextProps) {
        const { addedBlockFromToolbox, addedBlockFromToolboxStatus } = nextProps;
        if (addedBlockFromToolboxStatus === 'dragStart') {
            this.setState((state) => {
                return {
                    ...state,
                    isBlockDragging: true
                }
            });

        }
        if (addedBlockFromToolboxStatus === 'dragEnd') {
            const { droppedPosition, droppedBlockIdx } = this;
            this.props.dispatch(canvasActions.insertNewBlock({ droppedBlockIdx, droppedPosition, block: addedBlockFromToolbox }));
            this.setState((state) => {
                return {
                    ...state,
                    blockDropZoneVisible: false,
                    isBlockDragging: false
                }
            });
            this.props.resetDragDropFromToolbox();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        clearSelection(); // window selection magically fucks up drag and drop!
        // Boosting performance
        const blocksUpdated = JSON.stringify(this.props.currBlocks) !== JSON.stringify(nextProps.currBlocks);
        const blockIsBeingHovered = this.hoverBlockIdx !== null && this.state.blocksDraggable;
        return blockIsBeingHovered || blocksUpdated;
    }

    _resetBlockDragging(status) {
        this.setState((state) => {
            return {
                ...state,
                blockDropZoneVisible: false,
                isBlockDragging: false,
                componentsDraggable: true,
                blocksDraggable: !status
            }
        });
        this.droppedPosition = null;
        this.droppedBlockIdx = null;
        this.hoverBlockIdx = null;
        this.highlightedBlockDropZoneID = null;
    }


    _startBlockDrag(blockIdx) {
        this.draggedBlockIdx = blockIdx;
        document.getElementById(`container-${blockIdx}`).style.opacity = this.state.blocksDraggable ? 1 : 0.1;
        this.setState((state) => {
            return {
                ...state,
                isBlockDragging: true,
                componentsDraggable: false
            }
        });
    }

    _hoverBlock(event, position, blockIdx) {
        // event.preventDefault();
        this.droppedPosition = position;
        this.droppedBlockIdx = blockIdx;
        this.highlightedBlockDropZoneID = `${position}-${blockIdx}`;
    }

    _endBlockDrag(blockIdx) {
        const { draggedBlockIdx, droppedPosition, droppedBlockIdx } = this;
        document.getElementById(`container-${blockIdx}`).style.opacity = 1;
        this.props.dispatch(canvasActions.swapBlocks({ draggedBlockIdx, droppedPosition, droppedBlockIdx }));
        this.setState((state) => {
            return {
                ...state,
                blockDropZoneVisible: false,
                isBlockDragging: false,
                componentsDraggable: true
            }
        });
        this.droppedPosition = null;
        this.droppedBlockIdx = null;
        this.hoverBlockIdx = null;
        this.highlightedBlockDropZoneID = null;
    }

    _showDropZones() {
        this.setState((state) => {
            return {
                ...state,
                blockDropZoneVisible: this.state.blocksDraggable,
            }
        });
    }

    render() {
        return (
            <div className="canvas" style={{ width: '68%', backgroundColor: 'lightgray', float: 'right' }} >
                <h3 style={{ padding: '10px' }}>Canvas (Customized Blocks)</h3>
                <ul onDragOver={this._showDropZones.bind(this)} style={{ padding: '0 10px' }}>
                    {this.props.currBlocks.map((block) => {
                        const blockData = JSON.parse(block.content);
                        return (
                            <div key={block.index} id={`container-${block.index}`} style={{ margin: '1px' }}>
                                <div
                                    id={`before-${block.index}`}
                                    onDragOver={(event) => this._hoverBlock(event, 'before', block.index)}
                                    style={{
                                        display: this.hoverBlockIdx === block.index && this.state.blockDropZoneVisible ? 'block' : 'none',
                                        opacity: this.highlightedBlockDropZoneID === `before-${block.index}` ? 1 : 0.5,
                                        padding: '2px 0',
                                        lineHeight: '40px',
                                        height: '60px',
                                        margin: '0',
                                        border: this.highlightedBlockDropZoneID === `before-${block.index}` ? '4px dashed orange' : '4px dashed lightgray',
                                        backgroundColor: this.highlightedBlockDropZoneID === `before-${block.index}` ? 'yellow' : "lightgoldenrodyellow"
                                    }}
                                >
                                    <p style={{ textAlign: 'center' }}>DROP HERE</p>
                                </div>
                                <div
                                    style={{
                                        border: '2px dashed #51d1fb',
                                        cursor: 'move',
                                        position: 'relative'
                                    }}
                                    draggable={this.state.blocksDraggable && !this.state.isBlockDragging}
                                    onDragStart={() => this._startBlockDrag(block.index)}
                                    onDragOver={() => { this.hoverBlockIdx = block.index }}
                                    onDragEnd={() => this._endBlockDrag(block.index)}
                                >
                                    <li style={{ display: 'block' }}>
                                        <Block
                                            data={blockData}
                                            canDrag={this.state.componentsDraggable}
                                            toolboxBlockDragging={this.props.addedBlockFromToolboxStatus === 'dragStart'}
                                            resetBlockDragging={this._resetBlockDragging.bind(this)}
                                        />
                                    </li>
                                    <div style={{ position: 'absolute', top: 2, right: 2 }}>
                                        <button onClick={() => this.props.dispatch(canvasActions.duplicateBlock(block))} style={{ display: 'inline-block', padding: '5px', marginLeft: '2px' }}>Duplicate</button>
                                        <button onClick={() => this.props.dispatch(canvasActions.moveUpBlock(block))} style={{ display: 'inline-block', padding: '5px', marginLeft: '2px' }}>Move Up</button>
                                        <button onClick={() => this.props.dispatch(canvasActions.moveDownBlock(block))} style={{ display: 'inline-block', padding: '5px', marginLeft: '2px' }}>Move Down</button>
                                        <button onClick={() => this.props.dispatch(canvasActions.removeBlock(block))} style={{ display: 'inline-block', padding: '5px', marginLeft: '2px' }}>Delete</button>
                                    </div>
                                </div>
                                <div
                                    id={`after-${block.index}`}
                                    onDragOver={(event) => this._hoverBlock(event, 'after', block.index)}
                                    style={{
                                        display: this.hoverBlockIdx === block.index && this.state.blockDropZoneVisible ? 'block' : 'none',
                                        opacity: this.highlightedBlockDropZoneID === `after-${block.index}` ? 1 : 0.5,
                                        padding: '2px 0',
                                        lineHeight: '40px',
                                        height: '60px',
                                        margin: '0',
                                        border: this.highlightedBlockDropZoneID === `after-${block.index}` ? '4px dashed orange' : '4px dashed lightgray',
                                        backgroundColor: this.highlightedBlockDropZoneID === `after-${block.index}` ? 'yellow' : "lightgoldenrodyellow"
                                    }}
                                >
                                    <p style={{ textAlign: 'center' }}>DROP HERE</p>
                                </div>
                            </div>
                        );
                    })}
                </ul>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return { currBlocks: state.canvasBlocks.present };
};

export default connect(mapStateToProps)(Canvas);


