import React,{useEffect,useState} from 'react'
import _ from 'lodash'
import {play as PlayIcon} from "../../assets/img/icons/icons";
import {useSLot} from "../../core/hooks/useSLot";
import {useLoader} from "../../core/hooks/useLoader";
import {Loader} from "../index";
import './slotCard.scss'
const SlotCard =({data})=> {
    const {loader}=useLoader()
    const {play}= useSLot()

    return (_.map(data, (v,index)=>{
                return  (
                    <div className="card-list-item" key={index} >
                        {/*{loader===v.gameId && <Loader/>}*/}
                        <div className="sl-card" style={{backgroundImage:`url(${v.imageUrl})`}} >
                            <div className="sl-card-hover" onClick={()=>play(v)}>
                                <div className="slot-card-cover "/>
                                <img src={v.imageUrl} alt="" style={{visibility:"hidden"}} />
                                <img src={PlayIcon} alt="" className="play-btn" />
                            </div>
                        </div>
                        <div className="info">
                            <div className="name">{v.name}</div>
                        </div>

                        {/*<div className="slot-card" style={{backgroundImage:`url(${v.imageUrl})`}}>
                            {loader===v.gameId && <Loader/>}
                            <div className="slot-card-hover animated-background"  onClick={()=>play(v)}>
                                <div className="slot-card-cover "/>
                                <img src={v.imageUrl} alt="" style={{visibility:"hidden"}} />
                                <img src={PlayIcon} alt="" className="play-btn" />
                            </div>
                            <div className="info">
                                <div className="name">{v.name}</div>
                                <div className="like"><i/><span>{v?.options?.likes}</span></div>
                            </div>
                        </div>*/}
                    </div>
                )
            })

    )
}
export default SlotCard;


/*
<div className="col-4 col-lg-3 col-xl-2" key={index}>
    <div className="slot-card">
        {loader===v.gameId && <Loader/>}
        <div className="slot-card-hover animated-background" style={{backgroundImage:`url(${v.imageUrl})`}} onClick={()=>play(v)}>
            <div className="slot-card-cover "/>
            {/!*<img src={v.imageUrl} alt="" style={{visibility:"hidden"}} />*!/}
            <img src={PlayIcon} alt="" className="play-btn" />
        </div>
        <div className="info">
            <div className="name">{v.name}</div>
            {/!*<div className="like"><i/><span>{v?.options?.likes}</span></div>*!/}
        </div>
    </div>
</div>*/
