import React, {useEffect,useState} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    promo1,
    promo2,
    promo3,
    promo4,
    promo5,
    pr1_en,
    pr1_ru,
    fb_en,
    fb_ru,
    express_ru,
    express_en,
    pragmatic_ru,
    pragmatic_en,
} from '../../assets/img/promo/promo';
import {Footer, Header, NewSWP, Swp} from "../../components";
import PromoCard from "../../components/promo/promoCard";
import {useTranslation} from "../../core";
import {useParams} from "react-router-dom";
import {UseEvent} from "../../core/hooks/useEvent";
import {useUser} from "../../core/hooks/useUser"
import './promo.scss'


const PromoScreen = () =>{
    const {User} = useUser()
    const {t,i18n} = useTranslation()
    const nav = useNavigation();
    const {page} =useParams()
    const ev = UseEvent()
    const [frameHeight, setFrameHeight] = useState('100px');
    const [header, setHeader] = useState(true);
    const [footer, setFooter] = useState(true);
    const {lang} = useParams()
    const [filter,setFilter] = useState('all')
    //const [promData,setPromData] = useState()
    const promoData = {
        ru: [
            {
                icon:pr1_ru,
                url:"promotions/welcome_bonus",
                title:"100% БОНУС НА ДЕПОЗИТ.",
                text:"Внеси депозит и получи 100% бонус на депозит!"
            },
            {
                icon:fb_ru,
                url:"promotions/freespin_bonus",
                title:"ВНЕСИТЕ ДЕПОЗИТ И ПОЛУЧИТЕ 2X ФРИСПИНЫ.",
                text:"Внеси первый депозит и получи до 200 фриспинов!"
            },
            {
                icon:express_ru,
                url:"promotions/express_bonus",
                title:"случайные денежные призы или фриспины при любом спине.",
                text:"Попади в лидерборд с самым большим коэффициентом, пойманным за спин."
            },
            {
                icon:pragmatic_ru,
                url:"promotions/pragmatic",
                title:"ЭКСПРЕСС БОНУС В СПОРТЕ.",
                text:"Делай ставки, используй экспресс-бонус и увеличивай свою прибыль."
            }
        ],
        en: [
            {
                icon:pr1_en,
                url:"promotions/welcome_bonus",
                title:"100% DEPOSIT BONUS.",
                text:"Make a deposit and receive a 100% deposit bonus!"
            },
            {
                icon:fb_en,
                url:"promotions/freespin_bonus",
                title:"DEPOSIT AND RECEIVE 2X FREESPINS.",
                text:"Make a first deposit and receive up to 200 Freespins!"
            },
            {
                icon:express_en,
                url:"promotions/express_bonus",
                title:"EXPRESS BONUS IN SPORTS.",
                text:"Make a bet, use the Express bonus and boost your profit."
            },
            {
                icon:pragmatic_en,
                url:"promotions/pragmatic",
                title:"Get cash prizes or freespins on any spin",
                text:"Win unexpected cash prizes every day, and reach the weekly leaderboard"
            }
        ]
    }

    //useEffect(()=> {
    //},[])

    return (
        <>
            {
                header? <Header page={"promo"}/>:''
            }

            <div className="container">
                <br/>
                {/*<div className="action_row">
                    <div className="filter">
                        <button onClick={()=>setFilter('all')} className={`${filter === 'all'?'active':''}`}>All</button>
                        <button onClick={()=>setFilter('casino')} className={`${filter === 'casino'?'active':''}`}>Casino</button>
                        <button onClick={()=>setFilter('sport')} className={`${filter === 'sport'?'active':''}`}>Sports</button>
                    </div>
                </div>*/}

                <div className="row">
                    <PromoCard data={promoData[i18n.language]}/>
                </div>
            </div>

            {
                footer? <Footer style={{marginTop:0}}/>:''
            }

        </>
    )
}

export default PromoScreen
