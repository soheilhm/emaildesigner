import React, { PureComponent } from 'react';

export default class Block extends PureComponent {
    state = {
        componentHighlighted: false,
    }

    _startComponentDrag(componentID) {
        this.props.resetBlockDragging(true);
        document.getElementById(componentID).style.opacity = 0.1;
        this.draggedComponentID = componentID;
    }

    _startHoverComponent(componentID, blockContainerID) {
        if (!this.props.toolboxBlockDragging) {
            document.getElementById(blockContainerID).style.background = 'repeating-linear-gradient(45deg,pink, pink 10px, #ccc 10px,#ccc 20px)';
            this.hoverComponentID = componentID;
            this.setState((state) => {
                return {
                    ...state,
                    componentHighlighted: true
                }
            });
        }

    }

    _endHoverComponent(blockContainerID) {
        if (!this.props.toolboxBlockDragging) {
            document.getElementById(blockContainerID).style.background = 'white';
            this.hoverComponentID = null;
            this.setState((state) => {
                return {
                    ...state,
                    componentHighlighted: false
                }
            });
        }
    }

    _endComponentDrag(componentID) {
        this.props.resetBlockDragging(false);
        document.getElementById(componentID).style.opacity = 1;
    }

    render() {
        const { blockID, paddingTop, paddingBottom, columnNum, columns } = this.props.data;
        const BLOCK_WIDTH = 570;
        const BORDER_BOUNDRY_SIZE = 4;
        const blockContainerID = `${blockID}-container`;
        return (
            <div>
                <div
                    id={blockContainerID}
                    style={{
                        padding: `${paddingTop}px 10px ${paddingBottom}px`,
                        border: '2px dashed #51d1fb',
                        cursor: 'move',
                        backgroundColor: 'white',
                        position: 'relative'
                    }}
                >
                    <div style={{ margin: '0 auto', width: '570px' }} >
                        {columns.map((column, idx) => {
                            const componentID = `${blockID}-column-${idx}`;
                            const shouldComponetHighlight = this.state.componentHighlighted && this.hoverComponentID === componentID;
                            return (
                                <div
                                    key={componentID}
                                    id={componentID}
                                    style={{
                                        display: 'inline-block',
                                        width: `calc(${BLOCK_WIDTH / columnNum}px - ${2 * BORDER_BOUNDRY_SIZE}px)`,
                                        height: '50px',
                                        border: `${BORDER_BOUNDRY_SIZE}px dashed #51d1fb`,
                                        background: shouldComponetHighlight ? 'repeating-linear-gradient(135deg,orange, orange 10px, #ccc 10px,#ccc 20px)' : column.background,
                                    }}
                                    draggable={this.props.canDrag}
                                    onDragStart={(event) => this._startComponentDrag(componentID)}
                                    onDragOver={() => this._startHoverComponent(componentID, blockContainerID)}
                                    onDragLeave={() => this._endHoverComponent(blockContainerID)}
                                    onDragEnd={() => this._endComponentDrag(componentID)}
                                >
                                    {/* Based on column.type different elements should be rendered, this is just for test: */}
                                    <p style={{ padding: "0 10px", textAlign: 'center', color: 'black', fontWeight: "bold", textShadow: '2px 2px lightgray' }}>{column.content}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        );
    }
}