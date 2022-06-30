import React from 'react';
import {Link, useParams} from "react-router-dom";
import {
    stickHome,
    stickDeposit,
    stickWithdraw,
    stickAccount
} from '../../../assets/img/icons/icons';

import './stickFooter.scss';
import {useUser} from "../../../core/hooks/useUser";
import {useTranslation} from "../../../core";
import {UseEvent} from "../../../core/hooks/useEvent";

const StickFooter = () =>{
    const lang = 'en';
    const {User,checkSession} = useUser();
    const {t,i18n} = useTranslation();
    const ev = UseEvent();

    return (
        <>
            {
                User.isLogged && <ul className="stickFooter" id="stickFooter">
                    <li>
                        <Link to={`/${lang}/main`}>
                            <i><img src={stickHome} alt=""/></i>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <div onClick={()=>{
                            checkSession().then(response=>{
                                if(response){
                                    ev.emit('depositModal', true)
                                }
                            })
                        }}>
                            <i><img src={stickDeposit} alt=""/></i>
                            <span>Deposit</span>
                        </div>
                    </li>
                    <li>
                        <div onClick={()=>{
                            checkSession().then(response=>{
                                console.log(response)
                                if(response.status){

                                    if(response?.data?.data?.verifyStatus===0){
                                        ev.emit('withdrawModal', true)
                                    }else{
                                        ev.emit('notify', {
                                            show:true,
                                            text:'Oops, Unfortunately you can not withdraw money. Please verify your profile first.',
                                            type:'error',
                                            title:'Withdraw',
                                            button:{
                                                name:'Verify Account',
                                                url: `/${i18n.language}/account/verification`
                                            }
                                        })
                                    }
                                }
                            })
                        }}>
                            <i><img src={stickWithdraw} alt=""/></i>
                            <span>Withdraw</span>
                        </div>
                    </li>
                    <li>
                        <Link to={`/${lang}/account`}>
                            <i><img src={stickAccount} alt=""/></i>
                            <span>Account</span>
                        </Link>
                    </li>
                </ul>
            }
        </>
    )
}
export default StickFooter;
