import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { createNote } from './graphql/mutations'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo, faTrash)

class App extends Component {
  state = {
    note: '',
    notes: []
  }

  deleteNote = (event, id) => {}

  handleChangeNote = event => {
    this.setState({ note: event.target.value })
  }

  handleAddNote = event => {
    const { note, notes } = this.state
    event.preventDefault()
    const input = {
      note
    }
    API.graphql(graphqlOperation(createNote, { input }))
      .then(response => {
        this.setState({
          notes: [...notes, response.data.createNote],
          note: ''
        })
      })
      .catch(e => console.error(e))
  }

  render() {
    const { note, notes } = this.state
    const pointerStyle = {
      cursor: 'pointer'
    }
    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-l">Amplify Notetaker</h1>
        {/* Note Form*/}
        <form onSubmit={this.handleAddNote} className="mb3">
          <input
            type="text"
            className="pa2 f4"
            placeholder="Write your note"
            value={note}
            onChange={this.handleChangeNote}
          />
          <button className="pa2 f4" type="submit">
            Add Note
          </button>
        </form>
        {/** Notes */}
        <div>
          {notes.map(note => {
            return (
              <div key={note.id} className="flex items-center">
                <ul>
                  <li className="list pa1 f3">
                    <div>
                      <p>{note.note}</p>
                      <p>
                        <FontAwesomeIcon
                          style={pointerStyle}
                          id={note.id}
                          icon="trash"
                          size="xs"
                          onClick={this.deleteNote}
                        />
                      </p>
                    </div>
                  </li>
                </ul>
                <button className="bg-transparent bn f4" />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
export default withAuthenticator(App, { includeGreetings: true })
