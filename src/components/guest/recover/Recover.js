import {PLXModal, SvgDot} from "../../index";
import {useEffect, useState} from "react";
import EventEmitter from "../../../core/utils/eventEmitter";
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {useOTP} from "../../../core/hooks/useOTP";
import './Recover.scss';
import SelectBox from "../../forms/select/NewSelect";
import {UseEvent} from "../../../core/hooks/useEvent";


const Recover = () =>{
    const {otp, PHONE,EMAIL,CLOSE,ERROR} = useOTP();

    const {t} = useTranslation()
    const [type,setType] = useState(null)
    const eventEmitter = new EventEmitter();
    const ev = UseEvent()
    const [prLoader,setPrLoader] = useState(false);
    const [form,setForm] = useState({
        channel:'mobile',
        token:'',
        username:'',
        prefix:'',
        data:'',
        newPassword:false,
        pass1:'',
        pass2:''
    })
    const [mobileCode,setMobileCode]=useState([])
    const [error, setError] = useState(null);

    const getMobileCodeList = ()=> {
        Actions.User.getMobileCodeList().then(response=>{
            if(response.status){
                setMobileCode(_.map(response.data, (v,k)=> {
                    return _.map(v,(val) => {return {id:val.code,title:val.title,code:val.iso3} })
                })[0])
            }
        })
    }

    useEffect(()=>{
        eventEmitter.on("recover",setType)
        return ()=>eventEmitter.removeListener("recover",e=>setType(null))
    },[])

    useEffect(()=>{
        if(type !== null && mobileCode.length === 0){
            getMobileCodeList();
        }
    },[type]);

    const sendData =()=>{
        setPrLoader(true)
        if (type === 'Username'){
            window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'recoverUsername'}).then(async(token)=> {
                let params = {
                    channel:form.channel,
                    token:token,
                    data:form.data
                };
                if(form.channel ==="mobile"){
                    params["prefix"]=form.prefix;
                }

                Actions.User.recoverUserName(params).then(response=>{
                    if(response.status){
                        ev.emit('notify', {
                            show:true,
                            text:form.channel === 'mobile'?t('If your phone number is in our database, You will receive a text message with password recovery instructions.'):t('If your email is in our database, You will receive an email with password recovery instructions.'),
                            type:'success',
                            title:t('Recover Username')
                        })
                        setType(null);
                        setPrLoader(false)
                        //eventEmitter.emit('withdrawModal',false);
                        //window.pushEvent(`username გადმოგზავნილია`,'success');
                    }
                }).catch(reason => {
                    ev.emit('notify', {
                        show:true,
                        text:form.channel === 'mobile'?t('If your phone number is in our database, You will receive a text message with password recovery instructions.'):t('If your email is in our database, You will receive an email with password recovery instructions.'),
                        type:'error',
                        title:t('Recover Username')
                    })
                    setPrLoader(false)
                })
            });
        }else{
            window.grecaptcha.execute('6LcsE_IdAAAAAElaP_6dOnfzTJD2irfkvp1wzIeS', {action: 'recoverPassword'}).then(async(token)=> {

                let params = {
                    channel:form.channel,
                    token:token,
                    data:form.data,
                    username:form.username
                };
                if(form.channel ==="mobile"){
                    params["prefix"]=form.prefix;
                }

                Actions.User.recoverPassword(params).then(response=>{
                setType(null)
                    ev.emit('notify', {
                        show:true,
                        text:form.channel === 'mobile'?t('If your phone number is in our database, You will receive a text message with password recovery instructions.'):t('If your email is in our database, You will receive an email with password recovery instructions.'),
                        type:'success',
                        title:t('Recover Password')
                    })
                    setPrLoader(false)
                }).catch(reason =>{
                    ev.emit('notify', {
                        show:true,
                        text:t('An error occurred'),
                        type:'error',
                        title:t('Recover Password')
                    })
                    setPrLoader(false)
                })
            });
        }
    }



    return type !==null && (
        <PLXModal
            title={t(`Forgot ${type}`)}
            //onClickBackDrop={e=>setType(null)}
            onClose={e=>setType(null)}
            contentStyle={{maxWidth:'350px'}}
            dialogStyle={{maxWidth:'350px'}}
        >

            <form onSubmit={(event)=>{
                event.preventDefault();
                sendData()
            }} className="form recover-password">
                <div className="row">


                    <div className="col-12">
                        <div className={`select-label-border`}>
                            <select onChange={(e)=> setForm({...form, channel:e.target.value})}  value={form?.channel} className="select2" placeholder="Type" id="channel">
                                <option value={""}>{t("Choose Type")} </option>
                                {
                                    _.map([{id:'email',value:"Email"},{id:'mobile',value:"Phone"}],  (v,k)=> <option key={k} value={v.id}> {v.value}</option>)
                                }
                            </select>
                            <label htmlFor="channel">{t("Type")}</label>
                        </div>
                    </div>

                    {
                        form.channel === 'email'?(
                                <div className="col-12">
                                    <div  className={`new-input-label`}>
                                        <input onChange={e => setForm({...form,data:e.target.value})} value={form.data} type="text" name="email" id="data-email"/>
                                        <label htmlFor="data-email">{form.channel === 'email' ? t("Email"):t("Phone")}</label>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="col-12">
                                    <div style={{display:'flex',width:"100%"}}>
                                        <div style={{width:"100px",marginRight: '10px'}}>
                                            <SelectBox
                                                search={true}
                                                id="prefix"
                                                data={mobileCode}
                                                value={form.prefix}
                                                placeholder={t("Prefix")}
                                                //plData={''} plName={t("Choose Sex")}
                                                onSelect={(e)=> setForm({...form,prefix:e.id})}
                                            />
                                        </div>
                                        <div className={`new-input-label`} style={{flex:1,position: "relative"}}>
                                            <input
                                                type="number"
                                                name="mobile"
                                                id="mobile"
                                                value={form.data}
                                                onChange={e => setForm({...form,data:e.target.value})}
                                            />
                                            <label htmlFor="phone">{t("Phone")}</label>
                                            {/*{
                                                infoData?.mobileConfirmed===1?<span className="confirmed">{t("Confirmed")}</span>:
                                                    <button
                                                        type="button"
                                                        className="btn-confirm"
                                                        onClick={()=>{
                                                            if(infoData.mobile.trim().length>0){
                                                                PHONE({
                                                                    prefix:infoData.mobilePrefix,
                                                                    number:infoData.mobile,
                                                                    send:"/os/v1/api/secured/otp/profile-verification-mobile",
                                                                    verify:"/os/v1/api/secured/otp/profile-verification-mobile",
                                                                    save:e=>{
                                                                        if(e){
                                                                            setInfoData({...infoData,mobileConfirmed:1});
                                                                            window.pushEvent(t("The operation was performed successfully"),"success");
                                                                            CLOSE();
                                                                        }

                                                                    }
                                                                })
                                                            }
                                                        }}
                                                    >
                                                        {t("Confirm")}
                                                    </button>
                                            }*/}
                                        </div>
                                    </div>
                                </div>
                                /*<div className="col-12">
                                    <div className={`new-input-label`}  >
                                        <div style={{display:'flex',width:"100%"}}>
                                            <div className="input-label" style={{width:"100px"}}>
                                                <select className="select2" id="Prefix" placeholder="Code"
                                                        value={form.prefix}
                                                        onChange={event => setForm({...form,prefix:event.target.value})}
                                                >
                                                    {
                                                        _.map(MobilePrefixList, (v,k)=><option key={k} value={v.id}>{v.prefix}</option>)
                                                    }
                                                </select>
                                                <label htmlFor="Prefix">{t("Prefix")}</label>
                                            </div>
                                            <div   style={{flex:1,position: "relative"}}>
                                                <input
                                                    type="number"
                                                    name="phone"
                                                    id="phone"
                                                    className="for-confirm"
                                                    value={form.data}
                                                    onChange={e => setForm({...form,data:e.target.value})}
                                                />
                                                <label htmlFor="phone">{t("Phone")}</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>*/


                            )


                    }

                    {
                        type === 'Password' && (
                            <div className="col-12">
                                <div  className={`new-input-label`}>
                                    <input onChange={e => setForm({...form,username:e.target.value})} value={form.username} type="text" name="username" id="data-username"/>
                                    <label htmlFor="data-username">{t("Username")}</label>
                                </div>
                            </div>
                        )
                    }

                </div>

                {
                    error && <div className="login_error" style={{color:'#ff7e7e'}}>{error}</div>
                }


                <button type="submit" className="btn-primary" style={{position:'relative',overflow:'hidden'}} >
                    {prLoader && <SvgDot contentStyle={{background:'#ffcb39'}}/> }
                    {t("Submit")}
                </button>


                {/*<button type="submit" className="btn-primary">{t("Submit")}</button>*/}
            </form>

        </PLXModal>
    )
}
export default Recover;
