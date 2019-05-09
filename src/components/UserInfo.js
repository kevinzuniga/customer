import "../index.css";
import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import Token from "./Token";
import Actions from "./Actions";
import User from "./User";
import Statistics from "./Statistics";
import Subscription from "./Subscription";
import Preloader from "./Preloader";

class UserInfo extends Component {
  state = {
    addFormValue: {
      fromDate:""
    }
  };

  componentWillMount() {
      //this.props.fetchToken();
  }

  componentDidMount() {
  }
  componentDidUpdate() {

  }

  renderTokens(){
    const { tokens } = this.props;
    const tokenlist = _.map(tokens, (value, key) => {
      return <Token key={key} email={value.email} token_user={value.token} />;
    });
    if (!_.isEmpty(tokenlist)) {
      const tableResult = 
      <table>
        <thead>
          <tr>
              <th>Email</th>
              <th>Token</th>
              <th>Info</th>
              <th>Info Mixpanel</th>
              <th>Suscripcion</th>
          </tr>
        </thead>
        <tbody>
          {tokenlist}
        </tbody>
      </table>;
      return tableResult;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h5>No hay ningun usuario con ese email.</h5>
        <p>Busca con otro email.</p>
      </div>
    );
  }

  render() {
    const { tokens, error } = this.props;
    if ((error.isError && error.type === "token") || tokens === "") {
      return (
        <div>
        </div>
      );
    }
    if (tokens === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    } 
    return (
      <div className="to-do-list-container">
        <div className="row">
          {this.renderTokens()}
          <User/>
          <Statistics/>
          <Subscription/>
          <Actions/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tokens, user, error }) => {
  return {
    tokens,
    user,
    error
  };
};

export default connect(mapStateToProps, actions)(UserInfo);