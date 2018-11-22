import { combineReducers } from 'redux';
import canvasBlocks from './canvasBlocks';
import toolboxBlocks from './toolboxBlocks';

const reducer = combineReducers({
    canvasBlocks,
    toolboxBlocks,
})

export default reducer;