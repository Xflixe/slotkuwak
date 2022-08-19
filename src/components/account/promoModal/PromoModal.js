import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import './PromoModal.scss';
import {NewModal} from "../../index";

const PromoModal = ({data,onUpdate})=>{
    const {t,i18n} = useTranslation();

    const modalClose = (id) => {
        //Actions.User.readMessage({id}).then(response=>{
        //    if(response.status){
        //        onClose(false)
        //        onUpdate()
        //    }
        //})

        onUpdate(id)
    }
    const onPlay = (dat) => {
        window.open(`/${i18n.language}/playSlot?id=${data?.specifiers?.gameId}`)
        modalClose(dat?.id)
    }

    switch (data?.type){
        case 'wager':
            return (
                <NewModal title={t("Deposit Bonus") +' '+ data.type} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>Deposit Bonus Activated</h3>
                        <p>Start your adventure with PlanetaX, make your first deposit  and receive  bonus</p>
                        <button>Deposit</button>
                    </div>
                </NewModal>
            )

        default:
            return (
                <NewModal title={t("Free Spin Bonus") +' '+ data.type} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>Free Spin Bonus Activated</h3>
                        <p>{data?.specifiers?.quantity} free spin has been activated on your account, you can start playing immediately <span>{data?.specifiers?.gameName} by {data?.specifiers?.providerName}</span></p>
                        <button onClick={()=>onPlay(data)}>Play Slot</button>
                    </div>
                </NewModal>
            )
    }


}
export default PromoModal;




