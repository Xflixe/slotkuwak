import React, {useEffect,useState} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    promo1,
    promo2,
    promo3,
    promo4,
    promo5,
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
    const promoData =  {
        ru: [
            {
                icon:promo1,
                title:"Edge Out Eddie $2,500 Jackpot!",
                text:"Beat Eddie's multiplier every single week on a specified game to share in a $2,500 prize pool!"
            }
        ],
        en: [
            {
                icon:promo1,
                title:"Edge Out Eddie $2,500 Jackpot!",
                text:"Beat Eddie's multiplier every single week on a specified game to share in a $2,500 prize pool!"
            }
        ]
    }



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
