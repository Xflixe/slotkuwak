import React from 'react';
import '../footer/footer.scss';
import {FooterCarousel} from "../index";
import {begambleaware, betsoft, netent} from "../../assets/img/images";
import {discord, gr,
    evolutionGaming,
    relax,
    pragmatic,
    playngo,
    isoftbet,
    kiron,
    wazdan,
    chat,
    telegram
} from "../../assets/img/icons/icons";
import {Link} from "react-router-dom";
import {i18n, useTranslation} from "../../core";
import {
    ada,
    bnb,
    btc,
    busd,
    dash,
    eth,
    ltc,
    neo,
    trx,
    usdc,
    usdt} from "../../assets/img/crypro/crypto";

const Footer =()=>{
    const {t} = useTranslation()
    return(
        <footer className="footer">
            <div className="container">
                <div className="row gx-0 align-items-center foot-wrap">
                    <div className="col-12 d-md-none">
                        {/*<h6 style={{textAlign:'center',color:'#C6D1ED',paddingLeft:'3px'}}>Follow Us</h6>*/}
                        <div className="d-flex align-items-center justify-content-center social-list">
                            <a
                                href="https://www.facebook.com/Planetaxbet"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-facebook-f facebook"/>
                            </a>
                        {/*    <a
                                href="#"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-reddit-alien reddit"/>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-instagram instagram"/>
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-twitter twitter"/>
                            </a>*/}
                            <a
                                href="https://discord.gg/sbjFXbbcBK"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <img src={discord} alt="" className="discord"/>
                            </a>
                            <a
                                href="https://twitter.com/PXbet"
                                target="_blank"
                                className="d-flex align-items-center justify-content-center social-item rounded-circle"
                            >
                                <i className="fab fa-twitter twitter"/>
                            </a>
                            <a
                                href="https://t.me/planetaxbet"
                                target="_blank"
                                className="telegram d-flex align-items-center justify-content-center social-item rounded-circle "
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"/></svg>
                            </a>
                            <a className="d-flex align-items-center justify-content-center social-item rounded-circle" onClick={()=>{
                                window.zE('messenger', 'open');
                                window.ZEChatAction('open');
                            }}>
                                <img src={chat} alt="" className="chat"/>
                            </a>
                        </div>
                    </div>
                    <div className="mob-col col-12 col-lg-3" >
                        <ul className="footer-menu">
                            {/*<li>
                                <a href="#">{t("About Us")}</a>
                            </li>
                            <li>
                                <a href="#">{t("Blog")}</a>
                            </li>
                            <li>
                                <a href="#">{t('Promotions')}</a>
                            </li>
                            <li>
                                <a href="#">{t('Affiliates')}</a>
                            </li>*/}
                            <li>
                                <Link to={`/${i18n.language}/aboutUs`}>{t("About Us")}</Link>
                            </li>
                            <li>
                                <Link to={`/${i18n.language}/terms/2/331`}>{t("Terms and conditions")}</Link>
                            </li>
                            <li>
                                <Link to={`/${i18n.language}/contact`}>{t("Support")}</Link>
                            </li>

                            <li><Link to={`/${i18n.language}/terms/3/11`}>{t("Privacy Policy")}</Link></li>
                            <li><Link to={`/${i18n.language}/terms/8/881`}>{t("KYC/AML Policy")}</Link></li>
                            <li className="d-none d-md-flex"><Link to={`/${i18n.language}/terms/5/551`}>{t("Responsible Gaming")}</Link></li>
                            <li><Link to={`/${i18n.language}/terms/5/552`}>{t("Self Exclusion Policy")}</Link></li>

                        </ul>
                    </div>
                    <div className="mob-col col-12 col-lg-3">
                        <ul className="footer-menu">

                            {/*<li><Link to={`/${i18n.language}/privacy`}>{t("Privacy Policy")}</Link></li>
                            <li><Link to={`/${i18n.language}/kyc_aml`}>{t("KYC/AML Policy")}</Link></li>
                            <li className="d-none d-md-flex"><Link to={`/${i18n.language}/responsible_gaming`}>{t("Responsible Gaming")}</Link></li>
                            <li><Link to={`/${i18n.language}/self_exclusion_policy`}>{t("Self Exclusion Policy")}</Link></li>*/}
                            {/*<li><a href="#">{t("Underage Gaming Policy")}</a></li>*/}
                        </ul>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="row gx-0">
                            <div className={"position-relative  logo-list ft-carousel-1"}>
                                <FooterCarousel count={3} data={[
                                    {id:67,icon:evolutionGaming, page:'casino'},
                                    {id:63,icon:relax, page:'slots'},
                                    {id:69,icon:pragmatic, page:'slots'},

                                ]}/>
                            </div>
                            <div className={"position-relative  logo-list ft-carousel-2 last"}>
                                <FooterCarousel count={3} data={[
                                    {id:62,icon:playngo , page:'slots'},
                                    {id:58,icon:isoftbet, page:'slots'},
                                    {id:57,icon:kiron, page:'virtuals'},
                                ]}/>
                            </div>

                        </div>
                    </div>
                </div>

                <br/>

                <div className="row footer-crypto-soc">
                    <div className="col-12 col-lg-8">
                        <h6 style={{textAlign:'left',color:'#C6D1ED'}}>Accepted Currencies</h6>
                        <div style={{justifyContent:'left'}} className="crypto">
                            <i className="crypto" data-color="btc"><img src={btc} /></i>
                            <i className="crypto" data-color="ltc"><img src={ltc} /></i>
                            <i className="crypto" data-color="eth"><img src={eth} /></i>
                            <i className="crypto" data-color="bnb"><img src={bnb} /></i>
                            <i className="crypto" data-color="busd"><img src={busd} /></i>
                            <i className="crypto" data-color="usdt"><img src={usdt} /></i>
                            <i className="crypto" data-color="dash"><img src={dash} /></i>
                            <i className="crypto" data-color="neo"><img src={neo} /></i>
                            <i className="crypto" data-color="ada"><img src={ada} /></i>
                            <i className="crypto" data-color="trx"><img src={trx} /></i>
                            <i className="crypto" data-color="usdc"><img src={usdc} /></i>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 d-none d-md-flex  flex-md-column">
                        <h6 style={{textAlign:'right',color:'#C6D1ED'}}>Follow Us</h6>
                        <div style={{justifyContent:'right'}} className="d-none d-md-flex social-list">
                                <a
                                    href="https://www.facebook.com/Planetaxbet"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <i className="fab fa-facebook-f facebook"/>
                                </a>
                                {/*<a
                                    href="#"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <i className="fab fa-reddit-alien reddit"/>
                                </a>*/}
                                {/*<a
                                    href="#"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <i className="fab fa-instagram instagram"/>
                                </a>*/}
                                <a
                                    href="https://twitter.com/PXbet"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <i className="fab fa-twitter twitter"/>
                                </a>
                                <a
                                    href="https://t.me/planetaxbet"
                                    target="_blank"
                                    className="telegram d-flex align-items-center justify-content-center social-item rounded-circle "
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"/></svg>
                                </a>
                                <a
                                    href="https://discord.gg/sbjFXbbcBK"
                                    target="_blank"
                                    className="d-flex align-items-center justify-content-center social-item rounded-circle"
                                >
                                    <img src={discord} alt="" className="discord"/>
                                </a>

                        </div>

                    </div>
                </div>
                <div className="begambleaware" >
                    <a href="https://www.begambleaware.org/" target="_blank"> <img src={begambleaware} width={"230px"} align="right"/> </a>
                </div>
                <br/>

                <div className="row gx-0 align-items-center">
                    <div className="d-flex align-items-center footer-bt" style={{marginTop:'0'}}>
                        <div className="d-flex align-items-center justify-content-center restriction">
                            <span>+18</span>
                        </div>
                        <div className="footer-copyright d-flex align-items-center">
                            <p style={{margin:'0'}}>Copyright © 2021  www.planetaxbet.com is operated by Winfinity N.V. that is licensed by the Government of Curacao and operates under the Master License of Gaming Services Provider, N.V. #365/JAZ as an Information Service Provider. Winfinity N.V.’s registration number is 156346 and its registered address is Abraham de Veerstraat 9, Curaçao.</p>

                            <iframe src="https://licensing.gaming-curacao.com/validator/?lh=3a84155f3027a434172149ba09f2bce5&template=seal" style={{'width':'150px','height':'50px','border':'none','marginLeft':'20px'}}/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
