import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { listNotes } from '../graphql/queries'
import { createNote, deleteNote } from '../graphql/mutations'
import Header from '../compartments/header'
import Form from '../components/Form'
import ListNotes from '../components/ListNotes'

class App extends Component {
  state = {
    deletedNote: null,
    note: '',
    notes: []
  }

  componentDidMount() {
    this.listNotes()
  }

  listNotes = () => {
    API.graphql(graphqlOperation(listNotes))
      .then(response => this.setState({ notes: response.data.listNotes.items }))
      .catch(e => console.error(e))
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
          notes: [response.data.createNote, ...notes],
          note: ''
        })
      })
      .catch(e => console.error(e))
  }

  deleteNote = id => {
    const note = this.state.notes.find(item => item.id === id)
    API.graphql(graphqlOperation(deleteNote, { input: { id: note.id } })).then(
      () => this.listNotes()
    )
  }

  handleChangeNote = event => {
    this.setState({ note: event.target.value })
  }

  render() {
    return (
      <div>
        <Header />
        <Form
          note={this.state.note}
          handleAddNote={this.handleAddNote}
          handleChangeNote={this.handleChangeNote}
        />
        <ListNotes
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          listNotes={this.listNotes}
        />
      </div>
    )
  }
}
export default withAuthenticator(App, { includeGreetings: true })
