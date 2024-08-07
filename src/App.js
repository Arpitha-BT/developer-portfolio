import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Main, ProjectPage, ResumePage, LoginPage, AdminPage } from './pages'
import { BackToTop } from './components'
import ScrollToTop from './utils/ScrollToTop'

import './App.css'

function App() {
  return (
    <div className="app">
      <Router>
        <ScrollToTop/>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/resume" exact component={ResumePage} />
          <Route path="/projects" exact component={ProjectPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/admin" exact component={AdminPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
      <BackToTop />
    </div>
  );
}

export default App;
