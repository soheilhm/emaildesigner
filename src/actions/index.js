import { createAction } from 'redux-actions';
import * as types from '../constants/actionTypes/canvasBlocks';

export const addBlock = createAction(types.ADD_BLOCK, data => (data));
export const duplicateBlock = createAction(types.DUPLICATE_BLOCK, data => (data));
export const removeBlock = createAction(types.REMOVE_BLOCK, data => (data));
export const moveUpBlock = createAction(types.MOVE_UP_BLOCK, data => (data));
export const moveDownBlock = createAction(types.MOVE_DOWN_BLOCK, data => (data));
export const swapBlocks = createAction(types.SWAP_BLOCKS, data => (data));

/** move this to another file in the futute */
export const insertNewBlock = createAction(types.INSERT_NEW_BLOCK, data => (data));

/** move this to another file in the futute */
export const updateDraggedElement = createAction(types.UPDATE_DRAGGED_ELEMENT, data => (data));
export const resetDraggedElement = createAction(types.RESET_DRAGGED_ELEMENT);

/** move this to another file in the futute */
export const swapBlockItems = createAction(types.SWAP_BLOCK_ITEMS);