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


const PromotionScreen = () =>{
    const ev = UseEvent();
    return (
        <>
            <Header page={"promo"}/>

            <main className="main" style={{minHeight:'300px'}}>

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
                                <div className="sec-btn" onClick={()=>ev.emit('signUp',true)}>claim your bonus</div>
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
                                        Get +100% up to 500EUR on your 1st deposit
                                    </h1>
                                    <p><br/><br/>
                                        <ul className="rules-list">
                                            <li>Players are eligible to receive a 150% deposit bonus on the 2nd deposit,
                                                worth up to 0.0096
                                                BTC/300 USD each, or the equivalent in other cryptocurrencies.
                                            </li>
                                            <li>The bonus is credited automatically after the qualifying deposit.</li>
                                            <li>The minimum amount that can be deposited in order to claim a deposit
                                                bonus is 0.0016 BTC(or
                                                equivalent in other cryptocurrencies)/50 USD (or equivalent in other
                                                fiat currencies).
                                            </li>
                                            <li>Bonus funds are added to a players’ bonus amount and are subject to
                                                standard terms and
                                                conditions of wagering requirements and bonus terms.
                                            </li>
                                            <li>Bonus funds are added to a players’ bonus amount and are subject to
                                                standard terms and
                                                conditions of wagering requirements and bonus terms.
                                            </li>
                                            <li>Bonus funds must be wagered 30x before it can be converted into real
                                                money and withdrawn.
                                            </li>
                                        </ul>
                                        <span className="read-more">Read More</span>
                                    </p>
                                </div>
                                <div className="rules-item">
                                    <h1 className="rules-title">
                                        <strong>2nd Deposit</strong>
                                        Get +150% up to 300EUR on your 2nd deposit
                                    </h1>
                                    <p><br/><br/>
                                        All new players are eligible to receive a 1st Deposit bonus of PlanetaXbet worth
                                        100% of the first
                                        deposit, up to a maximum bonus of 500USD (or its equivalent in the currency the
                                        deposit was made in)
                                        <br/><br/><br/><br/>
                                        <ul className="rules-list">
                                            <li>Players are eligible to receive a 150% deposit bonus on the 2nd deposit,
                                                worth up to 0.0096
                                                BTC/300 USD each, or the equivalent in other cryptocurrencies.
                                            </li>
                                            <li>The bonus is credited automatically after the qualifying deposit.</li>
                                            <li>The minimum amount that can be deposited in order to claim a deposit
                                                bonus is 0.0016 BTC(or
                                                equivalent in other cryptocurrencies)/50 USD (or equivalent in other
                                                fiat currencies).
                                            </li>
                                            <li>Bonus funds are added to a players’ bonus amount and are subject to
                                                standard terms and
                                                conditions of wagering requirements and bonus terms.
                                            </li>
                                            <li>Bonus funds are added to a players’ bonus amount and are subject to
                                                standard terms and
                                                conditions of wagering requirements and bonus terms.
                                            </li>
                                            <li>Bonus funds must be wagered 30x before it can be converted into real
                                                money and withdrawn.
                                            </li>
                                        </ul>
                                        <span className="read-more">Read More</span>
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

            </main>
            {/*<Footer/>*/}
        </>
    )
}

export default PromotionScreen
