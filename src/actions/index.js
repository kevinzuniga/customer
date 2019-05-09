// index.js
import * as TYPE from './types';
import axios from 'axios';
import store from '../Store';

const apiUrl = 'https://api2.karaokesmart.co/v2';
const apiUrlPayment = 'https://test-payment.karaokesmart.co/v1';

export const fetchCard = (card) => {
  store.dispatch({
    type:TYPE.LOADING_CARD
  })
  return (dispatch) => {
    var profile = {};
    profile['last_four_card'] = card;
    return axios.post(`${apiUrlPayment}/subscriptions/card/`, profile, {
      headers: {
          "content-type": "application/json"
      }
    })
      .then(response => {
        console.log('response',response);
        //console.log(response.data.data);
        dispatch({
            type:TYPE.FETCH_CARD,
            payload: response.data.data
        })
      }) 
      .catch(error => {
        fetchError(dispatch,error,'card','Recibiendo las tarjetas');
      });
  };
};
export const fetchToken = (email) => {
  store.dispatch({
    type:TYPE.LOADING_TOKEN
  })
  console.log('busncando token...');
  return (dispatch) => {
    var profile = {};
    profile['email'] = email;
    return axios.post(`${apiUrl}/user/search/`, profile, {
      headers: {
          "content-type": "application/json"
      }
    })
      .then(response => {
        console.log('response',response);
        if (response.data.data.users.length===1)console.log(response.data.data.users[0].token);
        dispatch({
            type:TYPE.FETCH_TOKEN,
            payload: response.data.data.users
        })
      })
      .catch(error => {
        fetchError(dispatch,error,'token','Recibiendo token del usuario');
      });
  };
};
export const fetchUser = (token) => {
  store.dispatch({
    type:TYPE.LOADING_USER
  })
  const authorization = 'token ' + token;
  return (dispatch) => {
    return axios.get(`${apiUrl}/customer/info/user/`, {
      headers: {
          "content-type": "application/json",
          "Authorization": authorization
      }
    }).then(response => {
      console.log('response',response);
      dispatch({
          type:TYPE.FETCH_USER,
          payload: {...response.data.data,token}
      })
    })
    .catch(error => {
      fetchError(dispatch,error,'user','Informacion del usuario');
    });
  };
};
export const fetchStatistics = (token) => {
  store.dispatch({
    type:TYPE.LOADING_STATISTICS
  })
  const authorization = 'token ' + token;
  return (dispatch) => {
    return axios.get(`${apiUrl}/customer/info/statistics/`, {
      headers: {
          "content-type": "application/json",
          "Authorization": authorization
      }
    }).then(response => {
      console.log('response',response);
      dispatch({
          type:TYPE.FETCH_STATISTICS,
          payload: response.data.data
      })
    })
    .catch(error => {
      fetchError(dispatch,error,'statistics','Estadisticas del usuario');
    });
  };
};

