import undoable, { includeAction } from "redux-undo";
import * as actionTypes from "../constants/actionTypes/canvasBlocks";
import * as itemTypes from '../constants/itemTypes/itemTypes';
import generateID from "../common/uuid";

const initialCustomizedBlocks = [
    {
        index: "6fbe4417-57f7-4758-85d2-a2ef8e517dba",
        type: itemTypes.CUSTOMIZED_BLOCK,
        title: "Block1",
        content: "Block1",
        color: "#2774f1"
    },

    {
        index: "661b20e7-23c3-4505-a74d-c2f370993caf",
        type: itemTypes.CUSTOMIZED_BLOCK,
        title: "Block3",
        content: "Block3",
        color: '#37a04c'
    },

    {
        index: "cdaf1bd7-1811-4255-9a0b-584779826380",
        type: itemTypes.CUSTOMIZED_BLOCK,
        title: "Block5",
        content: "Block5",
        color: '#f87059'
    },
    {
        index: "c059b491-624a-4b64-a6f7-b8fa00baa79c",
        type: itemTypes.CUSTOMIZED_BLOCK,
        title: "Block7",
        content: "Block7",
        color: "#f07ac9"
    }
];

const canvasBlocks = (state = initialCustomizedBlocks, action) => {
    let idx, block, draggedBlockIdx, droppedPosition, droppedBlockIdx, droppedBlock, dropIdx;
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
                { ...block, index: generateID(), type: itemTypes.CUSTOMIZED_BLOCK },
                { ...prevBlock, index: generateID() },
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
                { ...nextBlock, index: generateID() },
                { ...block, index: generateID(), type: itemTypes.CUSTOMIZED_BLOCK },
                ...state.slice(idx + 2)
            ];

        case actionTypes.SWAP_BLOCKS:
                draggedBlockIdx= action.payload.draggedBlockIdx;
                droppedPosition = action.payload.droppedPosition;
                droppedBlockIdx = action.payload.droppedBlockIdx;
                if (draggedBlockIdx === droppedBlockIdx) {
                    return state;
                }
                const draggedBlock = state.filter(elm => elm.index === draggedBlockIdx)[0];
                droppedBlock = state.filter(elm => elm.index === droppedBlockIdx)[0];
                const tempState = state.filter((elm) => elm.index !== draggedBlock.index);
                dropIdx = tempState.indexOf(droppedBlock);
                if (droppedPosition === 'before') {
                    return [
                        ...tempState.slice(0, dropIdx),
                        { ...draggedBlock, index: generateID(), type: itemTypes.CUSTOMIZED_BLOCK },
                        ...tempState.slice(dropIdx)
                    ];
                } else {
                    return [
                        ...tempState.slice(0, dropIdx + 1),
                        { ...draggedBlock, index: generateID(), type: itemTypes.CUSTOMIZED_BLOCK },
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
        actionTypes.SWAP_BLOCKS
    ])
});
