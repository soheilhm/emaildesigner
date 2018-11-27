import undoable, { includeAction } from "redux-undo";
import * as actionTypes from "../constants/actionTypes/canvasBlocks";
import * as itemTypes from '../constants/itemTypes/itemTypes';
import generateID from "../common/uuid";

const blockItemTypes=['IMAGE', 'TEXT', 'BUTTON', 'SOCIAL'];

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
    const columnNum = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < columnNum; ++i) {
        const blockItem = blockItemTypes[Math.floor(Math.random() * blockItemTypes.length)];
        const columnID = Math.random().toString(36).substring(7);
        columns.push({
            columnIdx: `col-${columnID}`,
            type: 'test',
            background: getRandomColor(),
            content: `${blockItem} {${columnID}}`
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

const initialCustomizedBlocks = [
    {
        index: "6fbe4417-57f7-4758-85d2-a2ef8e517dba",
        type: itemTypes.CUSTOMIZED_BLOCK,
        title: "Block1",
        content: _generateRandomBlockData("6fbe4417-57f7-4758-85d2-a2ef8e517dba"),
    },

    {
        index: "661b20e7-23c3-4505-a74d-c2f370993caf",
        type: itemTypes.CUSTOMIZED_BLOCK,
        title: "Block3",
        content: _generateRandomBlockData("661b20e7-23c3-4505-a74d-c2f370993caf"),
    },

    {
        index: "cdaf1bd7-1811-4255-9a0b-584779826380",
        type: itemTypes.CUSTOMIZED_BLOCK,
        title: "Block5",
        content: _generateRandomBlockData("cdaf1bd7-1811-4255-9a0b-584779826380"),
    },
    {
        index: "c059b491-624a-4b64-a6f7-b8fa00baa79c",
        type: itemTypes.CUSTOMIZED_BLOCK,
        title: "Block7",
        content: _generateRandomBlockData("c059b491-624a-4b64-a6f7-b8fa00baa79c"),
    }
];

const canvasBlocks = (state = initialCustomizedBlocks, action) => {
    let idx, block, draggedBlockIdx, droppedPosition, droppedBlockIdx, draggedBlock, droppedBlock, dragIdx, dropIdx, tempState;
    switch (action.type) {
        case actionTypes.ADD_BLOCK:
            block = action.payload;
            return [
                ...state,
                { ...block, index: generateID(), type: itemTypes.CUSTOMIZED_BLOCK }
            ];

        case actionTypes.DUPLICATE_BLOCK:
            block = action.payload;
            idx = state.indexOf(block);
            return [
                ...state.slice(0, idx),
                { ...block, index: generateID(), type: itemTypes.CUSTOMIZED_BLOCK },
                ...state.slice(idx)
            ];

        case actionTypes.REMOVE_BLOCK:
            block = action.payload;
            return [...state.filter(elm => elm !== block)];

        case actionTypes.MOVE_UP_BLOCK:
            block = action.payload;
            idx = state.indexOf(block);
            if (idx === 0) {
                return state;
            }
            const prevBlock = state[idx - 1];
            return [
                ...state.slice(0, idx - 1),
                { ...block, type: itemTypes.CUSTOMIZED_BLOCK },
                { ...prevBlock },
                ...state.slice(idx + 1)
            ];

        case actionTypes.MOVE_DOWN_BLOCK:
            block = action.payload;
            idx = state.indexOf(block);
            if (idx === state.length - 1) {
                return state;
            }
            const nextBlock = state[idx + 1];
            return [
                ...state.slice(0, idx),
                { ...nextBlock },
                { ...block, type: itemTypes.CUSTOMIZED_BLOCK },
                ...state.slice(idx + 2)
            ];

        case actionTypes.SWAP_BLOCKS:
            draggedBlockIdx = action.payload.draggedBlockIdx;
            droppedPosition = action.payload.droppedPosition;
            droppedBlockIdx = action.payload.droppedBlockIdx;
            if (draggedBlockIdx === droppedBlockIdx) {
                return state;
            }
            draggedBlock = state.filter(elm => elm.index === draggedBlockIdx)[0];
            droppedBlock = state.filter(elm => elm.index === droppedBlockIdx)[0];
            tempState = state.filter((elm) => elm.index !== draggedBlock.index);
            dropIdx = tempState.indexOf(droppedBlock);
            if (droppedPosition === 'before') {
                return [
                    ...tempState.slice(0, dropIdx),
                    { ...draggedBlock, type: itemTypes.CUSTOMIZED_BLOCK },
                    ...tempState.slice(dropIdx)
                ];
            } else {
                return [
                    ...tempState.slice(0, dropIdx + 1),
                    { ...draggedBlock, type: itemTypes.CUSTOMIZED_BLOCK },
                    ...tempState.slice(dropIdx + 1)
                ];
            }

        case actionTypes.INSERT_NEW_BLOCK:
            droppedBlockIdx = action.payload.droppedBlockIdx;
            droppedPosition = action.payload.droppedPosition;
            block = action.payload.block;
            droppedBlock = state.filter(elm => elm.index === droppedBlockIdx)[0];
            dropIdx = state.indexOf(droppedBlock);
            if (droppedPosition === 'before') {
                return [
                    ...state.slice(0, dropIdx),
                    { ...block, index: generateID(), type: itemTypes.CUSTOMIZED_BLOCK },
                    ...state.slice(dropIdx)
                ];
            } else {
                return [
                    ...state.slice(0, dropIdx + 1),
                    { ...block, index: generateID(), type: itemTypes.CUSTOMIZED_BLOCK },
                    ...state.slice(dropIdx + 1)
                ];
            }

        case actionTypes.SWAP_BLOCK_ITEMS:
            const { draggedItem, droppedItem } = action.payload;
            const { draggedBlockIndex, draggedColumnIdx, draggedContent, draggedBackground } = draggedItem;
            const { droppedBlockIndex, droppedColumnIdx, droppedContent, droppedBackground } = droppedItem;
            draggedBlock = state.filter(elm => elm.index === draggedBlockIndex)[0];
            droppedBlock = state.filter(elm => elm.index === droppedBlockIndex)[0];
            dragIdx = state.indexOf(draggedBlock);
            dropIdx = state.indexOf(droppedBlock);
            let draggedBlockContent = JSON.parse(draggedBlock.content);
            let droppedBlockContent = JSON.parse(droppedBlock.content);

            if (draggedBlockIndex === droppedBlockIndex) {
                draggedBlockContent.columns.forEach((column) => {
                    if (column.columnIdx === draggedColumnIdx) {
                        column.content = droppedContent;
                        column.background = droppedBackground;
                    } else if (column.columnIdx === droppedColumnIdx) {
                        column.content = draggedContent;
                        column.background = draggedBackground;
                    }
                });
                return [
                    ...state.slice(0, dropIdx),
                    {
                        ...droppedBlock,
                        content: JSON.stringify(draggedBlockContent),
                    },
                    ...state.slice(dropIdx + 1)
                ];
            }

            draggedBlockContent.columns.forEach((column) => {
                if (column.columnIdx === draggedColumnIdx) {
                    column.content = droppedContent;
                    column.background = droppedBackground;
                }
            });
            droppedBlockContent.columns.forEach((column) => {
                if (column.columnIdx === droppedColumnIdx) {
                    column.content = draggedContent;
                    column.background = draggedBackground;
                }
            });

            tempState = [
                ...state.slice(0, dragIdx),
                {
                    ...draggedBlock,
                    content: JSON.stringify(draggedBlockContent),
                },
                ...state.slice(dragIdx + 1)
            ];
            return [
                ...tempState.slice(0, dropIdx),
                {
                    ...droppedBlock,
                    content: JSON.stringify(droppedBlockContent),
                },
                ...tempState.slice(dropIdx + 1)
            ];
        default:
            return state;
    }
};

export default undoable(canvasBlocks, {
    canvasBlocks: includeAction([
        actionTypes.ADD_BLOCK,
        actionTypes.DUPLICATE_BLOCK,
        actionTypes.REMOVE_BLOCK,
        actionTypes.MOVE_UP_BLOCK,
        actionTypes.MOVE_DOWN_BLOCK,
        actionTypes.SWAP_BLOCKS,
        actionTypes.INSERT_NEW_BLOCK,
        actionTypes.SWAP_BLOCK_ITEMS
    ])
});
