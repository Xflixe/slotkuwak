import {useDispatch, useSelector} from "react-redux";
import {SIGN_IN} from "../store/actionTypes";
import _ from 'lodash'
import {Actions} from "../index";
import async from "async";
export function useUser() {
    const User = useSelector(store=>store.User);
    const dispatch = useDispatch();
    const signIn = (data)=>{
        window.user = data;
        dispatch({
            type:SIGN_IN,
            payload:{
                isLogged:true,
                data:data
            }
        })
    }
    const signOut = (callback=null)=>{
        window.user =  null;
        dispatch({
            type:SIGN_IN,
            payload:{
                isLogged:false,
                data: {}
            }
        })
        if(callback && _.isFunction(callback)){
            callback()
        }
    }

    const checkSession = () => {
      return dispatch(Actions.User.checkSession())
    }


    return  {User, signIn, signOut, checkSession}
}


/*
const signIn=async (data) => {

    window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'login'}).then(async(token)=> {
        const response = await dispatch(Actions.User.signIn({
            data: data,
            token:token
        }))*/
