import undoable, { includeAction } from 'redux-undo';
import * as types from '../constants/actionTypes/canvasBlocks';
import generateID from '../common/uuid';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const initialState = [
    { 
        index: '6fbe4417-57f7-4758-85d2-a2ef8e517dba',
        type: 'Block1',
        content: 'Block1',
        color: getRandomColor()
    },
    { 
        index: '4d3ffd21-1856-4d0d-87ff-7c869aa57dec',
        type: 'Block2',
        content: 'Block2',
        color: getRandomColor()
    },
    { 
        index: '661b20e7-23c3-4505-a74d-c2f370993caf', 
        type: 'Block3',
        content: 'Block3',
        color: getRandomColor()
    },
    { 
        index: '723ea475-518a-4aaf-b47b-6a765abf0582',
        type: 'Block4',
        content: 'Block4',
        color: getRandomColor()
    },
    { 
        index: 'cdaf1bd7-1811-4255-9a0b-584779826380',
        type: 'Block5',
        content: 'Block5',
        color: getRandomColor()
    },
    { 
        index: 'b37f3d78-ff31-470e-ab7d-adf4993a325c',
        type: 'Block6',
        content: 'Block6',
        color: getRandomColor()
    },
    { 
        index: 'c059b491-624a-4b64-a6f7-b8fa00baa79c',
        type: 'Block7',
        content: 'Block7',
        color: getRandomColor()
    }
];

const canvasBlocks = (state = initialState, action) => {
    let idx, block;
    switch (action.type) {
        case types.ADD_BLOCK:
            block = action.payload;
            return [
                ...state,
                {...block, index: generateID() },
            ] 
        
        case types.DUPLICATE_BLOCK:
            block = action.payload;
            idx = state.indexOf(block);
            return [
                ...state.slice(0, idx),
                {...block, index: generateID() },
                ...state.slice(idx)
            ]
        
        case types.REMOVE_BLOCK:
            block = action.payload;
            return [...state.filter((elm) => elm !== block)];
        
        case types.MOVE_UP_BLOCK:
            block = action.payload;
            idx = state.indexOf(block);
            if (idx === 0) {
                return state;
            }
            const prevBlock = state[idx - 1];
            return [
                ...state.slice(0, idx - 1),
                {...block, index: generateID() },
                {...prevBlock, index: generateID() },
                ...state.slice(idx + 1)
            ];
        
        case types.MOVE_DOWN_BLOCK:
            block = action.payload;
            idx = state.indexOf(block);
            if (idx === state.length - 1) {
                return state;
            }
            const nextBlock = state[idx + 1];
            return [
                ...state.slice(0, idx),
                {...nextBlock, index: generateID() },
                {...block, index: generateID() },
                ...state.slice(idx + 2)
            ];
        
        default:
            return state;
    }
};

export default undoable(canvasBlocks, { canvasBlocks: includeAction(['DUPLICATE_BLOCK', 'MOVE_UP_BLOCK', 'MOVE_DOWN_BLOCK', 'REMOVE_BLOCK']) });