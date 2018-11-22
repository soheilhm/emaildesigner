import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as canvasActions from '../../actions/index';
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
        this.props.dispatch(canvasActions.duplicateBlock(block));
    }

    _moveUpBlock(block) {
        this.props.dispatch(canvasActions.moveUpBlock(block));
    }

    _moveDownBlock(block) {
        this.props.dispatch(canvasActions.moveDownBlock(block));
    }


    _removeBlock(block) {
        this.props.dispatch(canvasActions.removeBlock(block));
    }

    render() {
        return (
            <div className="canvas" style={{ width: '65%', backgroundColor: 'lightgray', float: 'right'}} >
                <h3 style={{padding: '10px'}}>Canvas</h3>
                <ul>
                    {this.props.currBlocks.map((block) => (
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

const mapStateToProps = state => {
    return { currBlocks: state.canvasBlocks.present };
};

export default connect(mapStateToProps)(Canvas);


