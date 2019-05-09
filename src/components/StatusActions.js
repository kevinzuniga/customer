import './info.css'
import React, { Component } from "react";
import { connect } from "react-redux";
import { stat } from 'fs';

class StatusActions extends Component {
  render() {
    const { statusActions } = this.props;
    console.log("MESSSAGE statusActions",statusActions);
    const iconClass=statusActions.status=="success"?"fa fa-check":"fa fa-times-circle";
    return (
      <div className={statusActions.status=="success"?"isa_success":"isa_error"}>
        <h3><i className={iconClass}></i>
          {statusActions.from}</h3>
          <h3>{statusActions.statusCode+' - '+statusActions.message}</h3>
      </div>  
    );
  }
}

export default connect(null,null)(StatusActions);