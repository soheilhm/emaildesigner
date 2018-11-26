import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as canvasActions from '../../actions/index';
import ToolboxBlock from './ToolboxBlock';

class Toolbox extends Component {
    _addBlock(block) {
        this.props.dispatch(canvasActions.addBlock(block));
    }
    render() {
        return (
            <div className="toolbox" style={{ width: '31%', backgroundColor: 'lightblue', float: 'left' }}>
                <h3 style={{ padding: '10px' }}>Toolbox (Static Blocks)</h3>
                <ul style={{ padding: '0 10px' }}>
                    {this.props.blocks.map((block) => (
                        <ToolboxBlock key={block.index} block={block} addBlock={this._addBlock.bind(this)} />
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