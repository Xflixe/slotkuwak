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
import _ from "lodash";


const  App=()=> {

    const messageData = {"data":[{"id":23,"entryDate":"2022-08-19T05:55:42","title":null,"body":null,"type":"promocode","specifiers":{"gameId":"2510","quantity":"10","gameName":"Fruit Cocktail","providerName":"Igrosoft"}},{"id":24,"entryDate":"2022-08-19T06:43:16","title":null,"body":null,"type":"wager","specifiers":{}},{"id":25,"entryDate":"2022-08-19T06:43:16","title":null,"body":null,"type":"freespin","specifiers":{"gameId":"1767","quantity":"15","gameName":"Shining Lady","providerName":"NetGame"}}]}
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const event = UseEvent();
    const [loaded,setLoaded]=useState(false)
    const [restriction,setRestriction] = useState(null)
    const cookie = useCookie()
    const nav  = useNav();
    const user = useUser();
    const {User,signOut,checkSession} = useUser();
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
    const [message,setMessage]=useState({allData: []});

    const onMessageUpdate = ()=>{
        if(message?.allData?.[0]){
            setMessage({...message,
                msData:message?.allData?.[0],
                show:true
            })
        }
    }

    const removeUpdate = (closeId) => {
        let arr = message?.allData.filter((el)=> el.id !== closeId);
        let newArr = {
            ...message,
            allData:arr
        }

        setMessage({...newArr})

        console.log('message',message,closeId)
    }


    const messages = ()=>{
        clearTimeout(window.messageTimeout)
        Actions.User.messages().then(response=>{
            if(response.status){
                setMessage({...message,allData:response?.data?.data})
            }
        })

        if(!window.messageTimeout){
            window.messageTimeout = setTimeout(function(){
                messages()
            },1000 * 60)
        }

    }

    useEffect(()=>{
        if(User.isLogged){
            messages()
        }
    },[User.isLogged])

    useEffect(()=>{
        if(message?.allData?.[0]){
            onMessageUpdate()
        }
    },[message?.allData?.[0]])

    useEffect(()=>{
        const ping = async () => {
            setLoaded(await dispatch(Actions.User.ping()))
        }

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
        const message = event.subscribe("message",setMessage)

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
            message.unsubscribe()
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

            {message?.allData?.[0] && <PromoModal data={message?.allData?.[0]} onUpdate={(id)=>removeUpdate(id)} />}

        </>
    ))
}

export default App;
