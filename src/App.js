import { useEffect, useState} from 'react'

import {Actions, useTranslation} from "./core";
import {Guest, MainNavigator, PLAlert, Skeleton,} from "./components";
import {useDispatch} from "react-redux";
import OTP from "./components/verification";
import {useNav} from "./core/hooks/useNav";
import {useCookie} from "./core/hooks/useCookie";
import {UseEvent} from "./core/hooks/useEvent";
import {useUser} from "./core/hooks/useUser";
import EventEmitter from "./core/utils/eventEmitter";
import Deposit from "./components/account/deposit/Deposit";
import DepositModal from "./components/account/deposit/DepositModal";
import WithdrawModal from "./components/account/withdraw/WithdrawModal";
import WelcomeBonus from "./components/account/welcomeBonus/WelcomeBonus";
import PromoModal from "./components/account/promoModal/PromoModal";
import {Restricted} from "./components/restricted/Restricted"


const  App=()=> {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const event = UseEvent();
    const [loaded,setLoaded]=useState(false)
    const [restriction,setRestriction] = useState(null)
    const cookie = useCookie()
    const nav  = useNav();
    const user = useUser();
    const [depositModal,setDepositModal]=useState(false);
    const [withdrawModal,setWithdrawModal]=useState(false);
    const [welcomeBonus,setWelcomeBonus]=useState({
        showHide:false
    });
    const [showNotify,setShowNotify]=useState({
        show: false,
        text:'',
        type:'',
        title:''
    });
    const [promModal,setPromModal]=useState({
        show: false,
        type:'',
    });


    useEffect(()=>{
        const ping = async () => {
            setLoaded(await dispatch(Actions.User.ping()))
        }

        const notification = ()=>{
            Actions.User.notification().then(response=>{
                console.log('notification',response)
                if(response.status){
                    console.log('notification',response)
                }
            })
        }

        notification()

        Actions.User.checkRestriction().then(response=>{
            if(!response.status && response?.error ==="restricted"){
                setRestriction("restricted")
            }else{
                setRestriction("allowed")
            }
        }).catch(e=>setRestriction("allowed"))

        if(nav.get("cxd")){
            //აფილეიტები
            cookie.setCookie("cxd",nav.get("cxd"),14)
        }

        ping()

        const signInFormEvent= event.subscribe("notify",setShowNotify)
        const depositModal= event.subscribe("depositModal",setDepositModal)
        const withdrawModal= event.subscribe("withdrawModal",setWithdrawModal)
        const welcomeBonus= event.subscribe("welcomeBonus",setWelcomeBonus)

        //checkLanguage()
        const listener = event.subscribe("plxEvent",(e)=>{
            switch (e?.type) {
                case "signOut":
                    localStorage.clear()
                    user.signOut(()=>event.emit('signIn',true))
                    break;
                default: break;
            }
        })

        return ()=>{
            signInFormEvent.unsubscribe()
            depositModal.unsubscribe()
            withdrawModal.unsubscribe()
            listener.unsubscribe()
            welcomeBonus.unsubscribe()
        }
    },[])


    if(!loaded || restriction === null){
        return <Skeleton/>
    }
    return ((loaded && restriction === 'restricted') ? <Restricted/> : (<>

            <MainNavigator/>
            <Guest/>
            <OTP/>
            <div className="event-wrap"/>
            {welcomeBonus.showHide ? <WelcomeBonus data={welcomeBonus} onClose={() => setWelcomeBonus({...welcomeBonus,showHide:false})}/> : ''}
            {withdrawModal ? <WithdrawModal onClose={() => setWithdrawModal(false)}/> : ''}
            {depositModal ? <DepositModal onClose={() => setDepositModal(false)}/> : ''}

            {
                showNotify.show && <PLAlert data={showNotify} title={showNotify?.title}
                    onClose={() => setShowNotify({...showNotify, show: false})} footer={<button
                    onClick={() => setShowNotify({...showNotify, show: false})}>{t("Close")}</button>}>
                    <div className="alert_wrap" dangerouslySetInnerHTML={{__html: showNotify.text}}/>
                </PLAlert>
            }

            {promModal.show && <PromoModal onClose={() => setPromModal({...promModal, show: false})}/>}

        </>
    ))
}

export default App;
