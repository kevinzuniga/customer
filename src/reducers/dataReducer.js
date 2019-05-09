import * as Types from "../actions/types";

export const cards = (state = "", action) => {
  switch (action.type) {
    case Types.LOADING_CARD:
      return "loading";
    case Types.FETCH_CARD:
      return action.payload;
    default:
      return state;
  }
};

export const tokens = (state = "", action) => {
  switch (action.type) {
    case Types.LOADING_CARD:
      return "";
    case Types.LOADING_TOKEN:
      return "loading";
    case Types.FETCH_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export const user = (state = "", action) => {
  switch (action.type) {
    case Types.LOADING_CARD:
      return "";
    case Types.LOADING_TOKEN:
      return "";
    case Types.LOADING_USER:
      return "loading";
    case Types.FETCH_USER:
      return action.payload;
    default:
      return state;
  }
};

export const statistics = (state = "", action) => {
  switch (action.type) {
    case Types.LOADING_CARD:
      return "";
    case Types.LOADING_TOKEN:
      return "";
    case Types.LOADING_STATISTICS:
      return "loading";
    case Types.FETCH_STATISTICS:
      return action.payload;
    default:
      return state;
  }
};

export const subscription = (state = "", action) => {
  switch (action.type) {
    case Types.LOADING_CARD:
      return "";
    case Types.LOADING_TOKEN:
      return "";
    case Types.LOADING_SUBSCRIPTION:
      return "loading";
    case Types.FETCH_SUBSCRIPTION:
      return action.payload;
    default:
      return state;
  }
};

export const error = (state = {isError:false}, action) => {
  switch (action.type) {
    case Types.SHOW_ERROR:
      return {isError:true,...action.payload};
    case Types.HIDE_ERROR:
      return {isError:false};
    case Types.LOADING_TOKEN:
      return {isError:false};
    case Types.LOADING_USER:
      return {isError:false};
    case Types.LOADING_STATISTICS:
      return {isError:false};
    case Types.LOADING_SUBSCRIPTION:
      return {isError:false};
    case Types.LOADING_CARD:
      return {isError:false};
    default:
      return state;
  }
};
export const statusActions = (state = {isFetched:false}, action) => {
  switch (action.type) {
    case Types.LOADING_TOKEN:
    return {isFetched:false,isFetching:false};
    case Types.LOADING_USER:
    return {isFetched:false,isFetching:false};
    case Types.SHOW_STATUS_ACTIONS:
      return {isFetched:true,isFetching:false,...action.payload};
    case Types.LOADING_CANCEL_SUBSCRIPTION:
      return {isFetched:false,isFetching:true};
    //LOADING_CANCEL_SUBSCRIPTION_DEFINITELY
    case Types.LOADING_CANCEL_SUBSCRIPTION_DEFINITELY:
      return {isFetched:false,isFetching:true};
    case Types.LOADING_RESET_PASSWORD:
      return {isFetched:false,isFetching:true};
    case Types.LOADING_SEND_EMAIL_SAFETYPAY:
      return {isFetched:false,isFetching:true};
    case Types.HIDE_STATUS_ACTIONS:
      return {isFetched:false,isFetching:false};
    default:
      return state;
  }
};