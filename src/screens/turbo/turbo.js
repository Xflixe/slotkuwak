import React, { useEffect, useRef, useState} from 'react';
import {Header, Footer, NewSWP} from "../../components";
import {useParams} from "react-router-dom";
import {useTranslation} from "../../core";

import './turboGame.scss';

import {
    left_arrow,
    poker,
    poker_small,
    aviator,
    fly,
    goal,
    goal_small,
    roulette,
    roulette_small,
    keno,
    keno_small,
    scatch,
    scatch_small,
    hilo,
    hilo_small,
    mines,
    mines_small,
    hotline,
    hotline_small,
    blackjack,
    blackjack_small,
    plinko,
    plinko_small,
    fortune,
    fortune_small,
    dice,
    dice_small

} from "../../assets/img/turbo/icons";
import desk_casino_ru from "../../assets/img/slide/casino/desktop/3ru.png";
import desk_sp_ru from "../../assets/img/slide/sport/desktop/2ru.png";
import img_desk_wb_ru from "../../assets/img/slide/wb_ru.png";
import desk_casino_en from "../../assets/img/slide/casino/desktop/3en.png";
import desk_sp_en from "../../assets/img/slide/sport/desktop/2en.png";
import img_desk_wb_en from "../../assets/img/slide/wb_en.png";
import mob_casino_ru from "../../assets/img/slide/casino/mobile/3ru.png";
import mob_sp_ru from "../../assets/img/slide/sport/mobile/2ru.png";
import img_mob_wb_ru from "../../assets/img/slide/wb_mob_ru.png";
import mob_casino_en from "../../assets/img/slide/casino/mobile/3en.png";
import mob_sp_en from "../../assets/img/slide/sport/mobile/2en.png";
import img_mob_wb_en from "../../assets/img/slide/wb_mob_en.png";

