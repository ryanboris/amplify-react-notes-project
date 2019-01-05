import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { createNote } from './graphql/mutations'

class App extends Component {
  state = {
    note: '',
    notes: []
  }

  handleChangeNote = event => {
    this.setState({ note: event.target.value })
  }

  handleAddNote = async event => {
    const { note } = this.state
    event.preventDefault()
    const input = {
      note
    }
    const response = await API.graphql(graphqlOperation(createNote, { input }))
  }

  render() {
    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-l">Amplify Notetaker</h1>
        {/* Note Form*/}
        <form onSubmit={this.handleAddNote} className="mb3">
          <input
            type="text"
            className="pa2 f4"
            placeholder="Write your note"
            onChange={this.handleChangeNote}
          />
          <button className="pa2 f4" type="submit">
            Add Note
          </button>
        </form>
        {/** Notes */}
        <div>
          {this.state.notes.map(note => {
            return (
              <div key={note.id} className="flex items-center">
                <li className="list pa1 f3">{note}</li>

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
