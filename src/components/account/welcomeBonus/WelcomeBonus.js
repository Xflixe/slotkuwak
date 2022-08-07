import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import PLXModal from "../../modal/PLXModal";
import {Balance, NewModal, SvgDot} from "../../index";

import {useOTP} from "../../../core/hooks/useOTP";
import _ from "lodash";
import {arrowLeftBack, coinspaid, percent, time} from "../../../assets/img/icons/icons";
import './welcomeBonus.scss';
import {QRCode} from "react-qrcode-logo";
import {logoM_jpg} from "../../../assets/img/images";
import SelectBox from "../../forms/select/NewSelect";
import {UseEvent} from "../../../core/hooks/useEvent";
import moment from "moment";



const WelcomeBonus = ({onClose})=>{
    const {i18n,t} = useTranslation();
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [withdraw,setWithdraw]=useState({amount:'', address:""});
    const [crypto,setCrypto]=useState('');

    const [gift,setGift]=useState(1)
    const [loader,setLoader]=useState(false)
    const [errors,setErrors]=useState([])
    const ev = UseEvent()


    const choseGift = (param) => {
        setGift(param)
    }
    return (
        <div className="row welcome_bonus" style={{}}>
            {
                <NewModal title={t("Welcome Bonus")} onClose={()=>onClose(false)} contentStyle={{width:'870px'}} dialogStyle={{width:"870px"}}>
                    <div className="wb">
                        <p>Welcome to planetaX, have fun playing and enjoy wins, We offer you two types of bonus, feel free to <strong>select disired one.</strong></p>
                        <div className="gift-overflow">
                            <div className="grid-box">
                            <div className="grid-item item-1">
                                <h5>Deposit Bonus</h5>
                                <strong>Make deposit to start adventure</strong>
                                <ul>
                                    <li>Get +100% up to €500 on your <br/>1st deposit</li>
                                    <li>Get +150% up to €300 on your <br/>2nd deposit</li>
                                </ul>
                                <div className={`chose_box ${gift===1?'active':''}`} onClick={()=> choseGift(1)}>
                                    <p>Deposit Bonus</p>
                                    <div className="radio"/>
                                </div>
                            </div>
                            <div className="grid-item item-2">
                                <h5>Free Spins Bonus</h5>
                                <strong>Receive Free spins gift and start playing</strong>
                                <ul>
                                    <li>Get 20 free spins daily during <br/>6 days</li>
                                    <li>Login at least once to during <br/>6 days</li>
                                </ul>
                                <div className={`chose_box ${gift===2?'active':''}`} onClick={()=> choseGift(2)}>
                                    <p>Free Spins</p>
                                    <div className="radio"/>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="gift-info">
                            <div className="info">
                                <i/>
                                <p>If you close window without selecting welcome bonus type, Deposit Bonus (B Capital) will be activated automatically</p>
                            </div>
                            <div className="but">
                                <button className="skip">Skip</button>
                                <button className="claim">Claim Bonus</button>
                            </div>
                        </div>

                    </div>
                </NewModal>

            }
        </div>

    )

}
export default WelcomeBonus;
