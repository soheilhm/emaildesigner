import React, { Component } from "react";
import { connect } from 'react-redux';
import * as canvasActions from '../../actions/index';

class Toolbox extends Component {
    _addBlock(block) {
        this.props.dispatch(canvasActions.addBlock(block));
    }

    render() {
        return (
            <div className="toolbox" style={{ width: '30%', backgroundColor: 'lightblue', float: 'left' }}>
                <h3 style={{ padding: '10px' }}>Toolbox</h3>
                <ul>
                    {this.props.blocks.map((block, index) => (
                        <div key={block.index} style={{ padding: '5px', margin: '5px 0', border: '1px solid gray' }}>
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