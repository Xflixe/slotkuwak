import React, {useEffect, useMemo, useState} from 'react';

import {Footer, Header, NewSWP, ShowMore, SlotCard, Swp} from "../../components";

import './promotionScreen.scss';
import logo from './img/logo.png';
import prize from './img/prize.png';

import {
    ada,
    bnb,
    btc,
    busd,
    dash,
    eth,
    ltc,
    neo,
    trx,
    usdc,
    usdt} from "../../assets/img/crypro/crypto";
import {discord, gr,
    evolutionGaming,
    relax,
    pragmatic,
    playngo,
    isoftbet,
    kiron,
    wazdan,
} from "../../assets/img/icons/icons";
import {UseEvent} from "../../core/hooks/useEvent";
import {useUser} from "../../core/hooks/useUser";
import {Redirect, useParams} from "react-router-dom";


const PromotionScreen = () =>{
    const ev = UseEvent();
    const {User,checkSession} = useUser();
    const {lang} = useParams()
    return (
        <>
            {
                <Redirect to={`/${lang}/promotions/lending`}/>
            }
            {/*<Header page={"promo"}/>*/}

           {/* <main className="lending" style={{minHeight:'300px'}}>

                    <div className="main-container">
                        <section className="section sec-shadow sec-header">
                                <img className="logo" src={logo} alt="logo"/>
                                <div className="prize">
                                    <img src={prize} alt="prize"/>
                                </div>
                                <h1 className="sec-title">
                                    WELCOME BONUS
                                    <span>in two easy deposit bonuses</span>
                                </h1>
                                <div className="sec-btn" onClick={()=>{
                                    User.isLogged? ev.emit('depositModal', true) : ev.emit('signUp',true)
                                }}>claim your bonus</div>
                                <div className="bt-list">
                                    <p className="list-item with"><span>Instant deposits<br/>and withdrawals</span></p>
                                    <p className="list-item coin"><span>Crypto<br/>Friendly</span></p>
                                    <p className="list-item supp"><span>24/7 Live<br/>Support</span></p>
                                </div>
                        </section>
                        <section className="section sec-content">
                            <h1 className="sec-title">
                                How To Start?
                                <span>Looks like you’re ready to start your adventure with PlanetaXbet! All you need to do is redeem your welcome offer - follow these simple steps</span>
                            </h1>
                            <div className="bt-list2">
                                <p className="list-item reg"><span><strong>Step 1</strong>Sign Up</span></p>
                                <p className="list-item dep"><span><strong>Step 2</strong>Make deposit</span></p>
                                <p className="list-item gift"><span><strong>Step 3</strong>Receive Bonus</span></p>
                            </div>
                        </section>

                        <section className="section sec-shadow sec-rules">
                            <div className="rules-box">
                                <div className="rules-item">
                                    <h1 className="rules-title">
                                        <strong>1st Deposit</strong>
                                        Get +100% up to €500 on your 1st deposit
                                    </h1>
                                    <p><br/><br/>
                                        All new players are eligible to receive a 1st Deposit bonus of PlanetaXbet worth 100% of the first deposit, up to a maximum bonus of €500(or its equivalent in the currency the deposit was made in)
                                        <br/><br/><br/>
                                        <ul className="rules-list">
                                            <li>The minimum amount that can be deposited in order to claim a deposit bonus is 0.0016 BTC(or equivalent in other cryptocurrencies)/€50 (or equivalent in other fiat currencies).</li>
                                            <li>Bonus funds are added to a player’s bonus amount and are subject to standard terms and conditions, wagering requirements and bonus terms.</li>
                                            <li>Once the bonus is activated, it will be valid for 30 days to be wagered.</li>
                                            <li>Main account funds will be used before any bonus funds.</li>
                                            <li>Bonus money must be wagered 35x before it can be converted into real money and withdrawn.</li>
                                            <li>Only bets made using bonus money count towards the wagering requirement. Bonus money will be used only once an original deposit has been used. Playing using practice money will not count towards the wagering requirement.</li>
                                            <li>Players may only claim the welcome bonus once.</li>
                                            <li>Any accounts linked to accounts that have already claimed the welcome bonus will not be eligible to claim the welcome bonus. If PlanetaXbet will suspect two linked accounts that have claimed the welcome bonus, these funds could be confiscated from both accounts.</li>
                                            <li>PlanetaXbet reserves the right to change the terms and conditions, the promotion, or the eligibility of players for a promotion, at any point, and without prior notice.</li>
                                            <li>General bonus terms and conditions apply.</li>
                                        </ul>
                                    </p>
                                </div>
                                <div className="rules-item">
                                    <h1 className="rules-title">
                                        <strong>2nd Deposit</strong>
                                        players are eligible to receive a 150% deposit bonus on the 2nd deposit, worth up to 0.0096 BTC/€300 each, or the equivalent in other cryptocurrencies.
                                    </h1>
                                    <p><br/><br/>
                                        <ul className="rules-list">
                                            <li>The minimum amount that can be deposited in order to claim a deposit bonus is 0.0016 BTC(or equivalent in other cryptocurrencies)/€50 (or equivalent in other fiat currencies).</li>
                                            <li>The bonus is credited automatically after the qualifying deposit.</li>
                                            <li>Bonus funds are added to a players’ bonus amount and are subject to standard terms and conditions of wagering requirements and bonus terms.</li>
                                            <li>Main account funds will be used before any bonus funds.</li>
                                            <li>Bonus funds must be wagered 35x before it can be converted into real money and withdrawn.</li>
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className="section sec-footer">
                            <div className="logo-list">
                                <p><img src={evolutionGaming}/></p>
                                <p><img src={relax}/></p>
                                <p><img src={pragmatic}/></p>
                                <p><img src={playngo}/></p>
                                <p><img src={isoftbet}/></p>
                                <p><img src={kiron}/></p>
                            </div>
                            <div className="logo-list2">
                                <p><img src={ada}/></p>
                                <p><img src={bnb}/></p>
                                <p><img src={btc}/></p>
                                <p><img src={busd}/></p>
                                <p><img src={dash}/></p>
                                <p><img src={eth}/></p>
                                <p><img src={ltc}/></p>
                                <p><img src={neo}/></p>
                                <p><img src={trx}/></p>
                                <p><img src={usdc}/></p>
                                <p><img src={usdt}/></p>
                            </div>
                        </section>
                    </div>

            </main>*/}
            {/*<Footer/>*/}
        </>
    )
}

export default PromotionScreen
