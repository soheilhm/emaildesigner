import undoable, { includeAction } from "redux-undo";
import * as itemTypes from '../constants/itemTypes/itemTypes';

const initialStaticBlocks = [
    {
        index: '311139e8-45a1-4815-8fc0-195ebe395ab6',
        type: itemTypes.STATIC_BLOCK,
        title: 'Block1',
        content: 'Block1',
    },
    {
        index: 'ad56fb77-5617-401c-8fad-67b4cb481efb',
        type: itemTypes.STATIC_BLOCK,
        title: 'Block2',
        content: 'Block2',
    },
    {
        index: '02f2a335-a295-4d8d-a3ed-6316dbc1604e',
        type: itemTypes.STATIC_BLOCK,
        title: 'Block3',
        content: 'Block3',
    },
    {
        index: '9d339d39-3e75-4a17-b0ab-65af6d679a43',
        type: itemTypes.STATIC_BLOCK,
        title: 'Block4',
        content: 'Block4',
    },
    {
        index: "cdaf1bd7-1811-4255-9a0b-584779826380",
        type: itemTypes.STATIC_BLOCK,
        title: "Block5",
        content: "Block5",
    },
    {
        index: "b37f3d78-ff31-470e-ab7d-adf4993a325c",
        type: itemTypes.STATIC_BLOCK,
        title: "Block6",
        content: "Block6",
    },
    {
        index: "c059b491-624a-4b64-a6f7-b8fa00baa79c",
        type: itemTypes.STATIC_BLOCK,
        title: "Block7",
        content: "Block7",
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
