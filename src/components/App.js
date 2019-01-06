import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { listNotes } from '../graphql/queries'
import { createNote, deleteNote, updateNote } from '../graphql/mutations'
import Header from '../compartments/header'
import Form from '../components/Form'
import ListNotes from '../components/ListNotes'

class App extends Component {
  state = {
    note: '',
    notes: [],
    isBeingUpdated: false,
    currentNote: null,
    updatedNotes: null
  }

  componentDidMount() {
    this.listNotes()
  }

  listNotes = () => {
    API.graphql(graphqlOperation(listNotes))
      .then(response =>
        this.setState({
          notes: response.data.listNotes.items,
          isBeingUpdated: false,
          currentNote: null,
          note: ''
        })
      )
      .catch(e => console.error(e))
  }

  handleAddNote = e => {
    const { note, notes } = this.state
    e.preventDefault()
    const input = {
      note
    }
    API.graphql(graphqlOperation(createNote, { input }))
      .then(response => {
        this.setState({
          notes: [response.data.createNote, ...notes],
          note: '',
          isBeingUpdated: false,
          currentNote: null
        })
      })
      .catch(e => console.error(e))
  }

  deleteNote = id => {
    API.graphql(graphqlOperation(deleteNote, { input: { id } })).then(() => {
      const newNotes = this.state.notes.filter(note => note.id !== id)
      this.setState({ notes: newNotes })
    })
  }

  updateNote = e => {
    const note = this.state.notes.find(
      item => item.id === this.state.currentNote.id
    )
    e.preventDefault()
    API.graphql(
      graphqlOperation(updateNote, {
        input: { id: note.id, note: this.state.note }
      })
    )
    .then(() => this.listNotes())
  }

  handleChangeNote = e => {
    this.setState({ note: e.target.value })
  }

  handleUpdateInput = note => {
    this.setState({
      isBeingUpdated: !this.isBeingUpdated,
      currentNote: note
    })
  }

  cancelUpdate = () => {
    this.setState({
      isBeingUpdated: false
    })
  }

  render() {
    const { note, notes, isBeingUpdated, currentNote } = this.state
    return (
      <div>
        <Header />
        <Form
          note={note}
          notes={notes}
          handleAddNote={this.handleAddNote}
          handleChangeNote={this.handleChangeNote}
          handleUpdateInput={this.handleUpdateInput}
          isBeingUpdated={isBeingUpdated}
          updateNote={this.updateNote}
          currentNote={currentNote}
          cancelUpdate={this.cancelUpdate}
        />
        {!isBeingUpdated && (
          <ListNotes
            notes={notes}
            deleteNote={this.deleteNote}
            listNotes={this.listNotes}
            handleUpdateInput={this.handleUpdateInput}
            isBeingUpdated={isBeingUpdated}
            currentNote={currentNote}
            cancelUpdate={this.cancelUpdate}
          />
        )}
      </div>
    )
  }
}
export default withAuthenticator(App, { includeGreetings: true })
