import {Actions, Config} from "../../index";
import {PING, SIGN_IN} from "../actionTypes";
import Request from "../../http/http";
import moment from 'moment'
import http from "../../http/http3";
import {query_string} from "../../utils";
import _ from "lodash";

import JWT from "../../models/JWT";
let jwt  = new JWT()
const signIn = ({data,loader,sourceId,code,token2fa,header,token}) =>async (dispatch)=>{
    const response = await http.post({
        url:Config.User.SIGN_IN
        ,data:query_string({
            "username":data.username,
            "password":data.password,
            sourceId:sourceId,
            code:code,
            '2fa-token':token2fa,
            "token":token
        }),
        loader:loader,
        permitAll:true,
        header:header
    });
    if(response.status){
        jwt.setData(response.data)


        setTimeout(()=>{
            dispatch(ping())
        },10)
        dispatch({
            type: SIGN_IN,
            payload: {},
            status:response.status
        })

    }
 return response;
}
const signOut = () => async (dispatch)=>{
  const response = await Request.get(Config.User.SIGN_OUT);
  if(response.status){
    dispatch({
      type: SIGN_IN,
      payload: {},
      status:false
    })
  }else {
  }
}
const ping = () =>async (dispatch)=>{
    return new Promise(resolve => {
        http.get({url:Config.User.PING}).then(response=>{
            window.user = response.status?response.data.data:null
            dispatch({
                type: PING,
                payload: response.status?response.data.data:{},
                status:response.status
            })
            resolve(true)
        }).catch(()=>{
            resolve(true)
        })
    })
}

const checkSession = () =>async (dispatch)=>{
    return new Promise(resolve => {
        http.get({url:Config.User.PING}).then(response=>{

            window.user = response.status?response.data.data:null
            dispatch({
                type: PING,
                payload: response.status?response.data.data:{},
                status:response.status
            })
            resolve(response)
        }).catch(()=>{
            resolve(false)
        })
    })
}

const info = _.memoize((id=1)=>{
    return http.get({url:Config.User.INFO+"?id="+id})
})

