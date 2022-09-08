import React, { useEffect, useRef, useState} from 'react';
import { sl2,w2} from '../../assets/img/images';
import {Carousel, Header, Swp, Footer, Sport,NewSWP,PLAlert} from "../../components";   // Carusel3D
import {Link, useParams} from "react-router-dom";
import {Actions, useTranslation} from "../../core";


import img_desk_wb_en from "../../assets/img/slide/wb_en.png";
import img_desk_wb_ru from "../../assets/img/slide/wb_ru.png";
import desk_casino_en from "../../assets/img/slide/casino/desktop/3en.png";
import desk_casino_ru from "../../assets/img/slide/casino/desktop/3ru.png";
import desk_sl_en from "../../assets/img/slide/slots/desktop/2en.png";
import desk_sl_ru from "../../assets/img/slide/slots/desktop/2ru.png";
import desk_sp_en from "../../assets/img/slide/sport/desktop/2en.png";
import desk_sp_ru from "../../assets/img/slide/sport/desktop/2ru.png";
import banner1web from "../../assets/img/slide/main/w/banner1.png";


import img_mob_wb_ru from "../../assets/img/slide/wb_mob_ru.png";
import img_mob_wb_en from "../../assets/img/slide/wb_mob_en.png";
import mob_casino_en from "../../assets/img/slide/casino/mobile/3en.png";
import mob_casino_ru from "../../assets/img/slide/casino/mobile/3ru.png";
import mob_sl_en from "../../assets/img/slide/slots/mobile/2en.png";
import mob_sl_ru from "../../assets/img/slide/slots/mobile/2ru.png";
import mob_sp_en from "../../assets/img/slide/sport/mobile/2en.png";
import mob_sp_ru from "../../assets/img/slide/sport/mobile/2ru.png";
import banner1mob from "../../assets/img/slide/main/m/banner1.png";
import {useUser} from "../../core/hooks/useUser"
import {UseEvent} from "../../core/hooks/useEvent"



