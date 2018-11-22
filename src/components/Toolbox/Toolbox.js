import React, { Component } from "react";
import { connect } from 'react-redux';
import * as canvasActions from '../../actions/index';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Toolbox extends Component {
    state = {
        blocks: [
            { 
                index: '311139e8-45a1-4815-8fc0-195ebe395ab6', 
                type: 'Block1', 
                content: 'Block1',
                color: getRandomColor()
            },
            { 
                index: 'ad56fb77-5617-401c-8fad-67b4cb481efb', 
                type: 'Block2', 
                content: 'Block2',
                color: getRandomColor()
            },
            { 
                index: '02f2a335-a295-4d8d-a3ed-6316dbc1604e', 
                type: 'Block3', 
                content: 'Block3',
                color: getRandomColor()
            },
            { 
                index: '9d339d39-3e75-4a17-b0ab-65af6d679a43', 
                type: 'Block4', 
                content: 'Block4',
                color: getRandomColor()
            }
        ]
    };

    _addBlock(block) {
        this.props.dispatch(canvasActions.addBlock(block));
    }

    render() {
        return (
            <div className="toolbox" style={{ width: '30%', backgroundColor: 'lightblue', float: 'left'}}>
                <h3 style={{padding: '10px'}}>Toolbox</h3>
                <ul>
                    {this.state.blocks.map((block, index) => (
                        <div key={block.index} style={{padding: '5px',margin: '5px 0', border: '1px solid gray'}}>
                            <li style={{display: 'inline-block', width: '50%', padding: '5px', margin: '0 5px'}}>{block.type}</li>
                            <button onClick={this._addBlock.bind(this, block)} style={{display: 'inline-block', padding: '10px', margin: '0 5px'}}>Add</button>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

export default connect()(Toolbox);
