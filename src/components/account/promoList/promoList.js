import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import {useNavigation} from "../../../core/hooks/useNavigation";
import _ from "lodash";
import moment from "moment";
import {UseEvent} from "../../../core/hooks/useEvent";


const PromoList = ({data}) => {
    const {t,i18n} = useTranslation();
    const ev = UseEvent();

    const playGame = (v) => {

        if(v?.claimable){
            window.open(`/${i18n.language}/playSlot?id=${v?.configId}`)
        }else{
            ev.emit('notify', {
                show:true,
                text:'Oops, Unfortunately you can not withdraw money. Please verify your profile first.',
                type:'error',
                title:'Withdraw Error',
                button:{
                    name:'Verify Account',
                    url: `/${i18n.language}/account/verification`
                }
            })
        }

    }


    return (
        <>
            <div className="content">

                <div className="t_grid">
                    <div className="t_head">
                        <div className="t_row grid-style">
                            <ul>
                                <li className="prize">PROVIDER</li>
                                <li className="col slot">SLOT/ GAME</li>
                                <li className="category">QUANTITY</li>
                                <li className="time">VALID UNTIL</li>
                            </ul>
                            <div className="action"/>
                        </div>
                    </div>

                    <div className="t_cont">
                        {
                            _.map(data, (v,k)=> {
                                return (
                                    <div className="t_row grid-style" key={k}>
                                        <ul>
                                            <li className="prize">{v.provider}</li>
                                            <li className="slot">{v.game}</li>
                                            <li className="category">{v.quantity} FreeSpin</li>
                                            <li className="time">{moment(v.validUntil).format("YYYY-MM-DD HH:MM")}</li>
                                        </ul>
                                        <div className="action">
                                            {(!v?.claimable || v?.configId && v?.configId !== "") && <button onClick={()=> playGame(v)}>{t('Play')}</button>}
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>
            </div>
        </>
    )
}

export default PromoList;
