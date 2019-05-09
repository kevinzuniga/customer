import "../index.css";
import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import UserInfo from "./UserInfo";
import CardList from "./CardList";
import Error from "./Error";

class FirstComponent extends Component {
  state = {
    formValue: {
      email:"",
      creditCardLast4:""
    }
  };
  componentWillMount() {
    //this.props.fetchToken();
    console.log('componentWillMount','state',this.state);
  }

  componentDidMount() {
    console.log('componentDidMount','state',this.state);
  }
  componentDidUpdate() {
    console.log('componentDidUpdate','state',this.state);
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('handleFormSubmit');
    const { formValue } = this.state;
    const { fetchToken, fetchCard } = this.props;
    if (formValue.email !== "") fetchToken(formValue.email)
    else if (formValue.creditCardLast4 !== "") fetchCard(formValue.creditCardLast4);
  };
  handleInputChange = event => {
    //event.persist();
    // console.log("event",event);
    // console.log("event.target",event.target);
    const { formValue } = this.state;
    var tempObjetct = {};
    switch (event.target.id){
      case "email":
        formValue.creditCardLast4="";
      break;
      case "creditCardLast4":
        formValue.email="";
      break;
    }
    tempObjetct[event.target.id]=event.target.value;
    this.setState({ formValue: {...formValue, ...tempObjetct} });
  };

  renderForm(){
    const { formValue } = this.state;
    return (
      <div id="todo-add-form" className="col s10 offset-s1">
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input
              value={formValue.email}
              onChange={this.handleInputChange}
              id="email"
              type="email"
              className="validate"
            />
            <label htmlFor="email">Email de usuario</label>
            <span className="helper-text" data-error="No es un email correcto!" data-success="Correcto!"></span>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">credit_card</i>
            <input
              value={formValue.creditCardLast4}
              onChange={this.handleInputChange}
              id="creditCardLast4"
              type="number"
              className="validate"
            />
            <label htmlFor="creditCardLast4">Tarjeta (4 ultimos digitos)</label>
            <span className="helper-text" data-error="No es un numero!" data-success="Correcto!"></span>
          </div>
          <div className="button-field">
            <button className="btn waves-effect waves-light">Enviar<i className="material-icons right">send</i></button>
          </div>
        </form>
        <CardList/>
        <UserInfo/>
      </div>
    );
  }

  render() {
    const { error } = this.props;
    if (error.isError && error.type === "token") {
      return (
        <div>
          {this.renderForm()}
          <div className="row">
            <Error from={error.from} status={error.status} message={error.message}/>
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = ({ error }) => {
  return {
    error
  };
};

export default connect(mapStateToProps, actions)(FirstComponent);