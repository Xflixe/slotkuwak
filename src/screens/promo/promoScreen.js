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

import img_desk_1 from "../../assets/img/slide/slots/desktop/1.jpg";
import img_mob_1 from "../../assets/img/slide/slots/mobile/1.jpg";
import {useParams} from "react-router-dom";

import {UseEvent} from "../../core/hooks/useEvent";
import {useUser} from "../../core/hooks/useUser"


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
    const [url,setUrl] = useState(`/promos/${page}/index_${i18n.language}.html?${Math.random()}`)

    useEffect(()=>{
        if(!window.setHeader){
            window.setHeader = function (param){
                setHeader(param)
            }
        }
        if(!window.setFooter){
            window.setFooter = function (param){
                setFooter(param)
            }
        }
        if(!window.setHeight){
            window.setHeight = function (height){
                setFrameHeight(height)
            }
        }
        if(!window.depositModal){
            window.depositModal = function (){
                User.isLogged? ev.emit('depositModal', true) : ev.emit('signUp',true)
            }
        }


        return ()=>{
            if(window.setHeader){
                delete  window.setHeader
            }
            if(window.setFooter){
                delete  window.setFooter
            }
            if(window.setHeight){
                delete  window.setHeight
            }
            if(window.depositModal){
                delete  window.depositModal
            }
        }
    },[])

    useEffect(()=>{
        setUrl(`/promos/${page}/index_${i18n.language}.html?${Math.random()}`)
        //console.log(lang,i18n.language)
    },[lang,i18n.language])

    const [slideData,setSlideData] = useState(
        window.innerWidth > 767 ? [
            {id:1, icon:img_desk_1 }
        ] : [
            {id:3, icon:img_mob_1 }
        ]
    );



    return (
        <>
            {
                header? <Header page={"promo"}/>:''
            }


            {/*<iframe width="100%" height={frameHeight} src={} />*/}
            <div className={"promotion"}>
                <iframe
                    //ref={ref}
                    scrolling="no"
                    src={url}
                    frameBorder="0"
                    className={"promotion-frame"}
                    width="100%" height="100%"
                    style={{height:frameHeight}}

                />
            </div>
            {/*<div className="container slider-container" style={{margin:'10px auto',borderRadius:'6px'}}>
                <NewSWP data={slideData} />
            </div>
            <main className="main">
                <div className="container wrapper">

                    <ul className="d-flex align-items-center flex-wrap promo-tabs list-unstyled">
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link active"> {t("All")} </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> {t("Casino")} </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> {t("Sports")} </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> {t("Shop")} </a>
                        </li>
                    </ul>
                    <div className="col-12 d-flex align-items-center section-head">
                        <a href="#">
                            <div className="section-heading">{t("all Provider")}</div>
                        </a>
                    </div>

                    <div className="tab-content promo-list" id="myTabContent">
                        <div>
                            <div className="row">
                                <PromoCard count={20} data={[
                                    {id:1,icon:promo1},
                                    {id:1,icon:promo2},
                                    {id:1,icon:promo3},
                                    {id:1,icon:promo4},
                                    {id:1,icon:promo5},
                                    {id:1,icon:promoCardCover}
                                ]} />

                            </div>
                        </div>
                    </div>


                </div>
            </main>*/}

            {
                footer? <Footer style={{marginTop:0}}/>:''
            }



        </>
    )
}

export default PromoScreen
