import undoable, { includeAction } from "redux-undo";
import Chance from "chance";
import * as itemTypes from '../constants/itemTypes/itemTypes';
import generateID from "../common/uuid";

function _generateRandomBlockData(id) {
    let columns = [];
    const columnNum = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < columnNum; ++i) {
        const randomColor = `#${(function co(lor) {
            return (lor +=
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
                && (lor.length === 6) ? lor : co(lor);
        })('')}`;
        columns.push({
            columnIdx: `col-${Math.random().toString(36).substring(7)}`,
            type: 'test',
            background: randomColor,
            content: new Chance().name().split(' ')[0]
        })
    }

    return JSON.stringify({
        blockID: id,
        background: 'repeating-linear-gradient(45deg,white, white 10px, lightgoldenrodyellow 10px,lightgoldenrodyellow 20px)',
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
