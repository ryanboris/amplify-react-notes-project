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
          <div key={note.id} onClick={() => props.deleteNote(note.id)}>
            <ul className="pa0 flex flex-row justify-center">
              <li className="list">
                <div>
                  <span className="pa1">
                    <FontAwesomeIcon
                      style={pointerStyle}
                      icon="trash"
                      size="sm"
                    />
                  </span>
                  <span className="f3 pa1">{note.note}</span>
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
