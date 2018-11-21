import React, {Component} from 'react';
import generateID from '../../common/uuid';

class Canvas extends Component {
    state = {
        currBlocks: []
    }

    componentDidMount() {
        this.setState((prevState, props) => {
            return {
                currBlocks: this.props.currBlocks
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const { newBlock } = nextProps;
        if (nextProps !== undefined) {
            this.setState((prevState, props) => {
                return {
                    currBlocks: [...prevState.currBlocks, newBlock],
                }
            });
        }
    }

    _duplicateBlock(block) {
        this.setState((prevState, props) => {
            const idx = prevState.currBlocks.indexOf(block);
            return {
                currBlocks: [
                    ...prevState.currBlocks.slice(0, idx),
                    {...block, index: generateID() },
                    ...prevState.currBlocks.slice(idx)
                ]
            }
        });
    }

    _moveUpBlock(block) {
        this.setState((prevState, props) => {
            const idx = prevState.currBlocks.indexOf(block);
            if (idx === 0) {
                return { currBlocks: [...prevState.currBlocks] };
            }

            const prevBlock = prevState.currBlocks[idx - 1];
            return {
                currBlocks: [
                    ...prevState.currBlocks.slice(0, idx - 1),
                    {...block, index: generateID() },
                    {...prevBlock, index: generateID() },
                    ...prevState.currBlocks.slice(idx + 1)
                ]
            }
        });
    }

    _moveDownBlock(block) {
        this.setState((prevState, props) => {
            const idx = prevState.currBlocks.indexOf(block);
            if (idx === prevState.currBlocks.length - 1) {
                return { currBlocks: [...prevState.currBlocks] };
            }

            const nextBlock = prevState.currBlocks[idx + 1];
            return {
                currBlocks: [
                    ...prevState.currBlocks.slice(0, idx),
                    {...nextBlock, index: generateID() },
                    {...block, index: generateID() },
                    ...prevState.currBlocks.slice(idx + 2)
                ]
            }
        });
    }


    _removeBlock(block) {
        this.setState((prevState, props) => {
            return {
                currBlocks: prevState.currBlocks.filter((elm) => elm !== block)
            }
        });
    }

    render() {
        return (
            <div className="canvas" style={{ width: '65%', backgroundColor: 'lightgray', float: 'right'}} >
                <h3 style={{padding: '10px'}}>Canvas</h3>
                <ul>
                    {this.state.currBlocks.map((block, index) => (
                        <div key={block.index} style={{padding: '10px',margin: '10px 0', border: '2px dashed #51d1fb', backgroundColor: block.color}}>
                            <li style={{display: 'inline-block', width: '55%'}}>{block.content}</li>
                            <button onClick={this._duplicateBlock.bind(this, block)} style={{display: 'inline-block', padding: '5px', margin: '0 5px'}}>Duplicate</button>
                            <button onClick={this._moveUpBlock.bind(this, block)} style={{display: 'inline-block', padding: '5px', margin: '0 5px'}}>Move Up</button>
                            <button onClick={this._moveDownBlock.bind(this, block)} style={{display: 'inline-block', padding: '5px', margin: '0 5px'}}>Move Down</button>
                            <button onClick={this._removeBlock.bind(this, block)} style={{display: 'inline-block', padding: '5px', margin: '0 5px'}}>Delete</button>
                        </div>

                    ))}
                </ul>
            </div>
        );
    }
}
export default Canvas;