const Turbo = () =>{
    const {t,i18n} = useTranslation()
    const {lang}=useParams();
    const ref=useRef();

    const slideData = window.innerWidth > 767 ? {
        ru: [
            {id: 2, icon: desk_casino_ru, url: `/ru/casino`},
            {id: 4, icon: desk_sp_ru, url: `/ru/sport`},
            {id: 5, icon: img_desk_wb_ru, url: `/ru/promotions/welcome_bonus`},
        ],
        en: [
            {id: 2, icon: desk_casino_en, url: `/en/casino`},
            {id: 4, icon: desk_sp_en, url: `/en/sport`},
            {id: 5, icon: img_desk_wb_en, url: `/en/promotions/welcome_bonus`},
        ],
        es: [
            {id: 2, icon: desk_casino_en, url: `/es/casino`},
            {id: 4, icon: desk_sp_en, url: `/es/sport`},
            {id: 5, icon: img_desk_wb_en, url: `/es/promotions/welcome_bonus`},
        ]

    } : {
        ru: [
            {id: 2, icon: mob_casino_ru, url: `/ru/casino`},
            {id: 4, icon: mob_sp_ru, url: `/ru/sport`},
            {id: 5, icon: img_mob_wb_ru, url: `/ru/promotions/welcome_bonus`},
        ],
        en: [
            {id: 2, icon: mob_casino_en, url: `/en/casino`},
            {id: 4, icon: mob_sp_en, url: `/en/sport`},
            {id: 5, icon: img_mob_wb_en, url: `/en/promotions/welcome_bonus`},
        ],
        es: [
            {id: 2, icon: mob_casino_en, url: `/es/casino`},
            {id: 4, icon: mob_sp_en, url: `/es/sport`},
            {id: 5, icon: img_mob_wb_en, url: `/es/promotions/welcome_bonus`},
        ],

    }

    const onPlay = (gameId,name) => {
        window.open(`/${i18n.language}/playSlot?id=${gameId}&gameId=${name}`)
    }

    return (
        <>
            <Header page={"turbo"}/>

            <div className="container slider-container" style={{margin:'10px auto',borderRadius:'6px'}}>
                <NewSWP data={slideData[i18n.language]} />
            </div>

            <main className="widget_cont" >
                <div className="container" ref={ref}>
                    <br/>
                    <div style={{color:'#fff'}}>
                        <h3>Turbo</h3>
                        <p>{t('Mix of new generation and traditional games, targeted on Generation Y')}</p>
                    </div>
                    <div className="turbo">
                        <div className="box x2" data-game="aviator">
                            <div className="game-box">
                                <div className="box_1">
                                    <div className="full">
                                        <img alt="turbo" className="fly" src={fly}/>
                                        <img alt="turbo" className="aviator" src={aviator}/>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="full">
                                        <img alt="turbo" className="fly" src={fly}/>
                                        <img alt="turbo" className="aviator" src={aviator}/>
                                    </div>
                                    <div className="info">
                                        <button onClick={()=>onPlay(3082,'aviator')}>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box x2" data-game="dice">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={dice}/>
                                <img alt="turbo" className="small" src={dice_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 purple">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Di</div>
                                        <div className="name">Dice</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Dice</div>
                                    <div className="info">
                                        <button onClick={()=>onPlay(3083,'dice')}>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="box" data-game="poker">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={poker}/>
                                <img alt="turbo" className="small" src={poker_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 blue">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Rp</div>
                                        <div className="name">Russian Poker</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Russian Poker</div>
                                    <div className="info">
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                        <div className="box" data-game="goal">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={goal}/>
                                <img alt="turbo" className="small" src={goal_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 blue">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Go</div>
                                        <div className="name">Goal</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Goal</div>
                                    <div className="info">
                                        <button onClick={()=>onPlay(3084,'goal')}>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box" data-game="roulette">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={roulette}/>
                                <img alt="turbo" className="small" src={roulette_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 blue">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Mr</div>
                                        <div className="name">Mini Roulette</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Mini Roulette</div>
                                    <div className="info">
                                        <button onClick={()=>onPlay(3089,'mini-roulette')}>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box" data-game="keno">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={keno}/>
                                <img alt="turbo" className="small" src={keno_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 yellow">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Ke</div>
                                        <div className="name">Keno</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Keno</div>
                                    <div className="info">
                                        <button onClick={()=>onPlay(3088,'keno')}>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="box" data-game="scatch">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={scatch}/>
                                <img alt="turbo" className="small" src={scatch_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 yellow">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Sc</div>
                                        <div className="name">Scatch</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Scatch</div>
                                    <div className="info">
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                        <div className="box" data-game="hilo">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={hilo}/>
                                <img alt="turbo" className="small" src={hilo_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 yellow">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Hi</div>
                                        <div className="name">Hilo</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Hilo</div>
                                    <div className="info">
                                        <button onClick={()=>onPlay(3087,'hi-lo')}>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box" data-game="mines">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={mines}/>
                                <img alt="turbo" className="small" src={mines_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 sky">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Mi</div>
                                        <div className="name">Mines</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Mines</div>
                                    <div className="info">
                                        <button onClick={()=>onPlay(3086,'mines')}>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="box" data-game="hotline">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={hotline}/>
                                <img alt="turbo" className="small" src={hotline_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 sky">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Ho</div>
                                        <div className="name">Hotline</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Hotline</div>
                                    <div className="info">
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                        {/*<div className="box" data-game="blackjack">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={blackjack}/>
                                <img alt="turbo" className="small" src={blackjack_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 sky">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Bl</div>
                                        <div className="name">Blackjack</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Blackjack</div>
                                    <div className="info">
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                        <div className="box" data-game="plinko">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={plinko}/>
                                <img alt="turbo" className="small" src={plinko_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 sky">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Pl</div>
                                        <div className="name">Plinko</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Plinko</div>
                                    <div className="info">
                                        <button onClick={()=>onPlay(3085,'plinko')}>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<div className="box" data-game="fortune">
                            <div className="right-icon">
                                <img alt="turbo" className="big" src={fortune}/>
                                <img alt="turbo" className="small" src={fortune_small}/>
                            </div>
                            <div className="game-box">
                                <div className="box_1 pink">
                                    <div className="left-icon">
                                        <img alt="turbo" className="big" src={left_arrow}/>
                                    </div>
                                    <div className="info">
                                        <div className="title">Fw</div>
                                        <div className="name">Fortune Wheel</div>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Fortune Wheel</div>
                                    <div className="info">
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default Turbo
