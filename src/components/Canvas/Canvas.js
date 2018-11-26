import React, { Component } from 'react';
import { connect } from 'react-redux';
import CanvasBlockContainer from './CanvasBlockContainer';

class Canvas extends Component {
    render() {
        return (
            <div className="canvas" style={{ width: '68%', backgroundColor: 'lightgray', float: 'right' }} >
                <h3 style={{ padding: '10px' }}>Canvas (Customized Blocks)</h3>
                <ul>
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
