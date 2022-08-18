import React, {useState} from "react";
import {Balance, ContentNavigator, Footer, Header, Information, SvgDot} from "../../components";
import {Actions, useTranslation} from "../../core";
import {discord, gr,
    evolutionGaming,
    relax,
    pragmatic,
    playngo,
    isoftbet,
    kiron,
    wazdan,
} from "../../assets/img/icons/icons";
import "./contactSecreen.scss";
import SelectBox from "../../components/forms/select/NewSelect";
import _ from "lodash";
import {useCookie} from "../../core/hooks/useCookie";

const subject = [
    {
        name:'Media Inquires',
        id:'1'
    },
    {
        name:'Report a Bug',
        id:'2'
    },
    {
        name:'Other',
        id:'3'
    }

]
const ContactScreen = ()=>{
    const {t,i18n} = useTranslation();
    const cookie = useCookie();
    const [data,setData] = useState({
        name:'',
        mail:'',
        subject:'',
        message:'',
    })
    const [loader,setLoader]=useState(false)
    const [errors,setErrors]=useState([]);

    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }

    const sendMessage=()=> {
        setErrors([]);
        window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'supportTicket'}).then(async(token)=> {
            let error = _.chain(data)
                .map((v,k)=>{
                    return  {key:k,value:v}
                })
                .filter(v=>!v.value)
                .map(v=>v.key).value();

            if(error.length>0){
                setErrors([...error])
            }else{

                let dat = {...data,token:token}
                if(cookie.getCookie("cxd")){
                    dat = {...dat,cxd:cookie.getCookie("cxd")}
                }

                Actions.User.sendMessage({loader:setLoader,data:dat}).then((response)=>{

                    if(response.status){
                        setData({name:'', mail:'', subject:'1', message:'',})
                        window.pushEvent(t('Your Message Was Sent'),'success')
                    }


                })
            }

        });

    }

    return <>
    <Header page={"contact"}/>
        <main className="page">
            <div className="container">
                <div className="page-wrapper contact">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="page-headline">{t('Support')}</div>
                            <p style={{color:'#8F9EC8'}}>For all customer support issues contact us through e-mail or Live Chat</p>
                            <div className="support-box">
                                <a className="item" data-soc="email" href="mailto:support@planetaxbet.com">
                                    <ul>
                                        <li>Email</li>
                                        <li>support@planetaxbet.com</li>
                                    </ul>
                                </a>
                                <div className="item" data-soc="chat" onClick={()=>{
                                    window.zE('messenger', 'open');
                                    window.ZEChatAction('open');
                                }}>
                                    <ul>
                                        <li>Chat</li>
                                        <li>Write a Message</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="soc-box item-list desctop-wers">
                                <p style={{color:'#8F9EC8'}}>For live updates & news please follow official links</p>
                                <div className="item-list">
                                    <a href="https://t.me/planetaxbet"  target="_blank" className="item" data-soc="telegram"/>
                                    <a href="https://twitter.com/PXbet" target="_blank" className="item" data-soc="twitter"/>
                                    <a href="https://www.facebook.com/Planetaxbet"  target="_blank" className="item" data-soc="facebook"/>
                                    <a href="https://discord.gg/sbjFXbbcBK" target="_blank" className="item" data-soc="discord"/>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-6 rightSide">
                            <div className="page-headline">{t('Contact Us')}</div>
                            <p style={{color:'#8F9EC8'}}>please choose related subject and submit a form</p>
                            <div className="form-box">
                                <div className="col-12">
                                    <div className={`input-label-border ${error("name")}`}>
                                        <input onChange={e => setData({...data,name:e.target.value})} value={data.name} type="text" name="name" id="name"/>
                                        <label htmlFor="name">{t("Name")}</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={`input-label-border ${error("email")}`}>
                                        <input onChange={e => setData({...data,mail:e.target.value})} value={data.mail} type="email" name="email" id="email"/>
                                        <label htmlFor="email">{t("E-mail")}</label>
                                    </div>
                                </div>
                                <div  className={`input-select-border col-12 `}>
                                    <SelectBox
                                        id={"subject"}
                                        search={false}
                                        data={subject}
                                        value={data.subject}
                                        disabled={true}
                                        placeholder={t("Select Subject")}
                                        onSelect={(e)=> setData({...data,subject:e.id})}
                                        className={`${error("subject")}`}
                                    />
                                </div>
                                <div  className={`input-select-border col-12 `}>
                                    <textarea id="textarea"
                                              onChange={e => {
                                                  setData({...data,message:e.target.value})
                                              }}
                                              placeholder="Write your message here…"
                                              className={`${error("text")}`}
                                    />
                                </div>
                                <div  className={`input-select-border col-12`}>
                                    <button type="submit" style={{width:'190px',position:'relative',overflow:'hidden'}} className="btn-primary" onClick={()=>{
                                        sendMessage()
                                    }}>
                                        {loader && <div className="loader-wrap"><SvgDot contentStyle={{backgroundColor: '#ffbc00'}}/></div>}
                                        {t("Send Message")}
                                    </button>
                                </div>
                                <div className="soc-box item-list mob-wers">
                                    <p style={{color:'#8F9EC8'}}>For live updates & news please follow official links</p>
                                    <div className="item-list">
                                        <a href="https://t.me/planetaxbet"  target="_blank" className="item" data-soc="telegram"/>
                                        <a href="https://twitter.com/PXbet" target="_blank" className="item" data-soc="twitter"/>
                                        <a href="https://www.facebook.com/Planetaxbet"  target="_blank" className="item" data-soc="facebook"/>
                                        <a href="https://discord.gg/sbjFXbbcBK" target="_blank" className="item" data-soc="discord"/>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </>
}
export default ContactScreen;

