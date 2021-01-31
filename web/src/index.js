import React from 'react'

import ReactDOM from 'react-dom'

import { CustomerRegistrationForm } from './components/CustomerRegistrationForm'

import 'bootstrap-css-only'

const App = () => {
  <div className='container'>
    <CustomerRegistrationForm />
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))
