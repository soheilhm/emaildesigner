import undoable, { includeAction } from "redux-undo";
import * as itemTypes from '../constants/itemTypes/itemTypes';
import generateID from "../common/uuid";

function _generateRandomBlockData(id) {
    let columns = [];
    const columnNum = Math.floor(Math.random() * 3) + 1;
    const randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    for (let i = 0; i < columnNum; ++i) {
        columns.push({
            type: 'test',
            content: Math.random().toString(36).substring(7)
        })
    }

    return JSON.stringify({
        blockID: id,
        background: `repeating-linear-gradient(45deg,${randomColor}, ${randomColor} 10px, #ccc 10px,#ccc 20px)`,
        columnNum,
        paddingTop: 30,
        paddingBottom: 30,
        columns
    });
}

const initialStaticBlocks = [
    {
        index: "STATIC_BLOCK_01",
        type: itemTypes.STATIC_BLOCK,
        title: "Block1",
        content: _generateRandomBlockData(generateID()),
        color: "#2774f1"
    },
    {
        index: "STATIC_BLOCK_02",
        type: itemTypes.STATIC_BLOCK,
        title: "Block2",
        content: _generateRandomBlockData(generateID()),
        color: '#afb09e'
    },
    {
        index: "STATIC_BLOCK_03",
        type: itemTypes.STATIC_BLOCK,
        title: "Block3",
        content: _generateRandomBlockData(generateID()),
        color: '#37a04c'
    },
    {
        index: "STATIC_BLOCK_04",
        type: itemTypes.STATIC_BLOCK,
        title: "Block4",
        content: _generateRandomBlockData(generateID()),
        color: '#e2b8c2'
    },
    {
        index: "STATIC_BLOCK_05",
        type: itemTypes.STATIC_BLOCK,
        title: "Block5",
        content: _generateRandomBlockData(generateID()),
        color: '#f87059'
    },
    {
        index: "STATIC_BLOCK_06",
        type: itemTypes.STATIC_BLOCK,
        title: "Block6",
        content: _generateRandomBlockData(generateID()),
        color: "#faaa42"
    },
    {
        index: "STATIC_BLOCK_07",
        type: itemTypes.STATIC_BLOCK,
        title: "Block7",
        content: _generateRandomBlockData(generateID()),
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
