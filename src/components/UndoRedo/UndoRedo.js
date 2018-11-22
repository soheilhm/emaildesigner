import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div style={{ backgroundColor: '#dca6a6', padding: '20px', margin: '0 0 10px' }}>
    <button onClick={onUndo} disabled={!canUndo} style={{ padding: '20px', margin: '10px', color: !canUndo ? 'lightgray' : 'black' }}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo} style={{ padding: '20px', margin: '10px', color: !canRedo ? 'lightgray' : 'black' }}>
      Redo
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  canUndo: Object.keys(state).every(key => state[key].past.length > 0),
  canRedo: Object.keys(state).every(key => state[key].future.length > 0),
});

const mapDispatchToProps = ({
  onUndo: UndoActionCreators.undo,
  onRedo: UndoActionCreators.redo
});

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);