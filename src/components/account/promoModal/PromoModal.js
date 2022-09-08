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
                        <h3>{i18n.language === "en" ?'Deposit Bonus Activated':'Депозитный бонус активирован!'}</h3>
                        <p>{i18n.language === "en" ?'Start your adventure with PlanetaX, make your first deposit  and receive  bonus':'Начните свое приключение с PlanetaX, сделайте первый депозит и получите бонус'}</p>
                        <button onClick={()=>onPlay(data)}>{i18n.language === "en" ?'Deposit':'Депозит'}</button>
                    </div>
                </NewModal>
            )
        case 'noDepositBonusVerification':
            return (
                <NewModal title={t("FreeSpin Verification")} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>{i18n.language === "en" ?`You have been awarded ${data?.specifiers?.quantity} fresspin`:`Вы получили ${data?.specifiers?.quantity} фриспинов`}</h3>
                        <p>{i18n.language === "en" ?`in ${data?.specifiers?.providerName} ${data?.specifiers?.gameName} and to use it you need to verify your account!`:`в ${data?.specifiers?.providerName} ${data?.specifiers?.gameName}, и для их использования вам необходимо пройти верификацию!`}</p>

                        <button onClick={()=>onPlay(data)}>{i18n.language === "en" ?'Verification':'Верификация'}</button>
                    </div>
                </NewModal>
            )
        case 'nodepositbonus':
            return (
                <NewModal title={t("Free Spin Bonus")} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>{i18n.language === "en" ?'Free Spin Bonus Activated':'бонус фриспины активированы!'}  </h3>
                        <p>{i18n.language === "en" ?`${data?.specifiers?.quantity} FREESPINS have been activated on your account, you can start playing ${data?.specifiers?.gameName} by ${data?.specifiers?.providerName} immediately.`:`На вашем аккаунте активировано ${data?.specifiers?.quantity} бесплатных фриспинов. Вы можете сразу начать играть ${data?.specifiers?.gameName} от ${data?.specifiers?.providerName}`}</p>
                        <button onClick={()=>onPlay(data)}>{i18n.language === "en" ?'Play slot':'Играть в слот'}</button>
                    </div>
                </NewModal>
            )
        case 'depositX2FpsBonus':
            return (
                <NewModal title={t("Free Spin Bonus")} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>{i18n.language === "en" ?'Free Spin Bonus Activated':'Бесплатные бонус фриспины активированы!'}  </h3>
                        <p>{i18n.language === "en" ?`${data?.specifiers?.quantity} FREESPINS have been activated on your account, you can start playing ${data?.specifiers?.gameName} by ${data?.specifiers?.providerName} immediately.`:`На вашем аккаунте активировано ${data?.specifiers?.quantity} бесплатных фриспинов. Вы можете сразу начать играть ${data?.specifiers?.gameName} от ${data?.specifiers?.providerName}`}</p>
                        <a href={`/${i18n.language}/slots/freespin`} onClick={()=>modalClose(data?.id)}>{t('Claim')}</a>
                    </div>
                </NewModal>
            )

        default:
            return (
                <NewModal title={t("PromoCode Free Spin Bonus")} onClose={()=>modalClose(data?.id)} className={'promo-modal'} dialogStyle={{width:'600px'}} contentStyle={{width:'600px'}}>
                    <div className="promo-modal-box">
                        <h3>{i18n.language === "en" ?'PromoCode Free Spin Bonus Activated':'Бесплатные бонус фриспины по промокоду активированы!'}  </h3>
                        <p>{i18n.language === "en" ?`${data?.specifiers?.quantity} FREESPINS have been activated on your account, you can start playing ${data?.specifiers?.gameName} by ${data?.specifiers?.providerName} immediately.`:`На вашем аккаунте активировано ${data?.specifiers?.quantity} бесплатных фриспинов. Вы можете сразу начать играть ${data?.specifiers?.gameName} от ${data?.specifiers?.providerName}`}</p>
                        <a href={`/${i18n.language}/slots/freespin`} onClick={()=>modalClose(data?.id)}>{t('Claim')}</a>
                    </div>
                </NewModal>
            )
    }


}
export default PromoModal;