const getLendingInfo = _.memoize((id=1)=>{
    return http.get({url:Config.User.LENDINGINFO+"?id=wager"})
})
const getFreeSpin = _.memoize((id=1)=>{
    return http.get({url:Config.User.FREESPPIN+"?id=freespin"})
})
const getVerificationInfo = ()=>{
    return http.get({url:Config.User.VERIFICATIONINFO})
}
const signUp = async ({data,loader}) => {
    let formData =new FormData()
    _.forEach(data, (v,k)=>{
        formData.append(k,v);
    })

    const response = await http.post({url:Config.User.SIGN_UP, data:formData,permitAll:true,loader:loader});
    if (!response.status) {
        //window.pushEvent("Invalid Credentials","error")
       // alert(`An error occurred while registering`)
    }
    return response;
}
const updateInfo = async ({data,loader}) => {
    return await http.post({url:Config.User.UPDATE_INFO,data:query_string(data),loader:loader } )
}
const  resendOtp = ({send,type,prefix,value,additionalParams={},loader,permitAll=false,header=null}) =>{
    //{type}&prefix={prefix}&value={value}
    return http.get({
        url:send.replace("{type}",type).replace("{prefix}",prefix).replace("{value}",value).concat('&',_.map(additionalParams,(v, k)=>{
            return k.concat('=',v)
        }).join('&')),
        loader:loader,
        permitAll:permitAll,
        header:header
    })
}
const  verifyOtp = ({verify,type,prefix,value,otp,additionalParams={},loader,permitAll=false}) =>{
    //{type}&prefix={prefix}&value={value}
    return http.post({
        url:verify.replace("{type}",type).replace("{prefix}",prefix?prefix.toString().replace("+",""):"").replace("{value}",value).replace('{otp}',otp).concat('&',_.map(additionalParams,(v, k)=>{
        return k.concat('=',v)
    }).join('&')),
        loader:loader,
        permitAll:permitAll
    })

}
const  recoverUserName = (data) =>{
    return http.post({
        url:Config.Guest.RECOVER.USERNAME.concat("?",query_string(data)),
        permitAll:true
    })
}
const  recoverPassword = (data) =>{
    return http.post({
        url:Config.Guest.RECOVER.PASSWORD.concat("?",query_string(data)),
        permitAll:true
    })
}
const  checkRecoveryToken = (data) =>{
    return http.post({
        url:Config.Guest.RECOVER.CHECKTOKEN.concat("?",query_string(data)),
        permitAll:true
    })
}
const  sendResetPass = (data) =>{
    return http.post({
        url:Config.Guest.RECOVER.RESETPASSURL.concat("?",query_string(data)),
        permitAll:true
    })
}
const verification=({data,loader})=>{
   return  http.post({
                url:Config.User.VERIFICATION,
                data:{
                   "email":data?.email,
                   "sourceId":data?.sourceId,
                   "firstName":data?.firstName,
                   "lastName":data?.lastName,
                   "mobilePrefix":data?.mobilePrefix,
                   "mobile":data?.mobile,
                   "dob":moment(data?.dob).format("YYYY-MM-DD"),
                   "gender":data?.gender,
                   "passportType":data?.passportType,
                   "docNumber":data?.docNumber,
                   "country": data?.country,
                   "nationality": data?.nationality,
                   "doc_expire_date":moment(data?.doc_expire_date).format("YYYY-MM-DD"),
                   "front":data?.front,
                   "back":data?.back,
                   "otp":data.otp,
                    "requestId":data.requestId
               },
                headers:{  'Content-Type' : 'text/plain' },
                loader:loader
        });
}
const verificationStep1=({data,loader})=>{
    console.log(data)
    return  http.post({
        url:Config.User.VERIFICATIONSTEP1,
        data:{
            "email":data?.email,
            "sourceId":data?.sourceId,
            "firstName":data?.firstName,
            "lastName":data?.lastName,
            "mobilePrefix":data?.mobilePrefix,
            "mobile":data?.mobile,
            "dob":moment(data?.dob).format("YYYY-MM-DD"),
            "gender":data?.gender,
            "passportType":data?.passportType,
            "docNumber":data?.docNumber,
            "nationality": data?.nationality,
            "doc_expire_date":moment(data?.doc_expire_date).format("YYYY-MM-DD"),
            "front":data?.front,
            "back":data?.back,
            "otp":data.otp
        },
        headers:{  'Content-Type' : 'text/plain' },
        loader:loader
    });
}
const verification_email=({data,loader})=>{
   return  http.post({
                url:Config.User.VERIFICATION_EMAIL,
                data:query_string({
                    "sourceId":data?.sourceId,
                    "email":data?.email,
                    "otp":data.otp
               }),
                headers:{  'Content-Type' : 'text/plain' },
                loader:loader
        });
}
const verification_phone=({data,loader})=>{
    return  http.post({
        url:Config.User.VERIFICATION_PHONE,
        data:query_string({
            "sourceId":data?.sourceId,
            "otp":data.otp,
            "mobile":data?.mobile,
            "mobilePrefix":data.mobilePrefix.replace("+","")
        }),
        headers:{  'Content-Type' : 'text/plain' },
        loader:loader
    });
}
const change_password=({data,loader})=>{
    return  http.post({
        url:Config.User.CHANGE_PASSWORD,
        data:query_string({
            "otp":data.otp,
            "sourceId":data?.sourceId,
            "oldPassword":data?.oldPassword,
            "newPassword":data?.newPassword,
            "newPassword2":data?.newPassword2
        }),
        headers:{  'Content-Type' : 'text/plain' },
        loader:loader
    });
}
const withdraw_coinsPaid=({data,loader})=>{
    return  http.post({
        url:Config.User.WITHDRAW_COINSPAID,
        data:query_string({
            "otp":data.otp,
            "sourceId":data?.sourceId,
            "amount":data?.amount,
            "address":data?.address,
            "currency":data?.currency
        }),
        headers:{  'Content-Type' : 'text/plain' },
        loader:loader
    });
}
const getSecurityQuestion =({loader})=>{
   return  http.get({url:Config.User.GET_SECURITY_QUESTIONS,loader:loader})
}
const sendMessage =({loader,data})=>{
    return  http.post({url:Config.User.MessageUrl,loader:loader,data:query_string(data), permitAll:true})
}
const checkSecurityQuestion =({loader})=>{
   return  http.get({url:Config.User.CHECK_SECURITY_QUESTIONS,loader:loader})
}
const saveSecurityQuestions =({loader,data})=>{
    return  http.post({url:Config.User.SAVE_SECURITY_QUESTIONS,loader:loader,data:query_string(data)})
}
const confirmSQOTP =({loader,data})=>{
    return  http.post({url:Config.User.CONFIRM_SECURITY_QUESTIONS_OTP,loader:loader,data:query_string(data)})
}
const save2faAuthentication =({loader,data})=>{
    return  http.post({url:Config.User.SAVE_2FA_AUTHENTICATION,loader:loader,data:query_string(data)})
}
const getCountryList =()=>{
    return  http.get({url:Config.User.GET_COUNTRY_LIST})
}
const getMobileCodeList =()=>{
    return  http.get({url:Config.User.GET_MOBILE_PREFIX_LIST})
}
const getTransactionHistory =({d1,d2})=>{
    return  http.get({url:Config.User.GET_TRANSACTION_HISTORY.replace("{d1}",d1).replace("{d2}",d2)})
}
const getSlotTransactionHistory =({date})=>{
    return  http.get({url:Config.User.GET_SLOT_TRANSACTION_HISTORY.replace("{date}",date)})
}
const checkRestriction = () =>{
    return  http.get({url:Config.User.RESTRICTION, permitAll:true})

}
const claimBonusUrl =({id,type})=>{
    return  http.post({url:Config.User.ClaimBonusUrl.replace("{id}",id).replace("{type}",type),permitAll:true})
}
const messages =()=>{
    return  http.get({url:Config.User.message})
}
const readMessage =({id})=>{
    return  http.post({url:Config.User.readMessage.replace("{id}",id)})
}

export default {
    claimBonusUrl,
    checkRestriction,
    getSecurityQuestion,
    sendMessage,
    checkSecurityQuestion,
    saveSecurityQuestions,
    signIn,
    signOut,
    ping,
    signUp,
    checkRecoveryToken,
    sendResetPass,
    info,
    getLendingInfo,
    getFreeSpin,
    messages,
    readMessage,
    getVerificationInfo,
    updateInfo,
    resendOtp,
    verifyOtp,
    verification,
    verificationStep1,
    recoverUserName,
    recoverPassword,
    verification_email,
    verification_phone,
    change_password,
    withdraw_coinsPaid,
    save2faAuthentication,
    confirmSQOTP,
    getCountryList,
    getMobileCodeList,
    getTransactionHistory,
    getSlotTransactionHistory,
    checkSession
}
