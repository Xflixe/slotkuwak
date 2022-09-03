import React, {useEffect, useRef, useState} from 'react';

import './userDropdown.scss';
import {Actions, useTranslation} from "../../core";
import {useUser} from "../../core/hooks/useUser";
import {Link, useParams} from "react-router-dom";
import {useOutsideRef2} from "../../core/hooks/useOutSideClickRef2";
import moment from "moment";




const UserDropDawn = ({onClose,className,onUserStatus})=>{
    const {t,i18n} = useTranslation();
    const {User,checkSession,signOut} = useUser();
    const {lang} = useParams();
    const ref2 = useRef(null);
    const [userVerification,setUserVerification]=useState(1);

    const [wager, setWager] = useState(null);
    const [freeSpin, setFreeSpin] = useState(null);
    const [tab, setTab] = useState(99);

    const getLendingInfo = ()=>{
        Actions.User.getLendingInfo().then(response=>{
            if(response.status){
                setWager(response.data.data)
            }
        })
    }

    const getFreeSpin = ()=>{
        Actions.User.getFreeSpin().then(response=>{
            if(response.status){
                setFreeSpin(response.data)
            }
        })
    }

    useOutsideRef2(ref2,"account-dropdown-link");

    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){
                let dat = response?.data?.data;
                if(dat?.verifyStatus !== 0){
                    if(dat?.hasUserRequestedVerify === true && dat?.verifyRequest?.result === -1){
                        // Pending
                        setUserVerification(2)
                    }else if(dat?.hasUserRequestedVerify === true && dat?.verifyRequest?.result === 0){
                        // Rejected
                        setUserVerification(1)
                    }else if(dat?.hasUserRequestedVerify === true && dat?.verifyRequest?.result === 3){
                        // Terminate
                        setUserVerification(2)
                    }else{
                        // not verify
                        setUserVerification(1)
                    }
                }else {
                    // verify
                    setUserVerification(0)
                }
            }
        })
    }

    useEffect(()=>{
        getInfo()
        getLendingInfo()
        getFreeSpin()
    },[])

    useEffect(()=>{
        freeSpin?.count > 0 ? onUserStatus(true) : onUserStatus(false)
        if(wager?.bonusClaimable && freeSpin?.count > 0){
            setTab(1);
        }
    },[wager,freeSpin])

    const getGmtTime=(v)=> {
        let d = v;
        let testDateUtc = moment.utc(d);
        let localDate = testDateUtc.local();
        let newDate = localDate.format('YYYY-MM-DD HH:mm');

        return  newDate
    }

    return <>

        <div className={`user-dropdown`} ref={ref2}>
            <div className="user-info">
                <h6>{User?.data?.username}</h6>
                <span>({User?.data?.id})</span>
            </div>
            <div className="money-info">
                <div className="d-col">
                    <p>{t("Balance")}</p>
                    <span>{User?.data?.accounts?.main?.currency?.iso3} {User?.data?.accounts?.main?.amount.toFixed(2)}</span>
                </div>

                {
                    wager?.bonusAmount && wager?.bonusAmount > 0 && (
                        <div className="d-col wager">
                            <p>{t("Bonus Money")}</p>
                            <span>{wager?.item?.currency} {wager?.bonusAmount.toFixed(2)}</span>
                        </div>
                    )
                }
                {
                    // freeSpin
                    !wager?.bonusAmount && (freeSpin?.count > 0 || freeSpin?.regFps === 1) && <div className="d-col freeSpin" style={{borderBottom:'none',borderLeft:'1px solid #242d40',padding:0, paddingLeft: '20px'}}>
                        <div className="d-col freeSpin-col">
                            <p>{i18n.language === "en" ?'FreeSpin':'Фриспины'}</p>
                            <span>{freeSpin?.count}</span>
                        </div>
                        <a href={`/${i18n.language}/slots/freespin`}>
                            <i />
                        </a>
                    </div>
                }
            </div>
            {
                // freeSpin
                wager?.bonusAmount && (freeSpin?.count > 0 || freeSpin?.regFps === 1) && <div className="d-col freeSpin">
                    <div className="d-col freeSpin-col">
                        <p>{i18n.language === "en" ?'FreeSpin':'Фриспины'}</p>
                        <span>{freeSpin?.count}</span>
                    </div>
                    <a href={`/${i18n.language}/slots/freespin`}>
                        <i />
                    </a>
                </div>
            }

            {
                tab !== 99 && <ul className="tabs">
                    <li className={`${tab===1?'active':''}`} onClick={()=>setTab(1)}>{i18n.language === "en" ?'FreeSpin':'Фриспины'}</li>
                    <li className={`${tab===2?'active':''}`} onClick={()=>setTab(2)}>{i18n.language === "en" ?'Deposit Bonus':'Депозитный бонус'}</li>
                </ul>
            }


            {
                // freeSpin
                (tab === 1 || tab === 99) && (freeSpin?.count > 0 || freeSpin?.regFps === 1) && (<div className="freeSpin_content">
                        <h5>{i18n.language === "en" ?'FreeSpin':'Фриспины'}</h5>
                        {
                            freeSpin?.promoFps === 1 && <p>{t('Have fun and enjoy great wins with your free spins')}</p>
                        }
                        {
                            freeSpin?.regFps === 1 && (
                                <>
                                <p>{t('In order to receive Free spins daily, during 6 days, you should login at least once a day')}</p>
                                <div className="fs_but">
                                    <div className="title">{i18n.language === "en" ?'Next FreeSpin':'Следующий Фриспин'}</div>
                                    <div className="time"><span>{getGmtTime(freeSpin?.nextFps)}</span></div>
                                </div>
                                </>
                            )
                        }
                    </div>
                )

            }

            {
                (wager?.item || wager?.bonusClaimable) &&  (tab === 2 || tab === 99) && (
                    <div className="lending-box">
                        <div className="lending-box-title">
                            <h6>{t("Welcome Bonus")}</h6>
                            {wager?.item && <Link to={`/${i18n.language}/promotions`}>{t("See Rules")}</Link>}
                        </div>
                        <p>{wager?.item?t('Bonus money must be wagered 35x before it can be converted into real money'):t('Claim €950 welcome bonus in 2 easy deposit bonuses. To redeem your offer - just follow these steps.')}</p>
                        {wager?.bonusClaimable && !wager?.item && <Link className="lending-button" to={`/${i18n.language}/promotions`}>{t("Claim Bonus")}</Link>}

                        {
                            wager?.item && (
                                <>
                                <div className="lending-box-title">
                                    {wager?.item?.['wagerType'] === "FIRST-DEPOSIT"? <h6>{t("1st deposit bonus")}</h6>:<h6>{t("2nd Deposit")}</h6>}
                                </div>
                                <div className="progress-box">
                                    <div className="progress-line" >
                                        <div className="progress-fill" style={{width:`${wager?.item?.progress.toFixed(2)}%`}}/>
                                    </div>
                                    <div className="progress-info">
                                        <h6>{wager?.item?.progress.toFixed(2)}%</h6>
                                        <span>{`${wager?.item?.currency} ${wager?.item?.progressAmount.toFixed(2)} out of ${wager?.item?.currency} ${wager?.item?.fullAmount.toFixed(2)} wagered`}</span>
                                    </div>
                                </div>
                                </>
                            )
                        }

                    </div>
                )
            }


            <div className="user-links">
                <Link  to={`/${i18n.language}/account/info`} className="link">{t("Personal Data")}</Link>
                <Link  to={`/${i18n.language}/account/transactions`} className="link">{t("Transactions")}</Link>
                <Link  to={`/${i18n.language}/sport?betHistory`} className="link">{t("Bet History")}</Link>
                <Link  to={`/${i18n.language}/account/verification`} className="link">{t("Account Verification")} <i data-status={userVerification}/></Link>
            </div>
            <div className="log-out">
                <a className="user-logout" onClick={()=>{
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
        </div>

    </>
}
export default UserDropDawn;
