import React, { Component } from "react";
import Canvas from './Canvas/Canvas';
import Toolbox from './Toolbox/Toolbox';

class Editor extends Component {
    state = {
        blocks: ['Block5', 'Block6', 'Block7', 'Block8']
    };
    
    render() {
        return (
            <div className="main-edit-area" style={{ width: '100%' }}>
                <Toolbox />
                <Canvas blocks={this.state.blocks}/>
            </div>
        );
    }
}
export default Editor;
