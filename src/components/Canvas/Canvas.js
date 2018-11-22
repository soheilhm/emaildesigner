import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as canvasActions from '../../actions/index';

class Canvas extends Component {
    state = {
        dropZonesVisible: false,
        highlightedDropZoneID: null,
        isBlockDragging: false,
        addedBlockFromToolbox: null,
        addedBlockFromToolboxStatus: null,
        draggingBlockFromToolbox: false
    }

    componentWillReceiveProps(nextProps) {
        const { addedBlockFromToolbox, addedBlockFromToolboxStatus } = nextProps;
        if (addedBlockFromToolboxStatus === 'dragStart') {
            this.setState((state) => {
                return {
                    ...state,
                    isBlockDragging: true,
                    draggingBlockFromToolbox: true
                }
            });

        }
        if (addedBlockFromToolboxStatus === 'dragEnd') {
            this.setState((state) => {
                return {
                    ...state,
                    highlightedDropZoneID: null,
                    dropZonesVisible: false,
                    isBlockDragging: false,
                    addedBlockFromToolbox,
                    addedBlockFromToolboxStatus,
                    draggingBlockFromToolbox: false
                }
            });
        }
    }

    componentDidUpdate() {
        const { addedBlockFromToolbox, addedBlockFromToolboxStatus } = this.state;
        if (addedBlockFromToolboxStatus === 'dragEnd') {
            const { droppedPosition, droppedBlockIdx } = this;
            this.props.dispatch(canvasActions.insertNewBlock({ droppedBlockIdx, droppedPosition, block: addedBlockFromToolbox }));
        }
    }

    _duplicateBlock(block) {
        this.props.dispatch(canvasActions.duplicateBlock(block));
    }

    _moveUpBlock(block) {
        this.props.dispatch(canvasActions.moveUpBlock(block));
    }

    _moveDownBlock(block) {
        this.props.dispatch(canvasActions.moveDownBlock(block));
    }

    _removeBlock(block) {
        this.props.dispatch(canvasActions.removeBlock(block));
    }

    _dragStart(blockIdx) {
        this.draggedBlockIdx = blockIdx;
        document.getElementById(`container-${blockIdx}`).style.opacity = 0.1;
        this.setState((state) => {
            return {
                ...state,
                isBlockDragging: true
            }
        });
    }

    _dragEnd(blockIdx) {
        const { draggedBlockIdx, droppedPosition, droppedBlockIdx } = this;
        document.getElementById(`container-${blockIdx}`).style.opacity = 1;
        this.props.dispatch(canvasActions.swapBlocks({ draggedBlockIdx, droppedPosition, droppedBlockIdx }));
        this.setState((state) => {
            return {
                ...state,
                highlightedDropZoneID: null,
                dropZonesVisible: false,
                isBlockDragging: false
            }
        });
        this.droppedPosition = null;
        this.droppedBlockIdx = null;
    }

    _dragOver(event, position, blockIdx) {
        event.preventDefault();
        this.droppedPosition = position;
        this.droppedBlockIdx = blockIdx;
        this.setState((state) => {
            return {
                ...state,
                highlightedDropZoneID: `${position}-${blockIdx}`
            }
        });
    }

    _showDropZones() {
        this.setState((state) => {
            return {
                ...state,
                dropZonesVisible: true
            }
        });
    }


    render() {
        return (
            <div className="canvas" style={{ width: '68%', backgroundColor: 'lightgray', float: 'right' }} >
                <h3 style={{ padding: '10px' }}>Canvas</h3>
                <ul onDragOver={this._showDropZones.bind(this)} >
                    {this.props.currBlocks.map((block) => (
                        <div key={block.index} id={`container-${block.index}`} style={{ margin: '1px' }}>
                            <div
                                id={`before-${block.index}`}
                                onDragOver={(event) => this._dragOver(event, 'before', block.index)}
                                style={{
                                    display: this.state.dropZonesVisible ? 'block' : 'none',
                                    opacity: this.state.highlightedDropZoneID === `before-${block.index}` ? 1 : 0.5,
                                    padding: '2px 0',
                                    lineHeight: '2px',
                                    margin: '0',
                                    border: this.state.highlightedDropZoneID === `before-${block.index}` ? '4px dashed orange' : '4px dashed lightgray',
                                    backgroundColor: this.state.highlightedDropZoneID === `before-${block.index}` ? 'yellow' : "lightgoldenrodyellow"
                                }}
                            >
                                <p style={{ textAlign: 'center' }}>DROP HERE</p>
                            </div>
                            <div
                                style={{ 
                                    padding: '20px 10px', 
                                    border: '4px dashed #51d1fb', 
                                    cursor: 'move', 
                                    backgroundColor: block.color,
                                    opacity: this.state.isBlockDragging ? (this.draggedBlockIdx === block.index ? 1 : 0.75) : 1,
                                }}
                                draggable='true'
                                onDragStart={(event) => this._dragStart(block.index)}
                                onDragEnd={() => this._dragEnd(block.index)}
                            >
                                <li style={{ display: 'inline-block', width: '55%' }}>{block.content}</li>
                                <div style={{ float: 'right' }}>
                                    <button onClick={this._duplicateBlock.bind(this, block)} style={{ display: 'inline-block', padding: '5px', margin: '0 5px' }}>Duplicate</button>
                                    <button onClick={this._moveUpBlock.bind(this, block)} style={{ display: 'inline-block', padding: '5px', margin: '0 5px' }}>Move Up</button>
                                    <button onClick={this._moveDownBlock.bind(this, block)} style={{ display: 'inline-block', padding: '5px', margin: '0 5px' }}>Move Down</button>
                                    <button onClick={this._removeBlock.bind(this, block)} style={{ display: 'inline-block', padding: '5px', margin: '0 5px' }}>Delete</button>
                                </div>
                            </div>
                            <div
                                id={`after-${block.index}`}
                                onDragOver={(event) => this._dragOver(event, 'after', block.index)}
                                style={{
                                    display: this.state.dropZonesVisible ? 'block' : 'none',
                                    opacity: this.state.highlightedDropZoneID === `after-${block.index}` ? 1 : 0.5,
                                    padding: '2px 0',
                                    lineHeight: '2px',
                                    margin: '0',
                                    border: this.state.highlightedDropZoneID === `after-${block.index}` ? '4px dashed orange' : '4px dashed lightgray',
                                     backgroundColor: this.state.highlightedDropZoneID === `after-${block.index}` ? 'yellow' : "lightgoldenrodyellow"
                                }}
                            >
                                <p style={{ textAlign: 'center' }}>DROP HERE</p>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { currBlocks: state.canvasBlocks.present };
};

export default connect(mapStateToProps)(Canvas);


