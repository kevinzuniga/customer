import React, { Component } from "react";
import FirstComponent from "./components/FirstComponent";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

class App extends Component {
  componentWillMount() {
    console.log('willmount');
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={FirstComponent} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, null)(App);