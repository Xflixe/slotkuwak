import React, {useEffect, useState} from "react";
import _ from 'lodash'
import {Actions, useTranslation} from "../../../core";
import "./signUp.scss"

import {useOTP} from "../../../core/hooks/useOTP";
import PLXModal from "../../modal/PLXModal";

import {NewModal, SvgDot} from "../../index";
import Http from "../../../core/http/http2";
import {UseEvent} from "../../../core/hooks/useEvent";
import {useCookie} from "../../../core/hooks/useCookie";
import {useDispatch} from "react-redux";
import signUpBanner from "../../../assets/img/signupBanner.jpg"
import moment from "moment";

const SignUp =() =>{
    const dispatch = useDispatch()
    const cookie = useCookie()
    const {t,i18n} = useTranslation();
    const otp = useOTP();
    const ev = UseEvent();

    const [signUpLoader,setSignUpLoader]=useState(false);
    const [signUpError,setSignUpError]=useState("")
    const [otpDialog,setOtpDialog]=useState(null)
    const [passPattern,setPassPattern]=useState(0);
    const [passPatternText,setPassPatternText]=useState('');
    const [signUpForm,setSignUpForm]=useState({
        mail:"",
        //firstName:"",
        //lastName:"",
        mobilePrefix:"1",
        mobile:"",
        countryCode:"VGB",
        //currencyCode:840,
        password:"",
        //password2:"",
        username:"",
        dob:""
    })
    const [terms,setTerms]=useState(false)
    const [termsError,setTermsError]=useState(false);
    const [confirmed,setConfirmed]=useState(false);
    const [passType, setPassType] = useState({
        pass1:'password',
        pass2:'password'
    });
    const [primaryContact, setPrimaryContact] = useState({
        phone:false,
        email:true
    });

    const [errors,setErrors]=useState([])

    const [show,setShow] = useState(false);

    useEffect(()=>{
        setSignUpForm({
            mail:"",
            //firstName:"",
            //lastName:"",
            mobilePrefix:"1",
            mobile:"",
            countryCode:"VGB",
            //currencyCode:840,
            password:"",
            //password2:"",
            promoCode:"",
            username:""
        });

        const signUpFormEvent= ev.subscribe("signUp",setShow)
        const otpLoader = ev.subscribe('verifyOtp',setSignUpLoader)

        return ()=>{
            signUpFormEvent.unsubscribe()
            otpLoader.unsubscribe()

        }

        //eventEmitter.on("signUp",setShow);
        //Http.subscribeLoader("registration-loader",setLoader);
        //setLoader(false);
        //return ()=>{eventEmitter.removeListener("recover",e=>setShow(false))}
        //return ()=>{
        //    Http.unsubscribeLoader("registration-loader",setLoader)
        //}

    },[])
    useEffect(()=>{
        setSignUpForm({
            mail:"",
            //firstName:"",
            //lastName:"",
            mobilePrefix:"1",
            mobile:"",
            countryCode:"VGB",
            //currencyCode:840,
            password:"",
            //password2:"",
            username:""
        });
        setTerms(false);
        setErrors([]);
    },[show])

    useEffect(()=>{
        if(!primaryContact.email ){
            setErrors([...errors.filter(v=>v!=='mail')])
        }
        if(!primaryContact.phone ){
            setErrors([...errors.filter(v=>v!=='mobile')])
        }
    },[primaryContact])
    useEffect(()=>{
        //console.log('otpDialog',otpDialog)
        if(otpDialog){
            if(otpDialog==="mail"){
                otp.EMAIL({
                    email:signUpForm.mail,
                    send:"/us/v2/api/reg/otp/get",
                    permitAll:true,
                    save:code=>{
                        if(code){
                            onSignUp({...signUpForm,otp:code});
                        }

                    }
                })
            }
            else{
                //eventEmitter.emit('phone',true);
                otp.PHONE({
                    prefix:signUpForm.mobilePrefix,
                    number:signUpForm.mobile,
                    send:"/us/v2/api/reg/otp/get",
                    permitAll:true,
                    save:code=>{
                        if(code){
                            onSignUp({...signUpForm,otp:code});
                        }
                    }
                })
            }
        }
    },[otpDialog])

    const signIn=async (data) => {

        window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'login'}).then(async(token)=> {
            const response = await dispatch(Actions.User.signIn({
                data: data,
                token:token
            }))
            if (response.status) {
                if(window.location.href.indexOf("playSlot")>-1
                    || window.location.href.indexOf("live")>-1
                    || window.location.href.indexOf("sport")>-1
                ){
                    window.location.reload()
                    return
                }
                setShow(false);

            } else {
                window.top.pushEvent(t('specified username or password is incorrect'),'error');
            }
        })

    }

    const onSignUp=(signUpForm)=>{
        setErrors([])

        //let em = signUpForm.mail.split('@');
        //if(em.indexOf('+') !== -1){
        //    let emPlus = em[0].split('+')[0].replaceAll('.','');
        //    setSignUpForm({...signUpForm,mail:emPlus.join(em[1])})
        //}else{
        //    let dots = em[0].replaceAll('.','');
        //    setSignUpForm({...signUpForm,mail:dots.join(em[1])})
        //}

         window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'register'}).then(async(token)=> {
             let error = _.chain(signUpForm)
                 .map((v,k)=>{
                     /*if(k==="dob"){
                         if(v){
                             let d = moment(new Date(v)).diff(moment(moment(new Date((new Date()).getFullYear()-18, (new Date()).getMonth(),  (new Date()).getDate())).format("MM-DD-YYYY")), 'days')
                             if(d>0){
                                 return {key:k,value:undefined}
                             }
                         }
                     }*/
                     return  {key:k,value:v}
                 })
                 .filter(v=>{
                     if(v.key === 'mobile' || v.key === 'mail'){
                         if(v.key === 'mobile' && primaryContact.phone){
                             return v
                         }
                         if(v.key === 'mail' && primaryContact.email){
                             return v
                         }
                         if(!primaryContact.phone && !primaryContact.email){
                             return v
                         }
                     } else{return v}
                 })
                 .filter(
                     v=>!v.value
                 )
                 .map(v=>v.key).value();


             if(signUpForm.password.trim().length < 6){
                 error=[...error,"password"]
             }
             let errUsername = /^[a-zA-Z0-9_.]+$/.test(signUpForm.username);
             if(!errUsername){
                 window.top.pushEvent(t('Username should contain at least 6 symbols'),'error');
                 return;
             }
             let errPassword1 = signUpForm.password.match(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/);
             let errPassword2 = signUpForm.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/);

             //console.log(errPassword1,errPassword2)
             if(!(errPassword1 || errPassword2)){
                 error=[...error,"password"];
                 //window.top.pushEvent('Passwords must contain: minimum 1 upper case letter [A-Z] and a minimum of 1 numeric character [0-9] and must be at least 6 characters in length','error');
                 return;
             }

             if(error.length>0 || !terms){
                 setTermsError(!terms)
                 setErrors([...error])
                 if(error.length===2 && error[0]==="password"){
                     //alert("Passwords do not match")
                     //alert(t("Password should contain at least 6 symbols"));
                     window.top.pushEvent(t('passwords did not match!'),'error');
                 }

             }else{
                 if(!confirmed){
                     if(!primaryContact.phone && !primaryContact.email){
                         //alert('Chose Transactions Method');
                         window.top.pushEvent(t('Choose Transactions Method'),'error');

                         return;
                     }
                 }
                 localStorage.removeItem("GRD_access_token")
                 let data = {...signUpForm,token:token}
                 if(cookie.getCookie("cxd")){
                     data = {...data,cxd:cookie.getCookie("cxd")}
                 }
                 Actions.User.signUp({data:data,loader:"verifyOtp"}).then(response=>{
                     // data:loginForm,loader:setSignInLoader
                     setOtpDialog(null);
                     if(response.status){
                         //document.getElementById("close-sign-up").click();
                         //document.getElementById("signIn-btn").click();
                         //alert("Registration completed successfully")

                         window.top.pushEvent(t('Registration completed successfully'),'success');
                         otp.CLOSE();
                         ev.emit('signUp',false);

                         //if (response?.data?.data?.promotions?.promoCode && response?.data?.data?.promotions?.promoCode?.data?.resultCode > 0){
                         //    ev.emit('notify',{
                         //        show:true,
                         //        text:'Error has been occurred while promo code being activated. You can try activate your promo code again in your profile page.<br/><span style="color:red">'+response?.data?.data?.promotions?.promoCode?.data?.message+'</span>',
                         //        type:'error'
                         //    });
                         //}

                         // პრომო კოდის გააქტიურების შეცდომა
                         if(response?.data?.data?.promotions?.promoCode?.data &&
                             response?.data?.data?.promotions?.promoCode?.data?.resultCode === 417 &&
                             response?.data?.data?.promotions?.promoCode?.data?.message.indexOf('ORA-20343') !== -1
                         ){
                             ev.emit('notify', {
                                 show:true,
                                 text: t('Promo code is already used!'),
                                 type:'error',
                                 title:t('Promo Code')
                             })
                         }

                         if (response?.data?.data?.promotions?.NO_DEPOSIT_BONUS){
                             ev.emit('welcomeBonus',{
                                 ...response?.data?.data?.promotions,
                                 ...data,
                                 showHide:true
                             });
                         }else{
                             signIn({username:data.username,password:data.password})

                             if(window.top.location.href.indexOf('landing') !== -1){
                                 window.top.location.href = `https://www.planetaxbet.com/${i18n.language}/main`
                             }
                         }
                         //ev.emit('signIn',true);
                         //console.log('response',response)

                     }else{
                         if(response?.error?.data){
                             let key = _.keys(response?.error?.data)[0];
                             let val = response?.error?.data[key];
                             //console.log(key,val)
                             if(key==="otp"){
                                 if(['mail',"mobile"].indexOf(val)>-1){
                                     setOtpDialog(val)
                                 }else{
                                     window.top.pushEvent(t('Incorect SMS Code Please Check Sending SMS'),'error');
                                 }
                             }
                             else if(key === 'email' && val === 'email_blocked'){
                                 ev.emit('notify', {
                                     show:true,
                                     text: `${t('please choose another mail domain')} "@${data.mail.split('@')[1]}" is in block list.`,
                                     type:'error',
                                     title:t('Sign Up Error')
                                 })
                             }else if(key === 'ip' && val === 'ip_blocked'){
                                 ev.emit('notify', {
                                     show:true,
                                     text: t('from this ip address registration is suspended.'),
                                     type:'error',
                                     title:t('Sign Up Error')
                                 })
                             }else{
                                 window.top.pushEvent(t(val),'error');
                                 if(errors.indexOf(key)===-1){
                                     setErrors([...errors,key])
                                 }
                             }

                         }
                         //setSignUpError(response?.error?.message);

                     }
                 }).catch(reason => {})
                 /*if(!confirmed){
                     if(!primaryContact.phone && !primaryContact.email){
                         alert('Chose Transactions Method');
                     }else{
                         if(primaryContact.phone){
                             document.getElementById('btn-confirm-phone').click();
                             return
                         }
                         if(primaryContact.email){
                             document.getElementById('btn-confirm-email').click();
                         }
                     }
                 }else{

                 }*/

             }
         }).catch(ex=>{ })

    }
    const togglePassType=(pass)=>{
        if(pass === 'pass1'){
            setPassType(passType.pass1 === 'text'?{...passType,pass1:'password'}:{...passType,pass1:'text'})
        }else{
            setPassType(passType.pass2 === 'text'?{...passType,pass2:'password'}:{...passType,pass2:'text'})
        }

    }
    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }

    const checkPassPattern=(ps='')=> {
        if(ps.trim().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/)){
            setPassPattern(3);
            setPassPatternText(t('Strong'));
        }else if(ps.trim().match(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/)){
            setPassPattern(2);
            setPassPatternText(t('Medium'));
        }else {
            setPassPattern(1);
            setPassPatternText(t('Weak'));
        }
        if(ps === ''){
            setPassPattern(0);
            setPassPatternText('');
        }
    }

    return show && (
        <NewModal title={t("Sign Up")} onClose={()=>setShow(false)} dialogStyle={{width:'350px'}} contentStyle={{width:'350px'}}
                  parentIdName="with-form"
                  banner={{
                      width:'300px',
                      url:signUpBanner,
                      mobUrl:signUpBanner
                  }}
        >
            <form style={{marginTop:'20px'}} onSubmit={(event)=>{
                event.preventDefault();

                onSignUp(signUpForm);
            }} className="signUp-form">
                <div className="row">
                    {/*<div className="col-12 col-md-6">
                                <div className={`input-label ${error("firstName")}`}>
                                    <input type="text" name="firstName" id="name"
                                           value={signUpForm.firstName}
                                           onChange={event => setSignUpForm({...signUpForm,firstName:event.target.value})}
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className={`input-label ${error("lastName")}`}>
                                    <input type="text" name="lastName" id="surname"
                                           value={signUpForm.lastName}
                                           onChange={event => setSignUpForm({...signUpForm,lastName:event.target.value})}
                                    />
                                    <label htmlFor="surname">Surname</label>
                                </div>
                            </div>*/}
                    <div className="col-12">
                        <div className={`input-label ${error("username")}`}>
                            <input type="text" name="username" id="surname"
                                   value={signUpForm.username}
                                   onChange={event => setSignUpForm({...signUpForm,username:event.target.value})}
                            />
                            <label htmlFor="surname">{t("Username")}</label>
                        </div>
                    </div>
                    {/*<div className="col-12 col-md-6">

                        <div className="select-label" style={{width:"100%"}}>
                            <select className="select2" placeholder="Country"
                                    value={signUpForm.countryCode}
                                    onChange={event => setSignUpForm({...signUpForm,countryCode:event.target.value})}
                            >
                                {
                                    _.map(CountryList, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                }
                            </select>
                            <label htmlFor="select">{t("Country")}</label>
                        </div>

                    </div>*/}
                    {/*<div className="col-12 col-md-6" >
                        <label htmlFor="phone-primary">
                            <input type="checkbox" id={'phone-primary'} value={primaryContact.phone} checked={primaryContact.phone} onChange={e =>{
                                setPrimaryContact({...primaryContact,phone:!(e.target.value === "true")});
                            } }/>&nbsp; {t("Phone Transactions")}
                        </label>
                        <div style={{display:"flex"}} className={`${primaryContact.phone?'':'disable-phone'}`}>
                            <div className="input-label" style={{width:"150px"}}>
                                <select className="select2" placeholder="Code"
                                        value={signUpForm.mobilePrefix}
                                        onChange={event => setSignUpForm({...signUpForm,mobilePrefix:event.target.value})}
                                >
                                    {
                                        _.map(MobilePrefixList, (v,k)=><option key={k} value={v.id}>{v.prefix}</option>)
                                    }
                                </select>
                                <label htmlFor="phone">{t("Prefix")}</label>
                            </div>

                            <div className={`input-label ${error("mobile")}`} style={{width:"100%",marginLeft:'10px'}}>
                                <input type="number" name="phone" id="phone"
                                       value={signUpForm.mobile}
                                       onChange={event => setSignUpForm({...signUpForm,mobile:event.target.value})}
                                />
                                <label htmlFor="phone">{t("Phone")}</label>
                            </div>
                        </div>

                    </div>*/}
                    <div className="col-12" >
                        {/*<div className="select-label" style={{width:"150px" }}>
                                    <select className="select2" placeholder="Currency"
                                            value={signUpForm.currencyCode}
                                            onChange={event => setSignUpForm({...signUpForm,currencyCode:event.target.value})}
                                    >
                                        {
                                            _.map(CurrencyList, (v,k)=><option key={k} value={v.id}>{v.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="select">Currency</label>
                                </div>*/}
                        {/*<label htmlFor="email-primary">
                            <input type="checkbox" id={'email-primary'} value={primaryContact.email} checked={primaryContact.email} onChange={e =>{
                                setPrimaryContact({...primaryContact,email:!(e.target.value === "true")});
                            } }/>&nbsp; {t("Email Transactions")}
                        </label>*/}
                        <div style={{display:"flex"}} className={`${primaryContact.email?'':'disable-email'}`}>
                            <div className={`input-label ${error("mail")}`} style={{width:"100%"}}>
                                <input type="email" name="email" id="email"
                                       value={signUpForm.mail}
                                       onChange={event => setSignUpForm({...signUpForm,mail:event.target.value})}
                                />
                                <label htmlFor="email">{t("Email")}</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className={`input-label ${error("dob")}`}>
                            <input onChange={e => setSignUpForm({...signUpForm,dob:e.target.value})} value={signUpForm.dob} type="date" name="dob" id="dob"
                                   max={moment(new Date(),"YYYY-MM-DD").subtract(18,"year").format("YYYY-MM-DD")}
                                   min={moment(new Date(),"YYYY-MM-DD").subtract(90,"year").format("YYYY-MM-DD")}
                            />
                            <label htmlFor="dob">{t("Date of birth")}</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className={`input-label ${error("password")}`}>
                            <input type={passType.pass1}
                                   name="password"
                                   id="password"
                                   value={signUpForm.password}
                                   onChange={event => {
                                       setSignUpForm({...signUpForm,password:event.target.value})
                                       checkPassPattern(event.target.value)
                                   }}
                            />
                            <label htmlFor="password">{t("Password")}</label>
                            <div className={`toggle-password ${passType.pass1==='text'?'active':'hide'}`} onClick={()=>{togglePassType('pass1')}}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <ul className="pass-pattern" data-active={passPattern} data-text={passPatternText}>
                            <li/>
                            <li/>
                            <li/>
                        </ul>
                        {passPattern === 1 && <p style={{color: 'rgb(161 175 181)', lineHeight: '15px', fontSize: '13px', margin: '5px 0',marginBottom: '0'}}>{t("Passwords must contain: at least 8 characters, min. 1 upper case, 1 lower case, 1 numeric symbol.")}</p>}
                    </div>
                    {/*<div className="col-12">
                        <div className={`input-label ${error("password2")}`}>
                            <input
                                type={passType.pass2}
                                name="confirm-password"
                                id="confirmPassword"
                                value={signUpForm.password2}
                                onChange={event => setSignUpForm({...signUpForm,password2:event.target.value})}
                            />
                            <label htmlFor="confirmPassword">{t("Repeat Password")}</label>
                            <div className={`toggle-password ${passType.pass2==='text'?'active':'hide'}`} onClick={()=>{togglePassType('pass2')}}/>
                        </div>
                    </div>*/}

                    <div className="col-12">
                        <p style={{color:'#e6e9f1',marginBottom:0,fontSize:'13px'}}>{t('Got a Promo Code?')}</p>
                        <div className={`input-label`}>
                            <input type="text" name="promoCode" id="promoCode"
                                   value={signUpForm.promoCode}
                                   onChange={event => setSignUpForm({...signUpForm,promoCode:event.target.value})}
                            />
                            <label htmlFor="promoCode">{t("Promo Code")}</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <label htmlFor="terms-and-conditions" className={`terms ${termsError?'error-text':''}`}>
                            <input type="checkbox" id={'terms-and-conditions'} checked={terms} onChange={(_) =>{
                                setTerms(!terms)
                                if(!terms){
                                    setTermsError(false)
                                }
                            } }/>&nbsp;
                            {t("By clicking sign up, you accept our")} <span style={{textDecoration:'underline'}}><a href={`/${i18n.language}/terms`}>{t("Terms & Conditions")}</a></span> {t("and that you are over 18 years old")}
                        </label>
                    </div>

                    <div className={"error-text"}>{t(signUpError)}</div>
                    <div className="col-12">
                        <button type="submit" className="btn-primary" style={{width:'100%',position:'relative',overflow:'hidden'}}>
                            {signUpLoader && <SvgDot contentStyle={{background:'#ffcb39'}}/> }
                            {t("Sign Up")}
                        </button>
                    </div>
                </div>
            </form>
            <p style={{fontSize:"0.75rem", color:"white", textAlign:"center",marginBottom:0}}>
                {t("Already have an account?")}
                <span className={"forgot-password"}  onClick={()=>{
                    ev.emit('signUp',false)
                    ev.emit('signIn',true)
                }}> {t("Sign In")}</span>
            </p>
        </NewModal>
    )




}
export default SignUp;
