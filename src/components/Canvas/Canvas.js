import React, { Component } from 'react';
import { connect } from 'react-redux';
import Block from './Block';
import * as canvasActions from '../../actions/index';

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
        // Boosting performance
        const blocksUpdated = JSON.stringify(this.props.currBlocks) !== JSON.stringify(nextProps.currBlocks);
        const blockIsBeingHovered = this.hoverBlockIdx !== null;
        return blockIsBeingHovered || blocksUpdated;
    }


    _startBlockDrag(blockIdx) {
        this.draggedBlockIdx = blockIdx;
        document.getElementById(`container-${blockIdx}`).style.opacity = 0.1;
        this.setState((state) => {
            return {
                ...state,
                isBlockDragging: true,
                componentsDraggable: false
            }
        });
    }

    _hoverBlock(event, position, blockIdx) {
        event.preventDefault();
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
        const testData1 = {
            blockID: "abb46b6d-1f68-4a87-9aec-8d8629ee28b3",
            columnNum: 1,
            paddingTop: 20,
            paddingBottom: 20,
            columns: [
                {
                    type: 'test',
                    content: 'A1'
                }
            ]
        };
        const testData2 = {
            blockID: "661b20e7-23c3-4505-a74d-c2f370993caf",
            columnNum: 2,
            paddingTop: 20,
            paddingBottom: 20,
            columns: [
                {
                    type: 'test',
                    content: 'B1'
                },
                {
                    type: 'test',
                    content: 'B2'
                }
            ]
        };
        const testData3 = {
            blockID: "c059b491-624a-4b64-a6f7-b8fa00baa79c",
            columnNum: 3,
            paddingTop: 20,
            paddingBottom: 20,
            columns: [
                {
                    type: 'test',
                    content: 'C1'
                },
                {
                    type: 'test',
                    content: 'C2'
                },
                {
                    type: 'test',
                    content: 'C3'
                },
            ]
        };
        const testData4 = {
            blockID: "cdaf1bd7-1811-4255-9a0b-584779826380",
            columnNum: 3,
            paddingTop: 20,
            paddingBottom: 20,
            columns: [
                {
                    type: 'test',
                    content: 'D1'
                },
                {
                    type: 'test',
                    content: 'D2'
                },
                {
                    type: 'test',
                    content: 'D3'
                },
            ]
        };
        return (
            <div className="canvas" style={{ width: '68%', backgroundColor: 'lightgray', float: 'right' }} >
                <h3 style={{ padding: '10px' }}>Canvas (Customized Blocks)</h3>
                <ul onDragOver={this._showDropZones.bind(this)} style={{ padding: '0 10px' }}>
                    {this.props.currBlocks.map((block) => (
                        <div key={block.index} id={`container-${block.index}`} style={{ margin: '1px' }}>
                            <div
                                id={`before-${block.index}`}
                                onDragOver={(event) => this._hoverBlock(event, 'before', block.index)}
                                style={{
                                    display: this.hoverBlockIdx === block.index && this.state.blockDropZoneVisible ? 'block' : 'none',
                                    opacity: this.highlightedBlockDropZoneID === `before-${block.index}` ? 1 : 0.5,
                                    padding: '2px 0',
                                    lineHeight: '2px',
                                    margin: '0',
                                    border: this.highlightedBlockDropZoneID === `before-${block.index}` ? '4px dashed orange' : '4px dashed lightgray',
                                    backgroundColor: this.highlightedBlockDropZoneID === `before-${block.index}` ? 'yellow' : "lightgoldenrodyellow"
                                }}
                            >
                                <p style={{ textAlign: 'center' }}>DROP HERE</p>
                            </div>
                            <div
                                style={{
                                    padding: '20px 10px',
                                    border: '2px dashed #51d1fb',
                                    cursor: 'move',
                                    backgroundColor: block.color,
                                    position: 'relative'
                                }}
                                draggable={this.state.blocksDraggable}
                                onDragStart={() => this._startBlockDrag(block.index)}
                                onDragOver={() => { this.hoverBlockIdx = block.index }}
                                onDragEnd={() => this._endBlockDrag(block.index)}
                            >
                                <li style={{ display: 'inline-block' }}>
                                    {block.content}
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
                                    lineHeight: '2px',
                                    margin: '0',
                                    border: this.highlightedBlockDropZoneID === `after-${block.index}` ? '4px dashed orange' : '4px dashed lightgray',
                                    backgroundColor: this.highlightedBlockDropZoneID === `after-${block.index}` ? 'yellow' : "lightgoldenrodyellow"
                                }}
                            >
                                <p style={{ textAlign: 'center' }}>DROP HERE</p>
                            </div>
                        </div>
                    ))}
                </ul>

                <h3 style={{ padding: '0 10px 10px' }}>Test Blocks (for block content creation):</h3>

                <Block data={testData1} canDrag={this.state.componentsDraggable} toolboxBlockDragging={this.props.addedBlockFromToolboxStatus === 'dragStart'} isComponentDragging={(state) => this.setState({ blocksDraggable: !state })} />
                <Block data={testData2} canDrag={this.state.componentsDraggable} toolboxBlockDragging={this.props.addedBlockFromToolboxStatus === 'dragStart'} isComponentDragging={(state) => this.setState({ blocksDraggable: !state })} />
                <Block data={testData3} canDrag={this.state.componentsDraggable} toolboxBlockDragging={this.props.addedBlockFromToolboxStatus === 'dragStart'} isComponentDragging={(state) => this.setState({ blocksDraggable: !state })} />
                <Block data={testData4} canDrag={this.state.componentsDraggable} toolboxBlockDragging={this.props.addedBlockFromToolboxStatus === 'dragStart'} isComponentDragging={(state) => this.setState({ blocksDraggable: !state })} />
            </div >
        );
    }
}

const mapStateToProps = state => {
    return { currBlocks: state.canvasBlocks.present };
};

export default connect(mapStateToProps)(Canvas);


