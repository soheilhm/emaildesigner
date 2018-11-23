import React, { Component } from "react";
import Canvas from "./Canvas/Canvas";
import Toolbox from "./Toolbox/Toolbox";
import UndoRedo from "./UndoRedo/UndoRedo";

class Editor extends Component {
    state = {
        addedBlockFromToolbox: null,
        addedBlockFromToolboxStatus: null,
    }

    _onDragBlockToCanvas(block, status) {
        this.setState((state) => {
            return {
                addedBlockFromToolbox: block,
                addedBlockFromToolboxStatus: status
            }
        });
    }

    _resetDragDrop(block, status) {
        this.setState((state) => {
            return {
                addedBlockFromToolbox: null,
                addedBlockFromToolboxStatus: null
            }
        });
    }    

    render() {
        return (
            <div className="main-edit-area" style={{ width: "100%" }}>
                <UndoRedo />
                <Toolbox dragBlock={this._onDragBlockToCanvas.bind(this)}/>
                <Canvas resetDragDropFromToolbox={this._resetDragDrop.bind(this)} addedBlockFromToolbox={this.state.addedBlockFromToolbox} addedBlockFromToolboxStatus={this.state.addedBlockFromToolboxStatus} />
            </div>
        );
    }
}
export default Editor;
