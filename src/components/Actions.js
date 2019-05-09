import "../index.css";
import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import StatusActions from "./StatusActions";
import User from "./User";
import Statistics from "./Statistics";
import Subscription from "./Subscription";
import Preloader from "./Preloader";

class Actions extends Component {
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
  handleCancelSubscription = (event) => {
    event.preventDefault();
    console.log('handleCancelSubscription');
    const {user, cancelSubscription} = this.props;
    cancelSubscription(user.id);
  }
  handleResetPassword = (event) => {
    event.preventDefault();
    console.log('handleResetPassword');
    const {user, resetPassword} = this.props;
    resetPassword(user.token);
  }
  handleSendEmailSafetyPay = (event) => {
    event.preventDefault();
    console.log('handleSendEmailSafetyPay');
    const {user, sendEmailSafetyPay} = this.props;
    sendEmailSafetyPay(user.token,user.country);
  }
  handleCancelSubscriptionDefinitely = (event) => {
    event.preventDefault();
    console.log('handleCancelSubscriptionDefinitely');
    const {user, cancelSubscriptionDefinitely} = this.props;
    cancelSubscriptionDefinitely(user.id);
  }
  handleCancelSubscription30days = (event) => {
    event.preventDefault();
    console.log('handleCancelSubscription30days');
    const {user, cancelSubscription30days} = this.props;
    cancelSubscription30days(user.id);
  }
  renderActions(showStatus,showLoading){
    const {statusActions}=this.props;
    return (
      <table>
        <thead>
          <tr>
              <th>Cancelar Suscripcion</th>
              <th>Resetear Contraseña</th>
              <th>Mandar SafetyPay</th>
              <th>Cancelar definitivamente la suscripcion</th>
              <th>Cambiar suscripcion a 30 dias</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button className="btn waves-effect waves-light red" onClick={this.handleCancelSubscription}>Ejecutar<i className="material-icons right">eject</i></button></td>
            <td><button className="btn waves-effect waves-light" onClick={this.handleResetPassword}>Ejecutar<i className="material-icons right">eject</i></button></td>
            <td><button className="btn waves-effect waves-light" onClick={this.handleSendEmailSafetyPay}>Ejecutar<i className="material-icons right">eject</i></button></td>
            <td><button className="btn waves-effect waves-light red" onClick={this.handleCancelSubscriptionDefinitely}>Ejecutar<i className="material-icons right">eject</i></button></td>
            <td><button className="btn waves-effect waves-light orange" onClick={this.handleCancelSubscription30days}>Ejecutar<i className="material-icons right">eject</i></button></td>
          </tr>
          <tr>
            <td colSpan="5">{showStatus?<StatusActions statusActions={statusActions}/>:
                (showLoading?<div className="row center-align">
                  <div className="col s4 offset-s4">
                    <Preloader />
                  </div>
                </div>:<div/>)
            }</td>
          </tr>
        </tbody>
      </table>
    );
  }
  render() {
    const { statusActions, user } = this.props;
    console.log("statusActions",statusActions);
    const isThereUser = user.token!==undefined&&user.token!==null?true:false;
    if (isThereUser && !statusActions.isFetching && !statusActions.isFetched) {console.log("1");return this.renderActions(false,false)}
    else if (isThereUser && statusActions.isFetching) {console.log("2");return this.renderActions(false,true)}
    else if (isThereUser && statusActions.isFetched) {console.log("3");return this.renderActions(true,false)}
    else {console.log("4");return (<div></div>);}
  }
}

const mapStateToProps = ({ statusActions, user }) => {
  return {
    statusActions,
    user
  };
};

export default connect(mapStateToProps, actions)(Actions);