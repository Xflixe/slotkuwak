import React, {useEffect, useState} from 'react';
import {useNavigation} from "../../../core/hooks/useNavigation";

import {Balance, Footer, Guest, Header, SvgDot} from "../../../components";
import "../../../assets/styles/_select2.scss"
import {Actions, useTranslation} from "../../../core";
import './passRecover.scss';
import {useParams} from "react-router-dom";
import {UseEvent} from "../../../core/hooks/useEvent";
import {useOTP} from "../../../core/hooks/useOTP";

const RecoverPassword = () =>{
    const {t} = useTranslation()
    const nav  = useNavigation();
    const ev = UseEvent()
    const [errors,setErrors]=useState([]);
    const [passPattern,setPassPattern]=useState(0);
    const [passPatternText,setPassPatternText]=useState('');
    const [passType, setPassType] = useState({
        pass1:'password',
        pass2:'password'
    });
    const [pass,setPass] = useState({
        pass1:'',
        pass2:''
    });

    const [prLoader,setPrLoader] = useState(false);
    const [contentType,setContentType] = useState(false);
    const [checkData,setCheckData] = useState({});
    const {hash} = useParams();
    const otp = useOTP();

    const togglePassType=(pass)=>{
        if(pass === 'pass1'){
            setPassType(passType.pass1 === 'text'?{...passType,pass1:'password'}:{...passType,pass1:'text'})
        }else{
            setPassType(passType.pass2 === 'text'?{...passType,pass2:'password'}:{...passType,pass2:'text'})
        }
    }

    const checkPassPattern=(ps='')=> {
        if(ps.trim().match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/)){
            setPassPattern(3);
            setPassPatternText('Strong');
        }else if(ps.trim().match(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/)){
            setPassPattern(2);
            setPassPatternText('Medium');
        }else {
            setPassPattern(1);
            setPassPatternText('Weak');
        }
        if(ps === ''){
            setPassPattern(0);
            setPassPatternText('');
        }
    }

    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }

    const sendResetPass=(code)=>{

        window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'recoverPassword'}).then(async(token)=> {

            let params = {
                userToken:checkData?.userToken,
                otp:code,
                token:token,
                password:pass.pass1
            }

            Actions.User.sendResetPass(params).then(response=>{

                if(response.status && response?.data?.resultCode === 0){
                    otp.CLOSE();
                    setCheckData({});
                    setPass({
                        pass1:'',
                        pass2:''
                    })
                    setPassPattern(0)
                    setContentType(false)
                    setPassPatternText('')
                    ev.emit('notify', {
                        show:true,
                        text:'Password Successfully Change',
                        type:'success',
                        title:'Recover Password'
                    })
                }else{
                    ev.emit('notify', {
                        show:true,
                        text:'Password recovery request not found or it`s already expired!',
                        type:'success',
                        title:'Recover Password'
                    })
                }
            }).catch(reason => console.log('Recover Password Error'))
        }).catch(ex=>{ console.log(ex)})
    }

    const resetPassword=()=>{
        setErrors([])
        if(passPattern < 2){
            let error=["pass1"]
            setErrors([...error])
            return
        }
        if(checkData?.channel === "email") {
            otp.EMAIL({
                email:checkData?.data,
                send:"/us/v1/api/personal/recover/otp/get",
                additionalParams: {
                    userToken:checkData?.userToken
                },
                permitAll:true,
                save:code=>{
                    if(code){
                        sendResetPass(code)
                    }

                }
            })
        }
        else if(checkData?.channel === "mobile"){
            otp.PHONE({
                prefix:checkData.prefix,
                number:checkData.data,
                send:"/us/v1/api/personal/recover/otp/get",
                additionalParams: {
                    userToken:checkData?.userToken
                },
                permitAll:true,
                save:code=>{
                    if(code){
                        sendResetPass(code)
                    }
                }
            })
        }
        else{
            //თუ ჩეკ დატა არ მოვიდა
        }
    }

    const checkToken=()=>{
        let params = {
            userToken:hash
        }
        Actions.User.checkRecoveryToken(params).then(response=>{
            console.log('response',response)
            if(response.status){
                setContentType(true);
                setCheckData(response?.data?.data);
            }else{
                if(response?.error?.resultCode === 44){
                    ev.emit('notify', {
                        show:true,
                        text:'Password recovery request not found or it`s already expired!',
                        type:'success',
                        title:'Recover Password'
                    })
                }
            }
        }).catch(reason => console.log('111'))
    }


    useEffect(()=>{
        checkToken()
    },[hash])

    return (
        <>
            <Header page={"transaction"}/>

            <main className="password-recover">
                <h1>Reset account password</h1>
                <br/>
                <p>Enter a new password for planetaxbet.com</p>
                <br/>


                <div className="row pr-form">
                    <div className="col-12">
                        <div className={`input-label ${error("pass1")}`}>
                            <input type={passType.pass1} name="username" id="pass1"
                                   value={pass.pass1}
                                   onChange={event => {
                                       setPass({...pass,pass1:event.target.value})
                                       checkPassPattern(event.target.value)
                                   }}
                            />
                            <label htmlFor="pass1">{t("New Password")}</label>
                            <div className={`toggle-password ${passType.pass1==='text'?'active':'hide'}`} onClick={()=>{togglePassType('pass1')}}/>
                        </div>
                    </div>

                    <div className="col-12">
                        <ul className="pass-pattern" data-active={passPattern} data-text={passPatternText}>
                            <li/>
                            <li/>
                            <li/>
                        </ul>
                        {passPattern === 1 && <p style={{color: 'rgb(161 175 181)', lineHeight: '15px', fontSize: '13px', margin: '5px 0',marginBottom: '0'}}>Passwords must contain: at least 8 characters, min. 1 upper case, 1 lower case, 1 numeric symbol.</p>}
                    </div>

                    {/*<div className="col-12">
                        <div className={`input-label ${error("pass2")}`}>
                            <input type="text" name="username" id="pass2"
                                   value={pass.pass2}
                                   onChange={event => setPass({...pass,pass2:event.target.value})}
                            />
                            <label htmlFor="pass2">{t("Confirm Password")}</label>
                        </div>
                    </div>*/}

                    {
                        contentType? <div className="col-12">
                            <br/>
                            <button type="submit" className="btn-primary" style={{position:'relative',overflow:'hidden'}} onClick={()=>{
                                resetPassword()
                            }}>
                                {prLoader && <SvgDot contentStyle={{background:'#ffcb39'}}/> }
                                {t("Reset Password")}
                            </button>
                        </div>:''
                    }

                </div>

            </main>


            <Footer/>

        </>
    )
}

export default RecoverPassword
