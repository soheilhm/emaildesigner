/**
 * Each item in the editor has a type,
 * e.g. Each block is either STATIC or CUSTOMIZED
 * STATIC blocks are loaded in the toolbox block list and have set of predefined dummy values
 * CUSTOMIZED blocks are former STATIC blocks that had been modified by user and is loaded in the canvas
 * Note: As a block is moved from the toolbox list to canvas, a new unique identifier is generated for it and its type will be converted from STATIC to CUSTOMIZED
 */

export const STATIC_BLOCK = 'STATIC_BLOCK';
export const CUSTOMIZED_BLOCK = 'CUSTOMIZED_BLOCK';
export const CUSTOMIZED_BLOCK_CHILD = 'CUSTOMIZED_BLOCK_CHILD';
export const ITEM_SOURCE_CANVAS = 'ITEM_SOURCE_CANVAS';
