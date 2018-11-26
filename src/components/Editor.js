import React, { PureComponent } from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Canvas from "./Canvas/Canvas";
import Toolbox from "./Toolbox/Toolbox";
import UndoRedo from "./UndoRedo/UndoRedo";

class Editor extends PureComponent {
    state = {
        addedBlockFromToolbox: null,
        addedBlockFromToolboxStatus: null,
    }
    render() {
        return (
            <div className="main-edit-area" style={{ width: "100%" }}>
                <UndoRedo />
                <Canvas />
                <Toolbox />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Editor);