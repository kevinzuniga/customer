import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchStatistics, fetchSubscription } from "../actions";

class Token extends Component {
  handleSearch = (fn, token_user) => {
    fn(token_user);
  };
  render() {
    const { email, token_user, fetchUser, fetchStatistics, fetchSubscription } = this.props;
    return (
      <tr>
          <td>{email}</td>
          <td>{token_user}</td>
          <td>
            <span
              onClick={() => this.handleSearch(fetchUser,token_user)}
              className="waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn-small"
            >
              <i className="small material-icons">search</i>
            </span>
          </td>
          <td>
            <span
              onClick={() => this.handleSearch(fetchStatistics,token_user)}
              className="waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn-small"
            >
              <i className="small material-icons">search</i>
            </span>
          </td>
          <td>
            <span
              onClick={() => this.handleSearch(fetchSubscription,token_user)}
              className="waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn-small"
            >
              <i className="small material-icons">search</i>
            </span>
          </td>
      </tr>  
    );
  }
}

export default connect(null,{fetchUser, fetchStatistics, fetchSubscription})(Token);