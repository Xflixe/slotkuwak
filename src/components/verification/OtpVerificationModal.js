import {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../core";
import PropTypes from "prop-types";
import PLXModal from "../modal/PLXModal";
import {NewModal, SvgDot} from "../index";
import {UseEvent} from "../../core/hooks/useEvent";
import _ from "lodash";
import Select from "../forms/select/Select";
import SelectBox from "../forms/select/NewSelect";

window.reSendInterval=null;
export const OtpVerificationModal = ({err,send,save,verify,onClose,additionalParams,title})=>{
    const {t} = useTranslation();
    const ev = UseEvent();
    const [selectedSource,setSelectedSource]=useState(null);
    const [sourceId,setSourceId]=useState(null)
    const [otpSources,setOtpSources]=useState([])
    const [error,setError]=useState("")
    let [reSend,setReSend]=useState(-1)
    const  [code,setCode]=useState("")
    const [loader,setLoader]=useState(false)
    const [codeRequest,setCodeRequest] = useState(false);
    const [showError,setShowError] = useState(false);

    useEffect(()=>{
        setError(err)
    },[err])

    useEffect(()=>{
        getOtpSources()
       const otpLoader = ev.subscribe('verifyOtp',setLoader)
        return ()=> {
            otpLoader.unsubscribe()
        }
        //return ()=>{eventEmitter.removeListener("recover",e=>setShow(false))}
    },[]);

    useEffect(()=>{
        if(sourceId){
            onResend()
        }
    },[sourceId])

    const getOtpSources = () =>{
        Actions.Otp.sources().then(response=>{
            if(response && response.length > 0){
                let find =response.length===1?response[0]:_.find(response,v=>v.preferred);
                if(find){
                    setSourceId(find.id);
                    setSelectedSource(find);
                }
                setOtpSources(response);

            }else{
                setShowError(true);
            }
        })
    }
    const onResend =()=>{
        Actions.User.resendOtp({
            permitAll:false,
            send:send.concat("/"+sourceId+"?"),
            type:"multi",
            sourceId:sourceId,
            additionalParams:additionalParams,
            loader:setLoader
        })
            .then(response=>{
                if(response.status){
                    setCode("");
                    setReSend(response.data.data.remaining);
                    setCodeRequest(true);
                }else {
                    setError('error');
                    setCodeRequest(false);
                }
            })
    }
    const onVerify =()=>{
        if(code){
            Actions.User.verifyOtp({
                verify:verify.concat("?type={type}&prefix={prefix}&value={value}&otp={otp}"),
                type:"multi",
                sourceId:sourceId,
                otp:code,
                additionalParams:additionalParams,
                loader:setLoader
            })
                .then(response=>{
                    if(response.status){
                        save(true);
                        setError('')
                    }else {
                        setError(t('error'))
                        save(false)
                    }

                })
        }else{
            setError(t("Please check field"))
        }

    }
    useEffect(()=>{
        if(reSend===-1){
            if(window.reSendInterval){
                clearInterval(window.reSendInterval)
                window.reSendInterval=null
            }
        }else{
            if(!window.reSendInterval){
                window.reSendInterval = setInterval(()=>{
                    setReSend(--reSend)

                },1000)
            }
        }
        setCodeRequest(true);
    },[reSend])

    return (
        <NewModal title={(t(title)).concat(' ',(selectedSource?.type === 'email'? t('via Email'): t('via Phone')))}
                  onClose={()=>onClose()}
                  contentStyle={{maxWidth:'500px'}}>
            <form onSubmit={e=>{
                e.preventDefault();
                if(!sourceId){
                    onClose();
                    return;
                }
                if(code.length !== 4){
                    ev.emit('notify', {show:true, text: t('Please Request SMS Code'), type:'error', title:t('Error')})
                    //window.pushEvent(t('Please Request SMS Code'),'error');
                    return;
                }
                if(!code){
                    ev.emit('notify', {show:true, text: t('Incorrect sms code'), type:'error', title:t('Error')})
                    //window.pushEvent(t("Incorrect sms code"),"error");
                }else{
                    setCodeRequest(false);
                    if(verify){
                        onVerify()
                    }else{
                        save({code:code,sourceId:sourceId})
                    }
                }
            }} className="confirm-form">


                {
                    showError && <div style={{color: '#ff4646',paddingTop: '20px'}}>{t("Error was reported. Contact the hotline")}</div>
                }
                {
                    otpSources.length !== 0 ? (
                        <div style={{marginTop:"20px"}}>
                            <SelectBox
                                placeholder={t("Select verification method")}
                                id="otp"
                                data={_.map(otpSources,v=>{
                                    return {
                                        id:v.id,
                                        title:v.value,
                                        type:v.type
                                    }
                                })}
                                onSelect={(e)=>{
                                    setSourceId(e.id);
                                    setSelectedSource(e);
                                }}
                                value={sourceId}
                            />
                        </div>
                    ) : ''
                }
                {
                   sourceId? <div>
                       <p className="confirm-text">
                           {t("A 4-digit code was sent to")}:<span className="phone-num">{selectedSource?.type === 'email'? ' Email':" Phone "}</span>. {t("Please enter the code in the field below to confirm")}:
                       </p>
                       <div className="input-label-border">
                           <input type="text" name="code" id="code" value={code} onChange={e=>setCode(e.target.value)} className="for-confirm"/>
                           <label htmlFor="code">{selectedSource?.type === 'email' ? t("Email Code") : t("SMS Code") }</label>
                           {
                               reSend!==-1? <span className="timeout">{reSend}</span>: <button type="button" className="btn-confirm" onClick={()=>onResend()}>{t("Send")}</button>
                           }
                       </div>
                       <p style={{color:"red"}}>{error}</p>
                       <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden'}}>
                           {loader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                           {t("Confirm")}
                       </button>
                   </div>:<div>
                       <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden'}}>{t("close")}</button>
                   </div>
                }

            </form>
        </NewModal>
    )

}
OtpVerificationModal.propTypes = {
    type:PropTypes.string,
    title:PropTypes.string,
    err:PropTypes.string,
    onSubmit:PropTypes.func,
    send:PropTypes.string,
    save:PropTypes.func,
    additionalParams:PropTypes.object
}
OtpVerificationModal.defaultValues = {
    title:"Otp Verification",
    type:"multi",
    err:"",
    onSubmit:(_)=>{},
    save:(_)=>{},
    send:"",
    additionalParams:{}
}
