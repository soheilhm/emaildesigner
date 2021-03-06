import undoable, { includeAction } from "redux-undo";
import * as itemTypes from '../constants/itemTypes/itemTypes';
import generateID from "../common/uuid";

const blockItemTypes = ['A', 'B', 'C', 'D', 'E'];

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function _generateRandomBlockData(id) {
    let columns = [];
    const columnNum = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < columnNum; ++i) {
        const blockItem = blockItemTypes[Math.floor(Math.random() * blockItemTypes.length)];
        const columnID = Math.random().toString(36).substring(7);
        columns.push({
            columnIdx: columnID,
            size: columnNum === 1 ? "1" :`1/${columnNum}`,
            type: blockItem,
            background: getRandomColor(),
            content: `${blockItem}`
        })
    }

    return JSON.stringify({
        blockID: id,
        backgroundColor: getRandomColor(),
        columnNum,
        paddingTop: 20,
        paddingBottom: 20,
        columns
    });
}

const initialStaticBlocks = [
    {
        index: "STATIC_BLOCK_01",
        type: itemTypes.STATIC_BLOCK,
        title: "Block1",
        content: _generateRandomBlockData(generateID())
    },
    {
        index: "STATIC_BLOCK_02",
        type: itemTypes.STATIC_BLOCK,
        title: "Block2",
        content: _generateRandomBlockData(generateID())
    },
    {
        index: "STATIC_BLOCK_03",
        type: itemTypes.STATIC_BLOCK,
        title: "Block3",
        content: _generateRandomBlockData(generateID())
    },
    {
        index: "STATIC_BLOCK_04",
        type: itemTypes.STATIC_BLOCK,
        title: "Block4",
        content: _generateRandomBlockData(generateID())
    },
    {
        index: "STATIC_BLOCK_05",
        type: itemTypes.STATIC_BLOCK,
        title: "Block5",
        content: _generateRandomBlockData(generateID())
    }
];

const toolboxBlocks = (state = initialStaticBlocks, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default toolboxBlocks;