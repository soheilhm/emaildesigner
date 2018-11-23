import undoable, { includeAction } from "redux-undo";
import * as itemTypes from '../constants/itemTypes/itemTypes';

const initialStaticBlocks = [
    {
        index: "STATIC_BLOCK_01",
        type: itemTypes.STATIC_BLOCK,
        title: "Block1",
        content: "Block1",
        color: "#2774f1"
    },
    {
        index: "STATIC_BLOCK_02",
        type: itemTypes.STATIC_BLOCK,
        title: "Block2",
        content: "Block2",
        color: '#afb09e'
    },
    {
        index: "STATIC_BLOCK_03",
        type: itemTypes.STATIC_BLOCK,
        title: "Block3",
        content: "Block3",
        color: '#37a04c'
    },
    {
        index: "STATIC_BLOCK_04",
        type: itemTypes.STATIC_BLOCK,
        title: "Block4",
        content: "Block4",
        color: '#e2b8c2'
    },
    {
        index: "STATIC_BLOCK_05",
        type: itemTypes.STATIC_BLOCK,
        title: "Block5",
        content: "Block5",
        color: '#f87059'
    },
    {
        index: "STATIC_BLOCK_06",
        type: itemTypes.STATIC_BLOCK,
        title: "Block6",
        content: "Block6",
        color: "#faaa42"
    },
    {
        index: "STATIC_BLOCK_07",
        type: itemTypes.STATIC_BLOCK,
        title: "Block7",
        content: "Block7",
        color: "#f07ac9"
    }
];

const toolboxBlocks = (state = initialStaticBlocks, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default undoable(toolboxBlocks, {
    toolboxBlocks: includeAction([])
});
