import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class CardItem extends Component {
  render() {
    const { card, fetchToken } = this.props;
    return (
      <tr>
          <td>{card.id}</td>
          <td>{card.number_card}</td>
          <td>{card.month}</td>
          <td>{card.year}</td>
          <td>{card.payment_type}</td>
          <td>{card.email}</td>
          <td>
            <span
              onClick={() => fetchToken(card.email)}
              className="waves-effect waves-light teal lighten-5 teal-text text-darken-4 btn-small"
            >
              <i className="small material-icons">search</i>
            </span>
          </td> 
      </tr>  
    );
  }
}

export default connect(null, actions)(CardItem);