import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NotesList from './components/Notes/Notes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/notes" component={NotesList} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
