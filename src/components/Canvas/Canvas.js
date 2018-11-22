import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as canvasActions from '../../actions/index';

class Canvas extends Component {
    state = {
        dropZonesVisible: false
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

    _dragStart(event, blockIdx) {
        this.draggedBlockIdx = blockIdx;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', event.currentTarget);
        document.getElementById(`container-${blockIdx}`).style.opacity = 0.1;
    }

    _dragEnd(blockIdx) {
        const { draggedBlockIdx, droppedPosition, droppedBlockIdx } = this;
        document.getElementById(`container-${blockIdx}`).style.opacity = 1;
        this.props.dispatch(canvasActions.swapBlocks({ draggedBlockIdx, droppedPosition, droppedBlockIdx }));
        this.setState((state, props) => {
            return {
                dropZonesVisible: false
            }
        });
    }

    _dragOver(event, position, blockIdx) {
        event.preventDefault();
        this.droppedPosition = position;
        this.droppedBlockIdx = blockIdx;
    }

    _showDropZones() {
        this.setState((state, props) => {
            return {
                dropZonesVisible: true
            }
        });
    }

    render() {
        return (
            <div className="canvas" style={{ width: '65%', backgroundColor: 'lightgray', float: 'right' }} >
                <h3 style={{ padding: '10px' }}>Canvas</h3>
                <ul onDragOver={this._showDropZones.bind(this)} >
                    {this.props.currBlocks.map((block) => (
                        <div key={block.index} id={`container-${block.index}`} style={{ margin: '0 0 10px' }}>
                            <div
                                onDragOver={(event) => this._dragOver(event, 'before', block.index)}
                                style={{ display: this.state.dropZonesVisible ? 'block' : 'none', opacity: '0.5', lineHeight: '5px', padding: '2px 0', margin: '0', border: '2px dashed orange', backgroundColor: "yellow" }}
                            >
                                <p style={{ textAlign: 'center' }}>DROP HERE</p>
                            </div>
                            <div
                                style={{ padding: '20px 10px', border: '5px dashed #51d1fb', cursor: 'move', backgroundColor: block.color }}
                                draggable='true'
                                onDragStart={(event) => this._dragStart(event, block.index)}
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
                                onDragOver={(event) => this._dragOver(event, 'after', block.index)}
                                style={{ display: this.state.dropZonesVisible ? 'block' : 'none', opacity: '0.5', lineHeight: '5px', padding: '2px 0', margin: '0', border: '2px dashed orange', backgroundColor: "yellow" }}
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


