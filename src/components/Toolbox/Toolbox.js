import React, { Component } from "react";
import { connect } from 'react-redux';
import * as canvasActions from '../../actions/index';

class Toolbox extends Component {
    state = {
        isBlockDragging: false,

    }
    _addBlock(block) {
        this.props.dispatch(canvasActions.addBlock(block));
    }

    _dragStart(block) {
        this.props.dragBlock(block, 'dragStart');
        this.setState((state) => {
            return {
                ...state,
                isBlockDragging: true
            }
        });
    }

    _dragEnd(block) {
        this.props.dragBlock(block, 'dragEnd');
        this.setState((state) => {
            return {
                ...state,
                isBlockDragging: false
            }
        });
    }

    render() {
        return (
            <div className="toolbox" style={{ width: '31%', backgroundColor: 'lightblue', float: 'left' }}>
                <h3 style={{ padding: '10px' }}>Toolbox</h3>
                <ul>
                    {this.props.blocks.map((block, index) => (
                        <div 
                            key={block.index} 
                            style={{ 
                                padding: '5px', 
                                margin: '5px 0', 
                                border: '1px solid gray',
                                cursor: 'move',
                                backgroundColor: this.state.isBlockDragging ? (this.draggedBlockIdx === block.index ? 'lightpink' : 'lightgray') : 'lightgray'
                            }}
                            draggable='true'
                            onDragStart={() => this._dragStart(block)}
                            onDragEnd={() => this._dragEnd(block)}
                        >
                            <li style={{ display: 'inline-block', width: '50%', padding: '5px', margin: '0 5px' }}>{block.title}</li>
                            <button onClick={this._addBlock.bind(this, block)} style={{ display: 'inline-block', padding: '7px 14px', margin: '0', float: 'right' }}>Add</button>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { blocks: state.toolboxBlocks.present };
};

export default connect(mapStateToProps)(Toolbox);