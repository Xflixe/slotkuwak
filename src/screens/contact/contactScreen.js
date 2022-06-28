import React from "react";
import {Balance, ContentNavigator, Footer, Header, Information} from "../../components";
import {useTranslation} from "../../core";
import {discord, gr,
    evolutionGaming,
    relax,
    pragmatic,
    playngo,
    isoftbet,
    kiron,
    wazdan,
} from "../../assets/img/icons/icons";
const ContactScreen = ()=>{
    const {t,i18n} = useTranslation()
    return <>
    <Header page={"contact"}/>
        <main className="page">
            <div className="container">
                {/*<ContentNavigator page="contact" lang={i18n.language}/>*/}
                <div className="page-wrapper contact">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-headline">{t('Support')}</div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                {/*<div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/uk-flag.png").default} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">{t("Phone")}</div>
                                                <a href="tel:0-800-210-410" className="contact-type">0-800-210-410</a>
                                            </div>
                                    </div>
                                </div>*/}
                                {/*<div className="col-12 col-md-6 col-lg-4">
                                    <a href="https://discord.gg/sbjFXbbcBK" target="_blank" className="contact-type">
                                    <div className="d-flex align-items-center contact-item">

                                        <img src={discord} alt="" className="discord"/>
                                        <div className="d-flex flex-column">
                                            <div className="contact-type-title">{t("Discord")}</div>
                                            <a href="https://discord.gg/sbjFXbbcBK" target="_blank" className="contact-type">PlanetaXbet</a>
                                        </div>

                                    </div>
                                    </a>
                                </div>*/}
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/email.png")} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">{t("Email")}</div>
                                                <a href="mailto:support@planetaxbet.com"
                                                   className="contact-type">support@planetaxbet.com</a>
                                            </div>
                                    </div>
                                </div>
                                {/*<div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/telegram.png")} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">{t("Telegram")}</div>
                                                <a href="mailto:support@planetaxbet.com" target="_blank"
                                                   className="contact-type">@HelpPlanetaXbet</a>
                                            </div>
                                    </div>
                                </div>*/}
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/chat.png")} alt=""/>
                                            <div className="d-flex flex-column" onClick={()=>{
                                                window.zE('messenger', 'open');
                                                window.ZEChatAction('open');
                                            }}>
                                                <div className="contact-type-title">{t("Live Chat")}</div>
                                                {/*<a href="https://direct.lc.chat/14154144/" target="_blank" ><div className="contact-type underline">{t("Write a Message")}</div></a>*/}
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </>
}
export default ContactScreen;
