import { ActionTypes, Message, AlertActions } from "../actions/index";

const alertsTestState: Message[] = [
  {
    alertType: "warning",
    msg: "This is a warning error",
    id: 100000,
  },
];

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
