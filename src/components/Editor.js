import React, { Component } from "react";
import Canvas from "./Canvas/Canvas";
import Toolbox from "./Toolbox/Toolbox";
import UndoRedo from "./UndoRedo/UndoRedo";

class Editor extends Component {
    render() {
        return (
            <div className="main-edit-area" style={{ width: "100%" }}>
                <UndoRedo />
                <Toolbox />
                <Canvas />
            </div>
        );
    }
}
export default Editor;
