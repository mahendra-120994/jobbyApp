import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

import ProtectiveRoute from './components/ProtectiveRoute'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <div className="app-container">
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectiveRoute exact path="/" component={Home} />
      <ProtectiveRoute exact path="/jobs" component={Jobs} />
      <ProtectiveRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
