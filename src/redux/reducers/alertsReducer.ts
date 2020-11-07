import { ActionTypes, Message, AlertActions } from '../actions/index';

export default function (state: Message[] = [], action: AlertActions) {
  switch (action.type) {
    case ActionTypes.setAlert:
      console.log('lsdjfhlskjflsdkjfljk');
      return [...state, action.payload];
    case ActionTypes.removeAlert:
      console.log('removing');
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}
