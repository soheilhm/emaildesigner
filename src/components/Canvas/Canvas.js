import React, { Component } from 'react';
import { connect } from 'react-redux';
import CanvasBlockContainer from './CanvasBlockContainer';

class Canvas extends Component {
    render() {
        return (
            <div className="canvas" style={{ width: '68%', border: '2px solid lightgray', background: 'repeating-linear-gradient(45deg, white, white 5px, lightgray 5px, lightgray 10px)', float: 'right' }} >
                <h3 style={{ padding: '10px', textAlign: 'center', textShadow: '1px 1px 1px white' }}>Canvas (Customized Blocks)</h3>
                <ul style={{ padding: '0 10px' }}>
                    {this.props.canvasBlocks.map((block) => {
                        return <CanvasBlockContainer
                            key={block.index}
                            block={block}
                        />;
                    })}
                </ul>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return { canvasBlocks: state.canvasBlocks.present };
};

export default connect(mapStateToProps)(Canvas);
