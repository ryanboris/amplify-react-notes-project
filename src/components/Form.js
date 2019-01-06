import React from 'react'

export default props => {
  return (
    <form
      onSubmit={props.handleAddNote}
      className="mb3 flex flex-column items-center"
    >
      <input
        type="text"
        className="pa2 f3 mt5"
        placeholder="Write your note"
        value={props.note}
        onChange={props.handleChangeNote}
      />
      <button className="pa2 mt4-m f4" type="submit">
        Add Note
      </button>
    </form>
  )
}
