import React, { Component } from "react";
import Canvas from './Canvas/Canvas';
import Toolbox from './Toolbox/Toolbox';
import UndoRedo from './UndoRedo/UndoRedo';

class Editor extends Component {
    state = {
        newBlock: null
    }

    onBlockAdd(block) {
        this.setState((prevState, props) => {
            return {
                currBlocks: [...prevState.currBlocks],
                newBlock: block
            }
        });
    }
    
    render() {
        return (
            <div className="main-edit-area" style={{ width: '100%' }}>
                <UndoRedo />
                <Toolbox onBlockAdd={this.onBlockAdd.bind(this)} />
                <Canvas currBlocks={this.state.currBlocks} newBlock={this.state.newBlock} />
            </div>
        );
    }
}
export default Editor;
