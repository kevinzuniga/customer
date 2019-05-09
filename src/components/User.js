import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import _ from "lodash";
import Error from "./Error";
import Preloader from "./Preloader";
import {naming} from "./naming"

class User extends Component {
  handleSearchUser = token_user => {
    const { fetchUser } = this.props;
    fetchUser(token_user);
  };
  render() {
    const { user, error } = this.props;
    if (error!= undefined && error.isError && error.type === "user" ) {
      return (
        <div className="to-do-list-container">
          <div className="row">
            <Error from={error.from} status={error.status} message={error.message}/>
          </div>
        </div>
      );
    }
    if (user === "loading") {
      return (
        <div className="row center-align">
          <div className="col s4 offset-s4">
            <Preloader />
          </div>
        </div>
      );
    }
    const userListInfo = _.map(user, (value, key) => {
      return <tr key={key}>
              <th>{naming(key)}</th>
              <th>{value!==null && value!==undefined?naming(value.toString()):""}</th>
             </tr>;
    });
    if (!_.isEmpty(userListInfo)) {
      const tableResult = 
      <table>
        <thead>
          <tr>
              <th>Informacion del usuario</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          {userListInfo}
        </tbody>
      </table>;
      return tableResult;
    }
    return (
        <div/>
    );
  }
}

const mapStateToProps = ({ user, error }) => {
  return {
    user,
    error
  };
};

export default connect(mapStateToProps,{fetchUser})(User);