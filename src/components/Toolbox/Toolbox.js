import React, { Component } from "react";

class Toolbox extends Component {
    state = {
        blocks: ['Block1', 'Block2', 'Block3', 'Block4']
    };
    render() {

        return (
            <div className="toolbox" style={{ width: '30%', backgroundColor: 'lightgreen', float: 'left'}}>
                <h3>Toolbox</h3>
                <ul>
                    {this.state.blocks.map((value, index) => (
                        <li key={index}>{value} - Add</li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Toolbox;
