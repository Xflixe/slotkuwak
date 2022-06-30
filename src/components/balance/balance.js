import React, {useEffect, useState} from 'react';

import {useUser} from "../../core/hooks/useUser";
import {UseEvent} from "../../core/hooks/useEvent";
import {
    reload,
    viewOff,
    viewOn,
} from '../../assets/img/icons/icons';
import {Link, Redirect, useParams} from "react-router-dom";
import {Actions, useTranslation} from "../../core";


const Balance = ({route}) =>{
    const {t,i18n} = useTranslation()
    const {User,signOut,checkSession} = useUser();
    const params = useParams();
    const [showBalance,setShowBalance] = useState(false);
    const ev = UseEvent();
    const {lang} = useParams();

    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        phone:'',
        lastName:'',
        username:'',
        currency: "",
        city:'',
        answer:'',
        country:"",
        hasUserRequestedVerify:null,
        verifyStatus:null,
        question: {id:0, value:'empty'}
    });
    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){
                setInfoData(response.data.data);
            }
        })
    }

    useEffect(()=>{
        getInfo()
    },[params])

    const checkStatus=()=>{
        if(infoData.verifyStatus === null) {return}
        if(infoData?.verifyStatus !== 0){
            if(infoData?.hasUserRequestedVerify === true && infoData?.verifyRequest?.result === -1){
                return <span style={{color:'#ffbc00'}}>{ t("Pending")}</span>
            }else if(infoData?.hasUserRequestedVerify === true && infoData?.verifyRequest?.result === 0){
                return <span style={{color:'#f13232'}}>{ t("Rejected")}</span>
            }else if(infoData?.hasUserRequestedVerify === true && infoData?.verifyRequest?.result === 3){
                return <span style={{color:'#ffbc00'}}>{ t("Terminate")}</span>
            }else{
                return <span style={{color:'#f13232'}}>{ t("Not Verified")}</span>
            }
        }else {
            return <span style={{color:'#51a600'}}>Verified</span>
        }
    }

    return (
        <>
            <div className="col-12 d-flex justify-content-between" style={{padding:'0 10px'}}>
                <div className="d-flex flex-column flex-md-row align-items-md-center">
                    <span className="user-fullname">{User.data.username}</span>
                    <span className="user-id">({User.data.id})</span>
                </div>
                <a className="user-logout d-flex align-items-center" onClick={()=>{
                    signOut(()=>{
                        try {
                            localStorage.clear()
                        }finally {
                            window.location.href="/"
                        }
                    });
                }}>
                    <svg id="noun_Log_Out_639972" data-name="noun_Log Out_639972" xmlns="http://www.w3.org/2000/svg" width="17.245" height="13.796" viewBox="0 0 17.245 13.796">
                        <path id="Path_211" data-name="Path 211" d="M132.9,58.136a1.007,1.007,0,0,0-.467-.235.71.71,0,0,0-.87.757c-.008.886,0,1.768,0,2.655,0,.1-.009.219-.016.318h-.386c-1.544,0-3.088.006-4.632.007-.737,0-.994.236-.994.9v3.69c0,.665.256.89.992.89,1.544,0,3.088-.006,4.632-.006h.415v.365q0,1.317-.006,2.634a.705.705,0,0,0,.482.732.821.821,0,0,0,.879-.222l6.247-5.688a.654.654,0,0,0,0-1.093Q136.039,60.981,132.9,58.136Z" transform="translate(-122.22 -57.49)"/>
                        <path id="Path_212" data-name="Path 212" d="M6.93,59.336H3.547a1.83,1.83,0,0,1-2.055-1.88q-.006-3.639,0-7.278A1.832,1.832,0,0,1,3.552,48.3c1.036,0,2.073,0,3.109,0,.851,0,.9-.051.865-.841-.021-.452-.113-.535-.6-.536-1.128,0-2.256,0-3.383,0a5.626,5.626,0,0,0-.848.062,3.2,3.2,0,0,0-2.7,3.09c.021,1.245,0,2.487,0,3.741H0c0,1.286-.028,2.618.007,3.927A3.144,3.144,0,0,0,3.134,60.69c1.166.052,2.336.021,3.5.024.876,0,.928-.049.89-.854C7.506,59.392,7.446,59.337,6.93,59.336Z" transform="translate(0.012 -46.924)"/>
                    </svg>
                    <span>{t("Log Out")}</span>
                </a>
            </div>
            <div className="mob-balance-btn">
                {/*<div onClick={()=>{User.isLogged? ev.emit('withdrawModal', true):( <Redirect to={`/${lang}/main`}/>)}} className="btn-with withdraw-link">{t("withdraw")}</div>*/}
                <div onClick={()=>{

                    checkSession().then(response=>{
                        console.log(response)
                        if(response.status){

                            if(response?.data?.data?.verifyStatus===0){
                                ev.emit('withdrawModal', true)
                            }else{
                                ev.emit('notify', {
                                    show:true,
                                    text:'Oops, Unfortunately you can not withdraw money. Please verify your profile first.',
                                    type:'error',
                                    title:'Withdraw',
                                    button:{
                                        name:'Verify Account',
                                        url: `/${i18n.language}/account/verification`
                                    }
                                })
                            }
                        }
                    })
                }} className="btn-with withdraw-link">{t("withdraw")}</div>
                <div onClick={()=>{User.isLogged? ev.emit('depositModal', true):( <Redirect to={`/${lang}/main`}/>)}} className="btn-with deposit-link">{t("deposit")}</div>
            </div>
            {/*<div className="col-12">
                <div
                    className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between account-billing-info"
                >
                    <div className="d-flex align-items-center justify-content-between px-1 px-lg-0">
                        <div className="d-flex d-lg-none flex-column balance-item mob">
                            <span>{t("Balance")}</span>
                            <div className={`sum ${showBalance?'':'blur-text'}`}>100000.00 <span className={`${showBalance?'':'blur-text'}`}>{t(User.data.currency)}</span></div>
                        </div>
                        <div className="d-flex align-items-center">
                            <button className="btn-for-icon" onClick={()=>setShowBalance(!showBalance)}>
                                <img src={showBalance? viewOn:viewOff} alt=""/>
                            </button>
                            <button className="btn-for-icon reload-balance">
                                <img src={reload} alt=""/>
                            </button>
                        </div>
                    </div>
                    <hr className="balance-double"/>
                    <div className="row mx-0 w-100 balance-info">
                        <div className="col-12 col-lg-4 d-none d-lg-flex">
                            <div className="d-flex flex-column balance-item">
                                <span>{t("Balance")}</span>
                                <div  className={`sum ${showBalance?'':'blur-text'}`}>{showBalance? (User.data.accounts.main.amount/100).toFixed(2) :"0000000"} <span className={`${showBalance?'':'blur-text'}`}>{t(User.data.accounts.main.currency.iso3)}</span></div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-4">
                            <div className="d-flex flex-column balance-item">
                                <span>{t("Pending Bets")}</span>
                                <div  className={`sum ${showBalance?'':'blur-text'}`}>${showBalance?"0.00 ":"0000000"} <span className={`${showBalance?'':'blur-text'}`}>{t("USD")}</span></div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-4">
                            <div className="d-flex flex-column balance-item">
                                <span className="text-nowrap">{t("Pending Withdrawals")}</span>
                                <div  className={`sum ${showBalance?'':'blur-text'}`}>${showBalance?"100000.00 ":"0000000"} <span className={`${showBalance?'':'blur-text'}`}>{t("USD")}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="row mob-balance-btn">
                        <div className="col-12">
                            <Link to={`/${params.lang}/account/finances?to=deposit`}><button className="btn-dep">{t("Deposit")}</button></Link>
                        </div>

                        <div className="col-12">
                            <Link to={`/${params.lang}/account/finances?to=withdraw`}><button className="btn-with">{t("Withdraw")}</button></Link>
                        </div>

                    </div>

                </div>
            </div>*/}
            <div className="col-12">
                <ul
                    className="row account-tabs d-flex flex-column flex-md-row list-unstyled"
                >
                    <li className="col nav-item" role="presentation">
                        <Link to={`/${params.lang}/account/info`} className="d-flex align-items-center justify-content-between nav-link">
                            <span>{t("Personal Data")}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path id="add" d="M14.571,6.571H9.714a.286.286,0,0,1-.286-.286V1.429a1.429,1.429,0,0,0-2.857,0V6.286a.286.286,0,0,1-.286.286H1.429a1.429,1.429,0,0,0,0,2.857H6.286a.286.286,0,0,1,.286.286v4.857a1.429,1.429,0,1,0,2.857,0V9.714a.286.286,0,0,1,.286-.286h4.857a1.429,1.429,0,1,0,0-2.857Zm0,0"/></svg>
                        </Link>
                    </li>
                    <li className="col nav-item" role="presentation">
                        <Link to={`/${params.lang}/account/verification`} className="d-flex align-items-center justify-content-between nav-link">
                            <span>{t("Account Verification")}</span>
                            {
                                <div className="verify_status">
                                    { checkStatus()}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path id="add" d="M14.571,6.571H9.714a.286.286,0,0,1-.286-.286V1.429a1.429,1.429,0,0,0-2.857,0V6.286a.286.286,0,0,1-.286.286H1.429a1.429,1.429,0,0,0,0,2.857H6.286a.286.286,0,0,1,.286.286v4.857a1.429,1.429,0,1,0,2.857,0V9.714a.286.286,0,0,1,.286-.286h4.857a1.429,1.429,0,1,0,0-2.857Zm0,0"/></svg>
                                </div>
                            }
                        </Link>
                    </li>
                    <li className="col nav-item" role="presentation">
                        <Link to={`/${params.lang}/account/transactions`} className="d-flex align-items-center justify-content-between nav-link">
                            <span>{t("Transactions")}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path id="add" d="M14.571,6.571H9.714a.286.286,0,0,1-.286-.286V1.429a1.429,1.429,0,0,0-2.857,0V6.286a.286.286,0,0,1-.286.286H1.429a1.429,1.429,0,0,0,0,2.857H6.286a.286.286,0,0,1,.286.286v4.857a1.429,1.429,0,1,0,2.857,0V9.714a.286.286,0,0,1,.286-.286h4.857a1.429,1.429,0,1,0,0-2.857Zm0,0"/></svg>
                        </Link>
                    </li>
                    {/*{
                        (route !=="info" && route !==undefined) && <li className="col nav-item" role="presentation">
                            <Link
                                to={`/${params.lang}/account/info`}
                                className="d-flex align-items-center justify-content-between nav-link"
                            >
                                <span>{t("Personal Data")}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        id="add"
                                        d="M14.571,6.571H9.714a.286.286,0,0,1-.286-.286V1.429a1.429,1.429,0,0,0-2.857,0V6.286a.286.286,0,0,1-.286.286H1.429a1.429,1.429,0,0,0,0,2.857H6.286a.286.286,0,0,1,.286.286v4.857a1.429,1.429,0,1,0,2.857,0V9.714a.286.286,0,0,1,.286-.286h4.857a1.429,1.429,0,1,0,0-2.857Zm0,0"
                                    />
                                </svg>
                            </Link>
                        </li>
                    }
                    {
                       route !=="verification" && infoData?.verifyStatus !== 0 && infoData?.hasUserRequestedVerify !== true  && <li className="col nav-item" role="presentation">
                            <Link
                                to={`/${params.lang}/account/verification`}
                                className="d-flex align-items-center justify-content-between nav-link"
                            >
                                <span>{t("Account Verification")}</span>
                                {

                                    infoData?.verifyStatus && (
                                        <div className="verify_status">

                                            {infoData?.verifyStatus === 0 ? infoData?.hasUserRequestedVerify? <span className={"unverified"}>{ t("Not Verified")}</span>:<span className={"unverified"}>{ t("Not Verified")}</span>:infoData?.hasUserRequestedVerify? <span className={"unverified"}>{ t("Not Verified")}</span>:<span className={"verified"}>{t("Verified")}</span>}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                            >
                                                <path id="add" d="M14.571,6.571H9.714a.286.286,0,0,1-.286-.286V1.429a1.429,1.429,0,0,0-2.857,0V6.286a.286.286,0,0,1-.286.286H1.429a1.429,1.429,0,0,0,0,2.857H6.286a.286.286,0,0,1,.286.286v4.857a1.429,1.429,0,1,0,2.857,0V9.714a.286.286,0,0,1,.286-.286h4.857a1.429,1.429,0,1,0,0-2.857Zm0,0"/>
                                            </svg>
                                        </div>
                                    )
                                }


                            </Link>
                        </li>
                    }
                    {
                        route !=="finances" &&  <li className="col nav-item" role="presentation">
                            <Link
                                to={`/${params.lang}/account/finances`}
                                className="d-flex align-items-center justify-content-between nav-link"
                            >
                                <span>{t("Finances")}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        id="add"
                                        d="M14.571,6.571H9.714a.286.286,0,0,1-.286-.286V1.429a1.429,1.429,0,0,0-2.857,0V6.286a.286.286,0,0,1-.286.286H1.429a1.429,1.429,0,0,0,0,2.857H6.286a.286.286,0,0,1,.286.286v4.857a1.429,1.429,0,1,0,2.857,0V9.714a.286.286,0,0,1,.286-.286h4.857a1.429,1.429,0,1,0,0-2.857Zm0,0"
                                    />
                                </svg>
                            </Link>
                        </li>
                    }*/}

                </ul>
            </div>
        </>
    )
}
export default Balance;
