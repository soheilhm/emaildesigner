import { combineReducers } from 'redux';
import canvasBlocks from './canvasBlocks';
import toolboxBlocks from './toolboxBlocks';
import draggedElement from './draggedElement';

const reducer = combineReducers({
    canvasBlocks,
    toolboxBlocks,
    draggedElement
})

export default reducer;