/*
<div className="row">
    {/!*<div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/uk-flag.png").default} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">{t("Phone")}</div>
                                                <a href="tel:0-800-210-410" className="contact-type">0-800-210-410</a>
                                            </div>
                                    </div>
                                </div>*!/}
    {/!*<div className="col-12 col-md-6 col-lg-4">
                                    <a href="https://discord.gg/sbjFXbbcBK" target="_blank" className="contact-type">
                                    <div className="d-flex align-items-center contact-item">

                                        <img src={discord} alt="" className="discord"/>
                                        <div className="d-flex flex-column">
                                            <div className="contact-type-title">{t("Discord")}</div>
                                            <a href="https://discord.gg/sbjFXbbcBK" target="_blank" className="contact-type">PlanetaXbet</a>
                                        </div>

                                    </div>
                                    </a>
                                </div>*!/}
    <div className="col-12 col-md-6 col-lg-4">
        <div className="d-flex align-items-center contact-item">
            <img src={require("../../assets/flags/email.png")} alt=""/>
            <div className="d-flex flex-column">
                <div className="contact-type-title">{t("Email")}</div>
                <a href="mailto:support@planetaxbet.com"
                   className="contact-type">support@planetaxbet.com</a>
            </div>
        </div>
    </div>
    {/!*<div className="col-12 col-md-6 col-lg-4">
                                    <div className="d-flex align-items-center contact-item">
                                        <img src={require("../../assets/flags/telegram.png")} alt=""/>
                                            <div className="d-flex flex-column">
                                                <div className="contact-type-title">{t("Telegram")}</div>
                                                <a href="mailto:support@planetaxbet.com" target="_blank"
                                                   className="contact-type">@HelpPlanetaXbet</a>
                                            </div>
                                    </div>
                                </div>*!/}
    <div className="col-12 col-md-6 col-lg-4">
        <div className="d-flex align-items-center contact-item" onClick={()=>{
            window.zE('messenger', 'open');
            window.ZEChatAction('open');
        }}>
            <img src={require("../../assets/flags/chat.png")} alt=""/>
            <div className="d-flex flex-column">
                <div className="contact-type-title" style={{margin:'0'}}>{t("Live Chat")}</div>
                {/!*<a href="https://direct.lc.chat/14154144/" target="_blank" ><div className="contact-type underline">{t("Write a Message")}</div></a>*!/}
            </div>
        </div>
    </div>
</div>*/
