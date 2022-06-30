
import {Actions, useTranslation} from "../index";
import {useUser} from "./useUser";
import {useLoader} from "./useLoader";
import EventEmitter from "../utils/eventEmitter";
import {UseEvent} from "./useEvent";

export function useSLot() {
    const User = useUser();
    const {setLoader} = useLoader()
    const {t,i18n} = useTranslation()
    const ev =UseEvent()
    const play=(slot)=>{
        if(!User.User.isLogged){
            ev.emit("signIn",true)
            return;
        }
        setLoader(slot.gameId);
        Actions.Slot.play({...slot,lang:i18n.language}).then(response=>{
            console.log('useSLot',response)
            if(response.status && response.data?.resultCode===0){
                let win;
                if(response.data.data?.type ===null){
                    response.data.data.type = "url";
                }
                switch (response.data?.data?.type.toLowerCase()){
                    case "html":
                            window.document.write(response.data.data.url.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                        `))

                        return ;
                    case 'sg_auth':
                       let data = response.data.data.url;
                        window.document.write(data.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                         `).concat(`<script>${data}</script>`))
                        break;
                    case 'sg_html':
                        window.document.write(response.data.data.html.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                         `).concat(`<script>${response.data.data.script}</script>`))



                        break;
                    default:
                        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                        console.log(slot,isMobile)
                        if(isMobile && slot?.gameType==="casino" ) {
                            setTimeout(()=>{
                                window.location.href=response.data.data.url
                            },10)
                            return;
                        }

                        //console.log(response.data.data.url)
                        document.getElementById("stickFooter").style.display="none"
                       document.getElementById("slot-frame").setAttribute("src",(response.data.data.url))
                        //window.open(`/${i18n.language}/playSlot?uri=${encodeURIComponent(response.data.data.url)}`,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                    break
                }
            }else{
                console.log('notify',response)
                if(response.data?.resultCode === 202){
                    if(response.data?.message){
                         if(response?.data?.message.indexOf("404")>-1){
                             ev.emit('notify', {
                                 show:true,
                                 text: "Connection error :(  Please try in a few minutes.",
                                 type:'error',
                                 title:'Error'
                             })
                         }
                    }else{
                        ev.emit('notify', {
                            show:true,
                            text: "Sorry, game is not currently available in your country? Please see restricted country list <a href='https://planetaxbet.com/en/terms/6/661'>here</a>",
                            type:'error',
                            title:'Error'
                        })
                    }
                }else{
                    ev.emit('notify', {
                        show:true,
                        text: JSON.stringify(response?.data),
                        type:'error',
                        title:'Error'
                    })
                }

            }
        })
        .finally(()=>setLoader(null))
    }

    return  {play}
}
