import React, {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useUser} from "../../core/hooks/useUser";
import {Actions, useTranslation} from "../../core";
import _ from 'lodash'
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {UseEvent} from "../../core/hooks/useEvent";
import {useNavigation} from "../../core/hooks/useNavigation";
export const SportMobileView=()=>{
    const nav = useNavigation();
    const [view,setView]=useState(nav.get("betHistory") !==null?'BetsHistory':"Home")
    const {i18n} = useTranslation()
    const {User} = useUser();
    const {lang} = useParams()
    const ev = UseEvent();
    const dispatch = useDispatch();
    const SportLogin=(event)=>{
        ev.emit('signIn',true)
    }
    const balanceChangeHandler=(event)=>{
        dispatch(Actions.User.ping())
    }
    const [params]=useState({
        "server":["www.planetaxbet.com","planetaxbet.com"].indexOf(window.location.hostname)>-1?"https://sport.planetaxbet.com/":"https://sport.staging.planetaxbet.com/",
        "containerId":"application-container",
        "token":"-",
        "currentPage":view,
        "defaultLanguage":lang,
        "timeZone":4,
        "hasRouterDisabled":false,
        "loginTrigger": SportLogin,
        "sportsBookView":"europeanView",
        "fixedHeight":true,
        "clearSiteStyles":false,
        "onUniqueIdChange":(uuid)=>console.log(uuid),
        "onBalanceChange":balanceChangeHandler,
        "currency":"EUR",
        "events":{
            onAppMount:()=>console.log("app Mount"),
            onAppUnmount:()=>console.log("app unmount"),
        }

    })
    const getToken=()=>{
        return  Actions.Sport.token()
    }
    const response = useMemo(async () => await getToken(), []);
    const loadFrame=(parameters)=>{
        window.Bootstrapper.boot(parameters, { name: "Mobile" });
    }
    useLayoutEffect( () => {
        if (User.isLogged) {
            response.then(res=>{
                if(res.status){
                    loadFrame({...params,token:res.data.data.token})
                }else {
                   loadFrame(params)
                }
            })
        }else{
            loadFrame(params)
        }
        i18n.on('languageChanged', function(lng) {
            window.location.reload()
        })
        return () =>{
            i18n.off("languageChanged")
        }
    },[])
    return <div id="application-container">
        <div className="loader" style={{marginTop:'calc(100% * 0.5)'}}>
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
        </div>
    </div>
}
