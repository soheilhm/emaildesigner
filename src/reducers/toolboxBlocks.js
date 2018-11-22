import undoable, { includeAction } from "redux-undo";
import * as itemTypes from '../constants/itemTypes/itemTypes';

const initialStaticBlocks = [
    {
        index: "6fbe4417-57f7-4758-85d2-a2ef8e517dba",
        type: itemTypes.STATIC_BLOCK,
        title: "Block1",
        content: "Block1",
        color: "#2774f1"
    },
    {
        index: "4d3ffd21-1856-4d0d-87ff-7c869aa57dec",
        type: itemTypes.STATIC_BLOCK,
        title: "Block2",
        content: "Block2",
        color: '#afb09e'
    },
    {
        index: "661b20e7-23c3-4505-a74d-c2f370993caf",
        type: itemTypes.STATIC_BLOCK,
        title: "Block3",
        content: "Block3",
        color: '#37a04c'
    },
    {
        index: "723ea475-518a-4aaf-b47b-6a765abf0582",
        type: itemTypes.STATIC_BLOCK,
        title: "Block4",
        content: "Block4",
        color: '#e2b8c2'
    },
    {
        index: "cdaf1bd7-1811-4255-9a0b-584779826380",
        type: itemTypes.STATIC_BLOCK,
        title: "Block5",
        content: "Block5",
        color: '#f87059'
    },
    {
        index: "b37f3d78-ff31-470e-ab7d-adf4993a325c",
        type: itemTypes.STATIC_BLOCK,
        title: "Block6",
        content: "Block6",
        color: "#faaa42"
    },
    {
        index: "c059b491-624a-4b64-a6f7-b8fa00baa79c",
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
