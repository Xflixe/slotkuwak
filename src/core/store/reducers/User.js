import { PING, SIGN_IN} from "../actionTypes";

export const  User = (state={ isLogged:false , data:{}}, action)=>{
  switch (action.type){
    case SIGN_IN:
      return {...state,isLogged: action.payload.isLogged, data:action.payload.data};
    case PING:
      return {...state,isLogged: action.status, data:action.payload};

    default:
      return  state;
  }
}
