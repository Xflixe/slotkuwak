import React, {useEffect,useState} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    promo1,
    promo2,
    promo3,
    promo4,
    promo5,
    promoCardCover,
    sl2, w2
} from '../../assets/img/images';
import {Footer, Header, NewSWP, Swp} from "../../components";
import PromoCard from "../../components/promo/promoCard";
import {useTranslation} from "../../core";
import {useParams} from "react-router-dom";
import {UseEvent} from "../../core/hooks/useEvent";
import {useUser} from "../../core/hooks/useUser"
import './promo.scss'


const PromoScreen = () =>{
    const {User} = useUser()
    const {t} = useTranslation()
    const nav = useNavigation();
    const {page} =useParams()
    const ev = UseEvent()
    const [frameHeight, setFrameHeight] = useState('100px');
    const [header, setHeader] = useState(true);
    const [footer, setFooter] = useState(true);
    const {i18n} = useTranslation()
    const {lang} = useParams()
    const [filter,setFilter] = useState('all')
    const promoData =  [
        {icon:promo1},
        {icon:promo2},
        {icon:promo3},
        {icon:promo4},
        {icon:promo5}
    ]




    return (
        <>
            {
                header? <Header page={"promo"}/>:''
            }

            <div className="container">
                <div className="action_row">
                    <div className="filter">
                        <button onClick={()=>setFilter('all')} className={`${filter === 'all'?'active':''}`}>All</button>
                        <button onClick={()=>setFilter('casino')} className={`${filter === 'casino'?'active':''}`}>Casino</button>
                        <button onClick={()=>setFilter('sport')} className={`${filter === 'sport'?'active':''}`}>Sports</button>
                    </div>
                </div>

                <div className="row">
                    <PromoCard data={promoData}/>
                </div>
            </div>

            {
                footer? <Footer style={{marginTop:0}}/>:''
            }

        </>
    )
}

export default PromoScreen