export const fetchSubscription = (token) => {
  store.dispatch({
    type:TYPE.LOADING_SUBSCRIPTION
  })
  const authorization = 'token ' + token;
  return (dispatch) => {
    return axios.get(`${apiUrl}/customer/info/subscriptions/`, {
      headers: {
          "content-type": "application/json",
          "Authorization": authorization
      }
    }).then(response => {
      console.log('response subscription',response);
      dispatch({
          type:TYPE.FETCH_SUBSCRIPTION,
          payload: response.data.data
      })
    })
    .catch(error => {
      fetchError(dispatch,error,'subscription','Suscripcion del usuario');
    });
  };
};
export const fetchError = (dispatch, error, type, from) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    dispatch({
      type:TYPE.SHOW_ERROR,
      payload: {type,from,status:'Error '+error.response.status,message:error.response.data.detail}
    })
    console.log('data',error.response.data);
    console.log('status',error.response.status);
    console.log('headers',error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    dispatch({
      type:TYPE.SHOW_ERROR,
      payload: {type,from,status:'Error',message:error.request}
    })
    console.log('request',error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    dispatch({
      type:TYPE.SHOW_ERROR,
      payload: {type,from,status:'Error',message:error.message}
    })
    console.log('Error', error.message);
  }
  console.log(error.config);
}
export const hideError = () => {
  return (dispatch) =>
    dispatch({
      type:TYPE.HIDE_ERROR
    });
}
//especificar que los mensajes deben de tener tipo, from, status, message, etc
export const cancelSubscription = (id) => {
  store.dispatch({
    type:TYPE.LOADING_CANCEL_SUBSCRIPTION
  })
  //const authorization = 'token ' + token;
  return (dispatch) => {
    return axios.delete(`${apiUrlPayment}/subscriptions?user_id=`+id, {
      headers: {
          "content-type": "application/json"
      },
      data: {
        "cancel_now": false,
        "for_customer": false
      }
    }).then(response => {
      console.log('response CANCEL subscription',response);
      if (response.data.data.success) fetchStatusActions("success",dispatch,response.data.data.message,'cancel_subscription','Cancelacion de Suscripcion')
      else fetchStatusActions("error",dispatch,response.data.data,'cancel_subscription','Cancelacion de Suscripcion');
    })
    .catch(error => {
      fetchStatusActions("error",dispatch,error,'cancel_subscription','Cancelacion de Suscripcion');
    });
  };
};
export const resetPassword = (token) => {
  store.dispatch({
    type:TYPE.LOADING_RESET_PASSWORD
  })
  const authorization = 'token ' + token;
  return (dispatch) => {
    return axios.get(`${apiUrl}/user/setpassword/`, {
      headers: {
          "content-type": "application/json",
          "Authorization": authorization
      }
    }).then(response => {
      console.log('response RESET PASSWORD',response);
      if (response.data.success) fetchStatusActions("success",dispatch,response.data.data,'reset_password','Reset Password')
      else fetchStatusActions("error",dispatch,response.data,'reset_password','Reset Password');
    })
    .catch(error => {
      fetchStatusActions("error",dispatch,error,'reset_password','Reset Password');
    });
  };
};
export const sendEmailSafetyPay = (token,country) => {
  store.dispatch({
    type:TYPE.LOADING_SEND_EMAIL_SAFETYPAY
  })
  const authorization = 'token ' + token;
  return (dispatch) => {
    return axios.get(`${apiUrl}/pay/safety/pay?country=`+country, {
      headers: {
          "content-type": "application/json",
          "Authorization": authorization
      }
    }).then(response => {
      console.log('response mailing SAFETYPAY',response);
      if (response.data.success) fetchStatusActions("success",dispatch,response.data.data.message+" "+response.data.data.code,'send_email_safetypay','Mailing SafetyPay')
      else fetchStatusActions("error",dispatch,response.data.data,'send_email_safetypay','Mailing SafetyPay');
    })
    .catch(error => {
      fetchStatusActions("error",dispatch,error,'reset_password','Reset Password');
    });
  };
};
export const cancelSubscriptionDefinitely = (id) => {
  store.dispatch({
    type:TYPE.LOADING_CANCEL_SUBSCRIPTION_DEFINITELY
  })
  //const authorization = 'token ' + token;
  return (dispatch) => {
    return axios.delete(`${apiUrlPayment}/subscriptions?user_id=`+id, {
      headers: {
          "content-type": "application/json"
      },
      data: {
        "cancel_now": true,
        "for_customer": true
      }
    }).then(response => {
      console.log('response CANCEL subscription DEFINITELY',response);
      if (response.data.data.success) fetchStatusActions("success",dispatch,response.data.data.message,'cancel_subscription_definitely','Cancelacion de Suscripcion Definitivamente')
      else fetchStatusActions("error",dispatch,response.data.data,'cancel_subscription_definitely','Cancelacion de Suscripcion Definitivamente');
    })
    .catch(error => {
      fetchStatusActions("error",dispatch,error,'cancel_subscription_definitely','Cancelacion de Suscripcion Definitivamente');
    });
  };
};
export const cancelSubscription30days = (id) => {
  store.dispatch({
    type:TYPE.LOADING_CANCEL_SUBSCRIPTION_30_DAYS
  })
  //const authorization = 'token ' + token;
  return (dispatch) => {
    return axios.delete(`${apiUrlPayment}/subscriptions?user_id=`+id, {
      headers: {
          "content-type": "application/json"
      },
      data: {
        "cancel_now": false,
        "for_customer": true
      }
    }).then(response => {
      console.log('response CANCEL subscription a 30 dias.',response);
      if (response.data.data.success) fetchStatusActions("success",dispatch,response.data.data.message,'cancel_subscription_30_days','Cancelacion de Suscripcion a 30 Dias')
      else fetchStatusActions("error",dispatch,response.data.data,'cancel_subscription_30_days','Cancelacion de Suscripcion a 30 Dias');
    })
    .catch(error => {
      fetchStatusActions("error",dispatch,error,'cancel_subscription_30_days','Cancelacion de Suscripcion a 30 Dias');
    });
  };
};
export const fetchStatusActions = (status,dispatch, data, type, from) => {
  if (status==="success"){
    dispatch({
      type:TYPE.SHOW_STATUS_ACTIONS,
      payload: {status,type,from,statusCode:'Proceso exitoso',message:data}
    })
  } else if (status==="error"){
    const error=data;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      dispatch({
        type:TYPE.SHOW_STATUS_ACTIONS,
        payload: {status,type,from,statusCode:'Error '+error.response.status,message:error.response.data.detail}
      })
      console.log('data',error.response.data);
      console.log('status',error.response.status);
      console.log('headers',error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      dispatch({
        type:TYPE.SHOW_STATUS_ACTIONS,
        payload: {status,type,from,statusCode:'Error',message:error.request}
      })
      console.log('request',error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      dispatch({
        type:TYPE.SHOW_STATUS_ACTIONS,
        payload: {status,type,from,statusCode:'Error',message:error.message}
      })
      console.log('Error', error.message);
    }
    console.log(error.config);
  }

  
}