import {useDispatch, useSelector} from "react-redux";
import {SIGN_IN} from "../store/actionTypes";
import {Actions, useTranslation} from "../index";
import {useUser} from "./useUser";
import {useLoader} from "./useLoader";

export function useSLot() {
    const User = useUser();
    const {setLoader} = useLoader()
    const {t,i18n} = useTranslation()
    const play=(slot)=>{

        if(!User.User.isLogged){
            document.getElementById("signIn-btn").click();
            return;
        }
        setLoader(slot.gameId)
        Actions.Slot.play(slot).then(response=>{
            if(response.status && response.data.data.result===0){
                let win;
                if(response.data.data?.type ===null){
                    response.data.data.type = "url";
                }

                switch (response.data?.data?.type.toLowerCase()){
                    case "html":
                        win = window.open(`/${i18n.language}/playSlot`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                        win.document.write(response.data.data.url.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                        `))

                        return ;
                    case 'sg_html':
                        win = window.open(`/${i18n.language}/playSlot`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")

                        win.document.write(response.data.data.html.concat(`
                            <style>
                             html,body {
                                padding: 0 !important;
                                margin:0 !important;
                             }
                             </style>
                        `).concat(`<script>${response.data.data.script}</script>`))
                        break;
                    default:
                        console.log(response.data.data.url)
                        window.open(`/${i18n.language}/playSlot?uri=${response.data.data.url}`,"_blank","toolbar=yes,scrollbars=yes,resizable=yes,width=1070,height=630")
                    break


                }
            }else{
                alert("Error")
            }
            setLoader(null)
        }).catch(reason => setLoader(null))

    }

    return  {play}
}
