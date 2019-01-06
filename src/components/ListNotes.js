import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faIgloo, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo, faTrash)

const pointerStyle = {
  cursor: 'pointer'
}

export default props => {
  return (
    <div>
      {props.notes.map(note => {
        return (
          <div
            key={note.id}
            className="flex flex-column fl w-third items-center pa5"
          >
            <ul className="pa0 flex flex-row justify-center">
              <li className="list">
                <div>
                  <span className="pa3">
                    <FontAwesomeIcon
                      style={pointerStyle}
                      icon="trash"
                      size="sm"
                      onClick={() => props.deleteNote(note.id)}
                    />
                  </span>
                  <span
                    className="f3 pa1"
                    onClick={() => props.handleUpdateInput(note)}
                  >
                    {note.note}
                  </span>
                </div>
              </li>
            </ul>
            <button className="bg-transparent bn f4" />
          </div>
        )
      })}
    </div>
  )
}
