import React from 'react'

import ReactDOM from 'react-dom'

import '@trendmicro/react-sidenav/dist/react-sidenav.css'

import 'bootstrap-css-only/css/bootstrap.min.css'

import { Switch, Router, Route } from 'react-router'

import { createHashHistory } from 'history'

import { LayoutMenu } from './components/LayoutMenu'

import { CustomerRegistrationForm } from './components/CustomerRegistrationForm'

import { ResortsList } from './components/ResortsList'

import { UsersList } from './components/UsersList'

const history = createHashHistory()

const App = () => {
  return (
    <Router history={history}>
      <LayoutMenu>
        <Switch>
          <Route path='/users' component={UsersList} />
          <Route path='/resorts-list' component={ResortsList} />
          <Route path='/' component={CustomerRegistrationForm} />
        </Switch>
      </LayoutMenu>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
