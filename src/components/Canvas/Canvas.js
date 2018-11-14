import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


class Canvas extends Component {
    state = {

    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };
    render() {
        const blocks = this.props.blocks || [];
        const SortableItem = SortableElement(({value}) =>
            <li>{value}</li>
        );

        const SortableList = SortableContainer(({items}) => {
            return (
                <div className="canvas" style={{ width: '65%', backgroundColor: 'lightgray', float: 'right'}} >
                    <h3>Canvas</h3>
                    <ul>
                        {items.map((value, index) => (
                            <SortableItem key={`item-${index}`} index={index} value={value} />
                        ))}
                    </ul>
                </div>
            );
        });

        return <SortableList items={blocks} onSortEnd={this.onSortEnd} />;
    }
}
export default Canvas;


