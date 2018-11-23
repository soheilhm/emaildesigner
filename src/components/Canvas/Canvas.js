import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as canvasActions from '../../actions/index';

class Canvas extends Component {
    state = {
        dropZonesVisible: false,
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
                    dropZonesVisible: false,
                    isBlockDragging: false
                }
            });
            this.props.resetDragDropFromToolbox();
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
                dropZonesVisible: false,
                isBlockDragging: false
            }
        });
        this.droppedPosition = null;
        this.droppedBlockIdx = null;
        this.highlightedDropZoneID = null;
    }

    _dragOver(event, position, blockIdx) {
        event.preventDefault();
        this.droppedPosition = position;
        this.droppedBlockIdx = blockIdx;
        this.highlightedDropZoneID = `${position}-${blockIdx}`;
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
                <ul onDragOver={this._showDropZones.bind(this)} style={{padding: '0 10px'}}>
                    {this.props.currBlocks.map((block) => (
                        <div key={block.index} id={`container-${block.index}`} style={{ margin: '1px' }}>
                            <div
                                id={`before-${block.index}`}
                                onDragOver={(event) => this._dragOver(event, 'before', block.index)}
                                style={{
                                    display: this.state.dropZonesVisible ? 'block' : 'none',
                                    opacity: this.highlightedDropZoneID === `before-${block.index}` ? 1 : 0.5,
                                    padding: '2px 0',
                                    lineHeight: '2px',
                                    margin: '0',
                                    border: this.highlightedDropZoneID === `before-${block.index}` ? '4px dashed orange' : '4px dashed lightgray',
                                    backgroundColor: this.highlightedDropZoneID === `before-${block.index}` ? 'yellow' : "lightgoldenrodyellow"
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
                                    position: 'relative'
                                }}
                                draggable='true'
                                onDragStart={(event) => this._dragStart(block.index)}
                                onDragEnd={() => this._dragEnd(block.index)}
                            >
                                <li style={{ display: 'inline-block', width: '55%' }}>{block.content}</li>
                                <div style={{ position: 'absolute', top: 5, right: 5 }}>
                                    <button onClick={this._duplicateBlock.bind(this, block)} style={{ display: 'inline-block', padding: '5px', marginLeft: '2px' }}>Duplicate</button>
                                    <button onClick={this._moveUpBlock.bind(this, block)} style={{ display: 'inline-block', padding: '5px', marginLeft: '2px' }}>Move Up</button>
                                    <button onClick={this._moveDownBlock.bind(this, block)} style={{ display: 'inline-block', padding: '5px', marginLeft: '2px' }}>Move Down</button>
                                    <button onClick={this._removeBlock.bind(this, block)} style={{ display: 'inline-block', padding: '5px', marginLeft: '2px' }}>Delete</button>
                                </div>
                            </div>
                            <div
                                id={`after-${block.index}`}
                                onDragOver={(event) => this._dragOver(event, 'after', block.index)}
                                style={{
                                    display: this.state.dropZonesVisible ? 'block' : 'none',
                                    opacity: this.highlightedDropZoneID === `after-${block.index}` ? 1 : 0.5,
                                    padding: '2px 0',
                                    lineHeight: '2px',
                                    margin: '0',
                                    border: this.highlightedDropZoneID === `after-${block.index}` ? '4px dashed orange' : '4px dashed lightgray',
                                     backgroundColor: this.highlightedDropZoneID === `after-${block.index}` ? 'yellow' : "lightgoldenrodyellow"
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


