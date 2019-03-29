import React, { Component } from "react";
import "./App.css";
import SingleMeetingAnalysisContainer from "./features/singleMeetingAnalysis/SingleMeetingAnaylsisContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SingleMeetingAnalysisContainer />
      </div>
    );
  }
}

export default App;
