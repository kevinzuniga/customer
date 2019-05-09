import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Error from "./Error";
import Preloader from "./Preloader";
import {naming} from "./naming"

class Statistics extends Component {
  render() {
    const { statistics, error } = this.props;
    if (error!= undefined && error.isError && error.type === "statistics" ) {
        return (
          <div className="to-do-list-container">
            <div className="row">
              <Error from={error.from} status={error.status} message={error.message}/>
            </div>
          </div>
        );
    }
    if (statistics === "loading") {
        return (
          <div className="row center-align">
            <div className="col s4 offset-s4">
              <Preloader />
            </div>
          </div>
        );
    }
    const userListStatistics = _.map(statistics, (value, key) => {
      if (key == "dates_open_session") return;
      return <tr key={key}>
              <th>{naming(key)}</th>
              <th>{value!==null && value!==undefined?naming(value.toString()):""}</th>
             </tr>;
    });
    if (!_.isEmpty(userListStatistics)) {
      const tableResult = 
      <table>
        <thead>
          <tr>
              <th>Estadisticas del usuario</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          {userListStatistics}
        </tbody>
      </table>;
      return tableResult;
    }
    return (
        <div/>
    );
  }
}

const mapStateToProps = ({ statistics, error }) => {
  return {
    statistics,
    error
  };
};

export default connect(mapStateToProps,null)(Statistics);