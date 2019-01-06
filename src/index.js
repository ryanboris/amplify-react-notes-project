import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)

ReactDOM.render(<App />, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
