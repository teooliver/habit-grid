//TODO: get proper type for store and next
export const logger = (store: any ) => (next: any)=> {
  if(!console.group){
    return next
  }
  // TODO: get proper type for action
  return (action: any) => {
    console.group(action.type);
    console.log('%c prev state', 'color:gray',store.getState());
    console.log('%c action', 'color:blue', action)
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd();
    return returnValue;
  }
}