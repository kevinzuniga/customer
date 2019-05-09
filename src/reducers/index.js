import { combineReducers } from "redux";
import {statusActions,cards,tokens,user,error, subscription, statistics} from "./dataReducer";

export default combineReducers({
  statusActions,
  cards,
  tokens,
  user,
  error,
  subscription, 
  statistics
});
