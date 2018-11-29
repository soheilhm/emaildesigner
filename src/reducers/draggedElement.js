import undoable, { includeAction } from "redux-undo";
import * as actionTypes from "../constants/actionTypes/canvasBlocks";

const initialDraggedElement = null;

const draggedElement = (state = initialDraggedElement, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_DRAGGED_ELEMENT:
            return action.payload;

        case actionTypes.RESET_DRAGGED_ELEMENT:
            return null;

        default:
            return state;
    }
};

export default draggedElement;