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
        </>
    )
}

export default PromotionScreen
