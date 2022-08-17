import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import './PromoModal.scss';
import {NewModal} from "../../index";

const PromoModal = ({onClose})=>{
    const {t} = useTranslation();

    useEffect(()=>{

    },[])

    return (
        <NewModal title={t("Free Spin Bonus")} onClose={()=>onClose(false)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
            <div className="promo-modal-box">
                <h3>Free Spin Bonus Activated</h3>
                <p>20 free spin has been activated on your account, you can start playing immediately <span>Legend of Cleopatra by Netet</span></p>
                <button>Play Slot</button>
            </div>
        </NewModal>

    )
}
export default PromoModal;




