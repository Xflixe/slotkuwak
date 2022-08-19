import React, { useEffect, useRef, useState} from 'react';
import { sl2,w2} from '../../assets/img/images';
import {Carousel, Header, Swp, Footer, Sport,NewSWP,PLAlert} from "../../components";   // Carusel3D
import {Link, useParams} from "react-router-dom";
import {Actions, useTranslation} from "../../core";

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
    fortune_small

} from "../../assets/img/turbo/icons";

const Turbo = () =>{
    const {t,i18n} = useTranslation()
    const {lang}=useParams();
    const ref=useRef();
    const [resize,setResize]=useState(window.innerWidth);
    const [mainPageSlotList,setMainPageSlotList]=useState([]);
    const [mainPageCasinoList,setMainPageCasinoList]=useState([]);

    return (
        <>
            <Header page={"main"}/>

            <main className="widget_cont" >
                <div className="container" ref={ref}>
                    <br/>
                    <div style={{color:'#fff'}}>
                        <h3>Turbo Games</h3>
                        <p>Mix of new generation and traditional games, targeted on Generation Y</p>
                    </div>
                    <div className="turbo">
                        <div className="box x2 {/*active*/}" data-game="aviator">
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
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box x2 {/*active*/}" data-game="aviator">
                            <div className="game-box">
                                <div className="box_1">
                                    <div className="full">
                                        <img alt="turbo" className="fly" src={fly}/>
                                        <img alt="turbo" className="aviator" src={aviator}/>
                                    </div>
                                </div>
                                <div className="box_2">
                                    <div className="name">Russian Poker</div>
                                    <div className="info">
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box {/*active*/}" data-game="poker">
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
                        </div>
                        <div className="box {/*active*/}" data-game="goal">
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
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box {/*active*/}" data-game="roulette">
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
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box {/*active*/}" data-game="keno">
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
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box {/*active*/}" data-game="scatch">
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
                        </div>
                        <div className="box {/*active*/}" data-game="hilo">
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
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box {/*active*/}" data-game="mines">
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
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box {/*active*/}" data-game="hotline">
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
                        </div>
                        <div className="box {/*active*/}" data-game="blackjack">
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
                        </div>
                        <div className="box {/*active*/}" data-game="plinko">
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
                                        <button>Play Game</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box {/*active*/}" data-game="fortune">
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
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default Turbo
