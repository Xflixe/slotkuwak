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
                text: i18n.language === "en" ?'To be able to use Free Spins, please verify your account first.':'Для использования Free Spins, подтвердите аккаунт.',
                type:'error',
                title: i18n.language === "en" ?'Account verification!':'Верификация аккаунта!',
                button:{
                    name: i18n.language === "en" ?'Verify Account':'Верификация Аккаунта',
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
                                <li className="prize">{t('PROVIDER')}</li>
                                <li className="col slot">{t('SLOT/ GAME')}</li>
                                <li className="category">{t('QUANTITY')}</li>
                                <li className="time">{t('VALID UNTIL')}</li>
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
                                            <li className="time">{moment(v.validUntil).format("YYYY-MM-DD HH:mm")}</li>
                                        </ul>
                                        <div className="action">
                                            {(!v?.claimable || v?.configId && v?.configId !== "") && <button onClick={()=> playGame(v)}>{i18n.language === "en" ?'Play':'Играть'}</button>}
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
