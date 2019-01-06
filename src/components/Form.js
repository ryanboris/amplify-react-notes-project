import React from 'react'

export default props => {
  console.log(props.currentNote)
  return (
    <form
      onSubmit={props.isBeingUpdated ? props.updateNote : props.handleAddNote}
      className="mb3 flex flex-column items-center"
    >
      <input
        type="text"
        className="pa2 f3 mt5"
        placeholder={
          props.isBeingUpdated ? 'Update your note.' : 'Write your note.'
        }
        value={props.note}
        onChange={props.handleChangeNote}
      />
      {!props.isBeingUpdated ? (
        <button className="pa2 mt4-m f4" type="submit">
          Add Note
        </button>
      ) : (
        <button className="pa2 mt4-m f4" type="submit">
          Update Note
        </button>
      )}

      {props.isBeingUpdated && (
        <button className="pa2 mt4-m f4" onClick={props.cancelUpdate}>
          Cancel
        </button>
      )}

      {props.isBeingUpdated && (
        <div className="pa2 mt4-m f3">
          Original note: {props.currentNote.note}
        </div>
      )}
    </form>
  )
}
