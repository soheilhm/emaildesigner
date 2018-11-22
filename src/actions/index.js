import { createAction } from 'redux-actions';
import * as types from '../constants/actionTypes/canvasBlocks';

export const addBlock = createAction(types.ADD_BLOCK, data => (data));
export const duplicateBlock = createAction(types.DUPLICATE_BLOCK, data => (data));
export const removeBlock = createAction(types.REMOVE_BLOCK, data => (data));
export const moveUpBlock = createAction(types.MOVE_UP_BLOCK, data => (data));
export const moveDownBlock = createAction(types.MOVE_DOWN_BLOCK, data => (data));