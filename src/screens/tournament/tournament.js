import React, {useEffect,useState} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";

import {Footer, Header} from "../../components";

import {useTranslation} from "../../core";
import {useHistory, useParams} from "react-router-dom";
import {UseEvent} from "../../core/hooks/useEvent";
import {useUser} from "../../core/hooks/useUser"
import './tournament.css'

const Tournament = () =>{
    const {User} = useUser()
    const {t} = useTranslation()
    const nav = useNavigation();
    const {page,tourId} =useParams()
    const ev = UseEvent()
    const [frameHeight, setFrameHeight] = useState('100px');
    const [header, setHeader] = useState(true);
    const [footer, setFooter] = useState(true);
    const {i18n} = useTranslation()
    const {lang} = useParams()
    const [url,setUrl] = useState(`/tournaments/`)
    const history = useHistory()
    const [frameScroll, setFrameScroll] = useState('yes')

    useEffect(()=>{
        if(!window.setHeader){
            window.setHeader = function (param){
                setHeader(param)
            }
        }
        if(!window.setFooter){
            window.setFooter = function (param){
                setFooter(param)
            }
        }
        if(!window.setHeight){
            window.setHeight = function (height){
                setFrameHeight(height)
            }
        }
        if(!window.depositModal){
            window.depositModal = function (){
                User.isLogged? ev.emit('depositModal', true) : ev.emit('signUp',true)
            }
        }
        if(!window.getLang){
            window.getLang = function (){
                return i18n.language
            }
        }
        if(!window.redirect){
            window.redirect = function (url){
                history.push(`/${lang}/tournament${url}`)
            }
        }
        if(!window.frameScroll){
            window.frameScroll = function (ev){
                setFrameScroll(ev)
            }
        }

        return ()=>{
            if(window.setHeader){delete  window.setHeader}
            if(window.setFooter){delete  window.setFooter}
            if(window.setHeight){delete  window.setHeight}
            if(window.depositModal){delete  window.depositModal}
            if(window.getLang) {delete window.getLang}
            if(window.redirect){delete  window.redirect}
            if(window.frameScroll){delete  window.frameScroll}
        }
    },[])


    useEffect(()=>{
        if(window.location.href.indexOf('zur.planetaxbet') !== -1){
            setUrl(`https://slotmaster.com/tournaments${page? '/'+page :''}${tourId? '/'+tourId :''}`)
        }else{
            setUrl(`/tournaments${page? '/'+page :''}${tourId? '/'+tourId :''}`)
        }
    },[page,tourId,lang,i18n.language])

    return (
        <>
            {
                header? <Header page={"promo"}/>:''
            }

            <div className={"tournament"}>
                <iframe
                    //ref={ref}
                    scrolling={frameScroll}
                    src={url}
                    frameBorder="0"
                    className={"promotion-frame"}
                    width="100%"
                    height="auto"
                />
            </div>

            {
                //footer? <Footer style={{marginTop:0}}/>:''
            }

        </>
    )
}

export default Tournament
