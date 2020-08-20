import { ActionTypes, Message, AlertActions } from "../actions/index";

export default function (state: Message[] = [], action: AlertActions) {
  switch (action.type) {
    case ActionTypes.setAlert:
      return [...state, action.payload];
    case ActionTypes.removeAlert:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
