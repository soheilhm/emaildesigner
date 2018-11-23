import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <div style={{ display: 'grid'}}>
    <button onClick={onUndo} disabled={!canUndo} style={{ padding: '5px', margin: '5px auto', color: !canUndo ? 'gray' : 'black', width: '200px', fontSize: '20px' }}>
      Undo
    </button>
    <button onClick={onRedo} disabled={!canRedo} style={{ padding: '5px', margin: '5px auto', color: !canRedo ? 'gray' : 'black', width: '200px', fontSize: '20px' }}>
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