const MainScreen = () =>{
    const {t,i18n} = useTranslation()
    const {lang}=useParams();
    const ev = UseEvent();
    const {User,checkSession} = useUser();
    const ref=useRef();
    const [resize,setResize]=useState(window.innerWidth);
    const [mainPageSlotList,setMainPageSlotList]=useState([]);
    const [mainPageCasinoList,setMainPageCasinoList]=useState([]);

    const slide1Action = () =>{
        checkSession().then(response=>{
            if(response.status){
                ev.emit('depositModal', true)
            }else{
                ev.emit('signUp', {
                    show:true,
                    onSuccess:function (e){
                        console.log("success login",e)
                    }
                })
            }
        })
    }

    const slideData =
        window.innerWidth > 767 ? {
            ru: [
                {id:1, icon:banner1web, method:()=>slide1Action()},
                {id: 5, icon: img_desk_wb_ru, url: `/ru/promotions/welcome_bonus`},
                {id: 3, icon: desk_sl_ru, url: `/ru/slots`},
                {id: 4, icon: desk_sp_ru, url: `/ru/sport`},
                {id: 2, icon: desk_casino_ru, url: `/ru/casino`},
            ],
            en: [
                {id:1, icon:banner1web, method:()=>slide1Action()},
                {id: 5, icon: img_desk_wb_en, url: `/en/promotions/welcome_bonus`},
                {id: 3, icon: desk_sl_en, url: `/en/slots`},
                {id: 4, icon: desk_sp_en, url: `/en/sport`},
                {id: 2, icon: desk_casino_en, url: `/en/casino`},
            ],
            es: [
                {id:1, icon:banner1web, method:()=>slide1Action()},
                {id: 5, icon: img_desk_wb_en, url: `/es/promotions/welcome_bonus`},
                {id: 3, icon: desk_sl_en, url: `/es/slots`},
                {id: 4, icon: desk_sp_en, url: `/es/sport`},
                {id: 2, icon: desk_casino_en, url: `/es/casino`},
            ]

        } : {
            ru: [
                {id:1, icon:banner1mob, method:()=>slide1Action()},
                {id: 5, icon: img_mob_wb_ru, url: `/ru/promotions/welcome_bonus`},
                {id: 3, icon: mob_sl_ru, url: `/ru/slots`},
                {id: 4, icon: mob_sp_ru, url: `/ru/sport`},
                {id: 2, icon: mob_casino_ru, url: `/ru/casino`},
            ],
            en: [
                {id:1, icon:banner1mob, method:()=>slide1Action()},
                {id: 5, icon: img_mob_wb_en, url: `/en/promotions/welcome_bonus`},
                {id: 3, icon: mob_sl_en, url: `/en/slots`},
                {id: 4, icon: mob_sp_en, url: `/en/sport`},
                {id: 2, icon: mob_casino_en, url: `/en/casino`},
            ],
            es: [
                {id:1, icon:banner1mob, method:()=>slide1Action()},
                {id: 5, icon: img_mob_wb_en, url: `/es/promotions/welcome_bonus`},
                {id: 3, icon: mob_sl_en, url: `/es/slots`},
                {id: 4, icon: mob_sp_en, url: `/es/sport`},
                {id: 2, icon: mob_casino_en, url: `/es/casino`},
            ],

        }
    const getList = (pageId) =>{
        return Actions.Slot.listByPage({webPageId:pageId})
    }
    useEffect(()=>{
        getList(4).then(response=>{
           setMainPageSlotList(response.status? response.data.data:[])
        })
        getList(5).then(response=>{
            setMainPageCasinoList(response.status? response.data.data:[])
        })
        window.addEventListener("resize",()=>{
            setResize(window.innerWidth)
        })
        return ()=>{
            window.removeEventListener("resize",()=>{
                setResize(window.innerWidth)
            })
        }
    },[]);
    return (
        <>
            <Header page={"main"}/>

            {/*<div style={{minHeight:'360px',margin:'10px 0'}}>
                <Carusel3D slides={slides} autoplay={true} interval={7000} onSlideChange={callback}/>
            </div>*/}

            <div className="container slider-container" style={{margin:'10px auto',borderRadius:'6px'}}>
                <NewSWP data={slideData[i18n.language]} />
            </div>

            <main className="widget_cont" >
                <div className="container" ref={ref}>
                    <div className="row for_widget" style={{margin:'0'}}>
                        <div className="col-12">
                            <Sport.TopMatchesWidget lang={lang}/>

                           {/* <div className="row">
                                <div className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                                    <div className="section-heading">Sport</div>
                                    <a href="#">View all</a>
                                </div>
                                <div className="col-12">
                                    <div className="row scroll">
                                        <div className="sport-col col-md-6">
                                            <div
                                                className="d-flex flex-column justify-content-between sport-card"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={milan} alt="A.C. Milan"/>
                                                        <span className="team-name">A.C. Milan</span>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={inter} alt="Inter Milan"/>
                                                        <span className="team-name">Inter Milan</span>
                                                    </div>
                                                </div>
                                                <div className="d-block w-100 text-center match-date">
                                                    Jan 28, 12:00 AM
                                                </div>
                                                <div className="match-bets d-flex justify-content-between">
                                                    <div>1.23</div>
                                                    <div>4.09</div>
                                                    <div>1.21</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sport-col col-md-6">
                                            <div
                                                className="d-flex flex-column justify-content-between sport-card"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={manCity} alt="Manchester City"/>
                                                        <span className="team-name">Manchester City</span>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={liver} alt="Liverpool FC"/>
                                                        <span className="team-name">Liverpool FC</span>
                                                    </div>
                                                </div>
                                                <div className="d-block w-100 text-center match-date">
                                                    Jan 29, 12:00 AM
                                                </div>
                                                <div className="match-bets d-flex justify-content-between">
                                                    <div>3.58</div>
                                                    <div>3.92</div>
                                                    <div>2.02</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
                        </div>
                       {/* <div className="col-12 col-md-6">
                            <div className="row">
                                <div
                                    className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                                    <div className="section-heading">live</div>
                                    <a href="#">View all</a>
                                </div>
                                <div className="col-12">
                                    <div className="row scroll">
                                        <div className="sport-col col-md-6">
                                            <div
                                                className="d-flex flex-column justify-content-between sport-card live"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={bayern} alt="FC Bayern Mu"/>
                                                        <span className="team-name">FC Bayern Munchen</span>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={ajax} alt="ajax amsterdam"/>
                                                        <span className="team-name">ajax amsterdam</span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between match-live-details"
                                                >
                                                    <span className="score">1</span>
                                                    <span className="match-time">54</span>
                                                    <span className="score">0</span>
                                                </div>
                                                <div className="match-bets d-flex justify-content-between">
                                                    <div>1.03</div>
                                                    <div>2.03</div>
                                                    <div>2.23</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sport-col col-md-6">
                                            <div
                                                className="d-flex flex-column justify-content-between sport-card live"
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={manCity} alt="Manchester City"/>
                                                        <span className="team-name">Manchester City</span>
                                                    </div>
                                                    <div
                                                        className="d-flex flex-column align-items-center w-50 team"
                                                    >
                                                        <img src={manUn} alt="Manchester United"/>
                                                        <span className="team-name">Manchester United</span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="d-flex justify-content-between match-live-details"
                                                >
                                                    <span className="score">2</span>
                                                    <span className="match-time">90+</span>
                                                    <span className="score">2</span>
                                                </div>
                                                <div className="match-bets d-flex justify-content-between">
                                                    <div>1.23</div>
                                                    <div>3.33</div>
                                                    <div>2.11</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                            <div className="section-heading">{t('slots')}</div>
                            <Link to={`/${lang}/slots`}>{t("View all")}</Link>
                        </div>
                        <div className="col-12 main-slots-area" data-count={Math.round(resize/300)}>
                            <div className="sl-prev-button"/>
                            <div className="sl-next-button"/>
                            <Carousel
                                id={"font-slot"}
                                counter={Math.round(resize/300)}
                                data={mainPageSlotList}
                                navigation={{
                                    nextEl:".sl-next-button",
                                    prevEl:".sl-prev-button"
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-between justify-content-md-start section-head">
                            <div className="section-heading">{t("casino")}</div>
                            <Link to={`/${lang}/casino`}>{t("View all")}</Link>
                        </div>
                        <div className="col-12 main-casino-area" data-count={Math.round(resize/300)}>
                            <div className="sl-prev-casino-button"/>
                            <div className="sl-next-casino-button"/>
                            <Carousel
                                id={"font-games"}
                                counter={Math.round(resize/300)}
                                data={mainPageCasinoList}
                                navigation={{
                                    nextEl:".sl-next-casino-button",
                                    prevEl:".sl-prev-casino-button"
                                }}
                            />

                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default MainScreen
