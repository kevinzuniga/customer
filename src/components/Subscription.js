import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Error from "./Error";
import Preloader from "./Preloader";
import {naming} from "./naming";
import { JsonToTable } from "react-json-to-table";

class Subscription extends Component {
  render() {
    const { subscription, error } = this.props;
    console.log('subscription',subscription);
    if (error!= undefined && error.isError && error.type === "subscription" ) {
        return (
          <div className="to-do-list-container">
            <div className="row">
              <Error from={error.from} status={error.status} message={error.message}/>
            </div>
          </div>
        );
    }
    if (subscription === "loading") {
        return (
          <div className="row center-align">
            <div className="col s4 offset-s4">
              <Preloader />
            </div>
          </div>
        );
    }
    // if (subscription!= undefined && typeof subscription.subscriptions === 'object' && subscription.subscriptions.length == 0){
    //   return (
    //     <div className="col s10 offset-s1 center-align">
    //     <h4>No tiene suscripciones el usuario.</h4>
    //   </div>)
    // }
    const userSubscription = (subscription) => {
      var resultJson = {};
      Object.keys(subscription).forEach(key => {
        console.log(key, subscription[key])
        const value = subscription[key];
        const newKey = naming(key);
        var newValue = value!==null && value!==undefined?value:"";
        if (typeof newValue  === "object") {
          var subResult = {};
          Object.keys(newValue).forEach(subKey => {
            const subValue = newValue[subKey];
            const newSubKey = naming(subKey);
            var newSubValue = subValue!==null && subValue!==undefined?naming(subValue.toString()):"";
            subResult[newSubKey]=newSubValue;
          });
          newValue=subResult;
        } else newValue = value.toString(); 
        resultJson[newKey]=newValue;
      });
      console.log('resultJson',resultJson);
      return resultJson;
    }
    // const userListSubscription = _.map(subscription, (value, key) => {
    //   const newKey = naming(key);
    //   var newValue = value!==null && value!==undefined?value:"";
    //   if (typeof newValue  === "Object") {
    //     newValue = _.map(newValue,(subValue, subKey) => {
    //       const newSubKey = naming(subKey);
    //       var newSubValue = subValue!==null && subValue!==undefined?naming(subValue.toString()):"";
    //       return {newSubKey:newSubValue}
    //     });
    //   }
    //   return {}
    //   // return <tr key={key}>
    //   //         <td>{naming(key)}</td>
    //   //         <td>{value!==null && value!==undefined?naming(value.toString()):""}</td>
    //   //        </tr>;
    // });
    const userSubscriptionJson = userSubscription(subscription);
    if (!_.isEmpty(userSubscriptionJson)) {
      const tableResult = 
      <table>
        <thead>
          <tr>
              <th>Suscripciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <th><JsonToTable json={userSubscriptionJson} /></th>
          </tr>
          
        </tbody>
      </table>;
      return tableResult;
    }
    return (
        <div/>
    );
  }
}

const mapStateToProps = ({ subscription, error }) => {
  return {
    subscription,
    error
  };
};

export default connect(mapStateToProps,null)(Subscription);