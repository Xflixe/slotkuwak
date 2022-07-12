import React, { useEffect, useRef, useState} from 'react';
import { sl2,w2} from '../../assets/img/images';
import {Carousel, Header, Swp, Footer, Sport,NewSWP,PLAlert} from "../../components";   // Carusel3D
import {Link, useParams} from "react-router-dom";
import {Actions, useTranslation} from "../../core";

import img_desk_1 from "../../assets/img/slide/lending_desc.jpg";
import img_desk_2 from "../../assets/img/slide/casino/desktop/2.jpg";
import img_desk_3 from "../../assets/img/slide/slots/desktop/1.jpg";
import img_desk_4 from "../../assets/img/slide/sport/desktop/1.jpg";

import img_mob_1 from "../../assets/img/slide/lending_mob.jpg";
import img_mob_2 from "../../assets/img/slide/casino/mobile/2.jpg";
import img_mob_3 from "../../assets/img/slide/slots/mobile/1.jpg";
import img_mob_4 from "../../assets/img/slide/sport/mobile/1.jpg";



const MainScreen = () =>{
    const {t,i18n} = useTranslation()
    const {lang}=useParams();
    const ref=useRef();
    const [resize,setResize]=useState(window.innerWidth);
    const [mainPageSlotList,setMainPageSlotList]=useState([]);
    const [mainPageCasinoList,setMainPageCasinoList]=useState([]);

    const [slideData,setSlideData] = useState(
        window.innerWidth > 767 ? [
            {id:1, icon:img_desk_1, url:`/${i18n.language}/promotions`},
            {id:2, icon:img_desk_2, url:`/${i18n.language}/casino`},
            {id:4, icon:img_desk_4, url:`/${i18n.language}/sport`},
            {id:3, icon:img_desk_3, url:`/${i18n.language}/slots`},
        ] : [
            {id:1, icon:img_mob_1, url:`/${i18n.language}/promotions`},
            {id:2, icon:img_mob_2, url:`/${i18n.language}/casino`},
            {id:4, icon:img_mob_4, url:`/${i18n.language}/sport`},
            {id:3, icon:img_mob_3, url:`/${i18n.language}/slots`},
        ]
    );


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
                <NewSWP data={slideData} />
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
