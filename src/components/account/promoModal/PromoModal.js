import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import './PromoModal.scss';
import {NewModal} from "../../index";
import {UseEvent} from "../../../core/hooks/useEvent";
import {Link, Redirect} from "react-router-dom";

const PromoModal = ({data,onUpdate})=>{
    const {t,i18n} = useTranslation();
    const ev = UseEvent();

    const modalClose = (id) => {
        Actions.User.readMessage({id}).then(response=>{
            if(response.status){
                onUpdate(id)
            }
        })


    }
    const onPlay = (dat) => {
        modalClose(dat?.id)

        switch (dat?.type){
            case 'wager':
               ev.emit('depositModal', true)
                break;
            case 'noDepositBonusVerification':
                window.location.href = `/${i18n.language}/account/verification`
                break;
            default:
                window.open(`/${i18n.language}/playSlot?id=${data?.specifiers?.gameId}`)
                break;
        }


    }

    switch (data?.type){
        case 'wager':
            return (
                <NewModal title={t("Deposit Bonus")} onClose={()=>onPlay(data)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>Deposit Bonus Activated</h3>
                        <p>Start your adventure with PlanetaX, make your first deposit  and receive  bonus</p>
                        <button onClick={()=>onPlay(data)}>Deposit</button>
                    </div>
                </NewModal>
            )
        case 'noDepositBonusVerification':
            return (
                <NewModal title={t("FreeSpin Verification")} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>You have been awarded with {data?.specifiers?.quantity} fresspin</h3>
                        <p>In {data?.specifiers?.providerName} {data?.specifiers?.gameName} and <strong style={{color:'#EEC64F'}}>to use it you need to be verified</strong> !</p>

                        <button onClick={()=>onPlay(data)}>Verification</button>
                    </div>
                </NewModal>
            )
        case 'nodepositbonus':
            return (
                <NewModal title={t("Free Spin Bonus")} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>Free Spin Bonus Activated</h3>
                        <p>{data?.specifiers?.quantity} free spin has been activated on your account, you can start playing immediately <span>{data?.specifiers?.gameName} by {data?.specifiers?.providerName}</span></p>
                        <button onClick={()=>onPlay(data)}>Play Slot</button>
                    </div>
                </NewModal>
            )

        default:
            return (
                <NewModal title={t("PromoCode Free Spin Bonus")} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>PromoCode Free Spin Bonus Activated</h3>
                        <p>{data?.specifiers?.quantity} free spin has been activated on your account, you can start playing immediately <span>{data?.specifiers?.gameName} by {data?.specifiers?.providerName}</span></p>
                        <a href={`/${i18n.language}/slots/freespin`} onClick={()=>modalClose(data?.id)}>Claim</a>
                    </div>
                </NewModal>
            )
    }


}
export default PromoModal;




