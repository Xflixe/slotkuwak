import React, {useEffect,useState} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";

import {Footer, Header} from "../../components";

import {useTranslation} from "../../core";
import {useParams} from "react-router-dom";
import {UseEvent} from "../../core/hooks/useEvent";
import {useUser} from "../../core/hooks/useUser"
import './tournament.css'

const Tournament = () =>{
    const {User} = useUser()
    const {t} = useTranslation()
    const nav = useNavigation();
    const {page} =useParams()
    const ev = UseEvent()
    const [frameHeight, setFrameHeight] = useState('100px');
    const [header, setHeader] = useState(true);
    const [footer, setFooter] = useState(true);
    const {i18n} = useTranslation()
    const {lang} = useParams()
    const [url,setUrl] = useState(`/tournaments/?${Math.random()}`)

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


        return ()=>{
            if(window.setHeader){
                delete  window.setHeader
            }
            if(window.setFooter){
                delete  window.setFooter
            }
            if(window.setHeight){
                delete  window.setHeight
            }
            if(window.depositModal){
                delete  window.depositModal
            }
            if(window.getLang){
                delete  window.getLang
            }
        }
    },[])

    useEffect(()=>{
        setUrl(`/tournaments/?${Math.random()}`)
        //setUrl(`/promos/${page}/index_${i18n.language}.html?${Math.random()}`)
        //console.log(lang,i18n.language)
    },[lang,i18n.language])

    return (
        <>
            {
                header? <Header page={"promo"}/>:''
            }

            <div className={"tournament"}>
                <iframe
                    //ref={ref}
                    scrolling="yes"
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
