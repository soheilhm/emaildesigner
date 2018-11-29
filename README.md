## piKasso

A flexible Drag and drop Javascript Library to build complicated lists.

Built with these technologies:

  - React (https://reactjs.org/)
  - Redux (https://redux.js.org/)
  - Redux undo (https://github.com/omnidan/redux-undo)
  - react-dnd (https://react-dnd.github.io/react-dnd/about)

These library has 3 sections. The toolbox which consists of static blocks than can be dragged to canvas. Once a block is added from toolbox to canvas or if it is duplicated in canvas, a new uuid index will be generated for it and all properties in it can be changed. The undo redo history keeps tab of all the state changes in canvas blocks.

Example Canvas Block Data Structure:

```js
{
    index: '6fbe4417-57f7-4758-85d2-a2ef8e517dba',          // unique identifier for each block  (uuid4)
    type: 'CUSTOMIZED_BLOCK',                               // block type: CUSTOMIZED_BLOCK (canvas blocks), STATIC_BLOCK (toolbox blocks) or BLOCK_COLLECTION(future)
    title: 'Block1',                                        // block title for display purposes
    content: JSON.stringify({
        blockID: '6fbe4417-57f7-4758-85d2-a2ef8e517dba',    // same as top level index (won't change)
        backgroundColor: '#C08D92',                         // background color for block
        columnNum: 2,                                       // number of columns in each block
        paddingTop: 20,                                     // block padding top
        paddingBottom: 20,                                  // block padding bottom
        columns: [                                          // an array of block items
            {
                columnIdx: 'fflo79f',                       // each block item has a unique index
                size: '1/2',                                // each block item has a size(1, 1/2, 1/3, 1/4 or 3/4)
                type: 'D',                                  // each block item has a type (single character types for now, in the future will be `IMAGE`, `SOCIAL`, ...)
                background: '#11B7CA',                      // will be removed, only for prototype phase (make development easier by visually coloring each item)
                content: 'D'                                // block item content is an object describing the item, depending on item type will be a different schema 
            },
            {
                columnIdx: 'thb1ee',
                size: '1/2',
                type: 'D',
                background: '#7D42C0',
                content: 'D'
            }
        ]
    })
}
```