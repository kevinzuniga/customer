import "../index.css";
import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import CardItem from "./CardItem";
import Preloader from "./Preloader";
import {naming} from "./naming";

class CardList extends Component {
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

  renderCardList(){
    const { cards } = this.props;
    const cardList = _.map(cards, (value, key) => {
        return <CardItem key={key} card={value} />;
      });
    if (!_.isEmpty(cardList)) {
      //const cardListJson = this.CardListJson(cards);
      const tableResult = //<JsonToTable json={cards} />;
      <table>
        <thead>
          <tr>
              <th>ID</th>
              <th>Numero de Tarjeta</th>
              <th>Mes</th>
              <th>Año</th>
              <th>Tipo</th>
              <th>Email</th>
              <th>Consultar</th>
          </tr>
        </thead>
        <tbody>
            {cardList}
        </tbody>
      </table>;
      return tableResult;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h5>No hay ningun usuario con esa tarjeta.</h5>
        <p>Busca con otra tarjeta.</p>
      </div>
    );
  }

  render() {
    const { cards, error } = this.props;
    if ((error.isError && error.type === "card") || cards === "") {
      return (
        <div>
        </div>
      );
    }
    if (cards === "loading") {
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
          {this.renderCardList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cards, error }) => {
  return {
    cards,
    error
  };
};

export default connect(mapStateToProps, actions)(CardList);