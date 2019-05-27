import React, { Component } from "react";
import "./App.css";
import SingleMeetingAnalysisContainer from "./features/singleMeetingAnalysis/SingleMeetingAnaylsisContainer";
import { Router, Route } from "react-router-dom";
import LoginContainer from "./features/login/LoginContainer";
import DashboardContainer from "./features/dashboard/DashboardContainer";
import AuthCallback from "./auth/AuthCallback";

import Auth from "./auth/auth";
import history from "./auth/history";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route
            exact
            path="/authCallback"
            render={props => {
              handleAuthentication(props);
              return <AuthCallback {...props} />;
            }}
          />
          <Route
            exact
            path="/login"
            auth={auth}
            component={props => <LoginContainer auth={auth} {...props} />}
          />
          <Route path="/" exact component={SingleMeetingAnalysisContainer} />
          <Route
            path="/dashboard"
            component={props => <DashboardContainer auth={auth} {...props} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
