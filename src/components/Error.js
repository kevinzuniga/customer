import './info.css'
import React, { Component } from "react";
import { connect } from "react-redux";

class Error extends Component {
  render() {
    const { from, status, message } = this.props;
    return (
      <div className="isa_error">
        <h3><i className="fa fa-times-circle"></i>
          {from}</h3>
          <h3>{status+'-'+message}</h3>
      </div>  
    );
  }
}

export default connect(null,null)(Error);