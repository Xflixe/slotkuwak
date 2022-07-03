import React, {useEffect, useState} from 'react';
import {useNavigation} from "../../../core/hooks/useNavigation";

import {Balance, Footer, Guest, Header, SvgDot} from "../../../components";
import "../../../assets/styles/_select2.scss"
import {useTranslation} from "../../../core";
import './passRecover.scss';
import {useParams} from "react-router-dom";

const RecoverPassword = () =>{
    const {t} = useTranslation()
    const nav  = useNavigation();
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
    //const [hash,setHash] = useState(null);
    const [prLoader,setPrLoader] = useState(false);
    const {hash} = useParams();

    useEffect(()=>{
        console.log(hash)
    },[nav])

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

    const resetPassword=()=>{

    }

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

                    <div className="col-12">
                        <br/>
                        <button type="submit" className="btn-primary" style={{position:'relative',overflow:'hidden'}} onClick={()=>{
                            resetPassword();
                        }}>
                            {prLoader && <SvgDot contentStyle={{background:'#ffcb39'}}/> }
                            {t("Reset Password")}
                        </button>
                    </div>
                </div>

            </main>

            <Footer/>

        </>
    )
}

export default RecoverPassword
