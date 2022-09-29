import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {SvgDot, Verification} from "../../index";

import UploadDoc from "../uploadDoc/uploadDoc";
import {useOTP} from "../../../core/hooks/useOTP";
import Select from "../../forms/select/Select"
import SelectBox from "../../forms/select/NewSelect";
import {useHistory, useParams} from "react-router-dom";
import moment from "moment";
import {ERRORS} from "../../../core/utils/errors";
import {arrowLeftBack} from "../../../assets/img/icons/icons";
import {UseEvent} from "../../../core/hooks/useEvent";


const currency = [
    /*{  id:'USD',title:"US Dollar" },*/
    {  id:'EUR',title:"Euro" },
    /*{  id:'GEL',title:"Lari" },
    {  id:'RUB',title:"Russian Ruble" }*/
]


const passportType= {
    "ru": [
        {id: "id_card", title: "Удостоверения личности"},
        {id: "passport",title: "Паспорт"},
        {id: "resident_identification",title: "Вид на жительство"}
    ],
    "en": [
        {id: "id_card", title: "ID Card"},
        {id: "passport",title: "Passport"},
        {id: "resident_identification",title: "Residence Permit"}
    ]
}


const gender = {
    "ru": [
        {id:"F",title:"женский"},
        {id:"M",title:"Мужской"}
    ],
    "en": [
        {id:"F",title:"Female"},
        {id:"M",title:"Male"}
    ]
}

const Confirmation = () => {
    const {t,i18n} = useTranslation();
    const {lang} = useParams()
    const ev = UseEvent()
    const history = useHistory()
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        mobile:'',
        gender:'',
        dob:"",
        lastName:'',
        //username:'',
        //currency: "EUR",
        nationality:"",
        mobileConfirmed:0,
        emailConfirmed:0,
        mobilePrefix:"",
        requestId:''
    });
    const [rawInfo,setRawInfo] = useState(null)

    const [documents,setDocuments]=useState({
        "passportType":"",
        "docNumber":"",
        "country": "",
        "doc_expire_date":"MM-DD-YYYY",
        "front":"",
        "back":""
    })
    const [status]=useState({
        status:"",
        msg:""
    })
    const [errors,setErrors]=useState([])
    const [step,setStep]=useState(1)
    const [otpSource,setOtpSources]=useState(null)
    const [countries,setCountries]=useState([])
    const [mobileCode,setMobileCode]=useState([])
    const [loader,setLoader]=useState(false)
    const [inputLoader,setInputLoader]=useState(true)
    const [readOnly,setReadOnly]=useState(false)
    const [userVerificationStatus,setUserVerificationStatus]=useState(null)


    useEffect(()=>{
        getInfo(2);
        getVerificationInfo();
        getCountryList();
        getMobileCodeList();
    },[])

    const getCountryList = ()=> {
        Actions.User.getCountryList().then(response=>{
            if(response.status){
                setCountries(_.map(response.data, (v,k)=> {
                    return _.map(v,(val) => {return {title:val.name,id:val.iso3} })
                })[0]);
                setInputLoader(false);
            }
        })
    }

    const getMobileCodeList = ()=> {
        Actions.User.getMobileCodeList().then(response=>{
            if(response.status){
                //console.log('setMobileCode',mobileCode)
                setMobileCode(_.map(response.data, (v,k)=> {
                    return _.map(v,(val) => {return {id:val.code,title:val.title,code:val.iso3} })
                })[0])
            }
        })
    }

    const getInfo = (infoId)=>{
        Actions.User.info(infoId).then(response=>{
            if(response.status){
                setRawInfo(response?.data?.data)

                if (response?.data?.data?.verifyStatus === 0 || response?.data?.data?.verifyStatus === 2){
                    setReadOnly(true)
                }
                if (response?.data?.data?.userVerifyStatus === 2){setStep(2)}
                let res = response.data.data;
                setInfoData(_.fromPairs(_.map(infoData, (v,k)=> {
                    switch (k){
                        case "nationality":
                            return [k,res['country']];
                        default: return [k,res[k]];
                    }
                })))

                /*const {
                    firstName,
                    email,
                    mobile,
                    lastName,
                    username,
                    currency,
                    dob,
                    gender,
                    country,
                    mobileConfirmed,
                    emailConfirmed,
                    mobilePrefix
                }=response.data.data;
                setInfoData({
                    firstName:firstName,
                    email:email,
                    mobile:mobile,
                    lastName:lastName,
                    username:username,
                    currency: currency,
                    gender: gender,
                    dob:dob,
                    country:country,
                    mobileConfirmed:mobileConfirmed,
                    emailConfirmed:emailConfirmed,
                    mobilePrefix:mobilePrefix
                })*/
            }
        })
    }

    const getVerificationInfo = ()=>{
        Actions.User.getVerificationInfo().then(response=>{
            if(response.status){
                if(response?.data?.data){
                    if (response?.data?.data?.result === 1){
                        setReadOnly(true)
                    }
                    let res = response.data.data;
                    setInfoData(_.fromPairs(_.map(infoData, (v,k)=> {
                        switch (k){
                            default: return [k,res[k]];
                        }
                    })))
                }else{
                    getInfo();
                }
            }
        })
    }

    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }

    const nextStep = (smsCode='')=>{
        setErrors([])
        let error =  _.chain(infoData).map((v,k)=>{
            if(["mobileConfirmed","emailConfirmed","mobilePrefix","mobile","email","requestId"].indexOf(k) > -1){
                return {key:k,value:1}
            }
            if(k==="dob"){
                if(v){
                    let d = moment(new Date(v)).diff(moment(moment(new Date((new Date()).getFullYear()-18, (new Date()).getMonth(),  (new Date()).getDate())).format("MM-DD-YYYY")), 'days')
                    if(d>0){
                        return {key:k,value:undefined}
                    }
                }
            }
            return {key:k,value:v}
        }).filter(v=>!v.value).map(v=>v.key).value();
        if(error.length>0){
            setErrors([...error])
        }else{

            let nd = {...infoData};
            if(smsCode !== ''){
                nd = {...infoData,otp:smsCode}
            }

            Actions.User.verificationStep1({data:{
                    ...nd
                },loader:setLoader}).then(response=>{
                if(response.status){
                    setInfoData({...infoData,requestId:response.data.data})
                    setStep(2)
                }else{
                    if(response?.error){
                        let key = _.keys(response?.error?.data)[0];
                        let val = response?.error?.data[key];

                        switch (val){
                            case "mobile":
                                PHONE({
                                    prefix:infoData.mobilePrefix,
                                    number:infoData.mobile,
                                    send:"/us/v2/api/secured/personal/info/verify/otp/get",
                                    permitAll:false,
                                    save:e=>{
                                        if(e){
                                            nextStep(e);
                                            CLOSE();
                                        }
                                    }
                                })
                                break;
                            default:
                                ev.emit('notify', {
                                    show:true,
                                    text:response?.error?.message,
                                    type:'error',
                                    title:t('Error')
                                })
                                break;
                        }
                    }
                }
            }).catch(e=>{
                ERROR({error:t("error")})
            })
        }
    }

    const finishStep=()=>{
        setErrors([])
        let error = _.chain(documents).map((v,k)=>{
            if(k==="doc_expire_date"){
                if(v){
                    if(v === "MM-DD-YYYY" || v.split("-")[0].length !==4){
                        return {key:k,value:undefined}
                    }
                }
            }
            return {key:k,value:v}
        }).filter(v=>!v.value).map(v=>v.key).value();

        // documents.passportType === "passport"
        if(documents.passportType === "passport"){
            let ind = error.indexOf("back");
            if (ind !== -1) {
                error.splice(ind, 1);
            }
        }
        if(error.length>0){
            console.log(error)
            setErrors([...error])
        }else{

            MULTI({
                email:infoData.email,
                send:"/os/v1/api/secured/otp/profile-verification",
                title:t('Confirm Operation'),
                save:({code,sourceId})=>{
                    if(code){
                        Actions.User.verification({data:{
                            ...infoData,...documents,otp:code,sourceId:sourceId
                        },loader:"verifyOtp"}).then(response=>{
                            if(response.status){
                                CLOSE();
                                window.pushEvent(t("The operation was performed successfully"),"success")
                                history.push(`/${lang}/account/info/reload`)
                            }
                            else{
                                if(response?.error){
                                    ev.emit('notify', {
                                        show:true,
                                        text:response?.error?.message,
                                        type:'error',
                                        title:t('Error')
                                    })
                                }
                                switch (response?.error?.data?.mobile){
                                    case "mobile_duplicate_error":
                                        ERROR({error:t(ERRORS["mobile_duplicate_error"])})
                                    break;
                                    default:
                                        ERROR({error:t("error")})
                                }
                                switch (response?.error?.data?.mobilePrefix){
                                    case "mobilePrefix_not_exist":
                                        ERROR({error:t(ERRORS["mobilePrefix_not_exist"])})
                                    break;
                                    default:
                                        ERROR({error:t("error")})
                                }
                                switch (response?.error?.data?.otp){
                                    case "otp_verify_error":
                                        ERROR({error:t(ERRORS["otp_verify_error"])})
                                        break;
                                    default:
                                        ERROR({error:t("error")})
                                }

                            }
                        }).catch(e=>{
                            ERROR({error:t("error")})
                        })
                    }

                }
            })

        }
    }

    return (
        <>
            <div id="accountTabContent">
                <div
                    className="tab-pane fade show active"
                    id="personal"
                    role="tabpanel"
                    aria-labelledby="personal-tab"
                >
                    <div className="account-tab-inner">

                        <form onSubmit={e=>{
                            e.preventDefault()

                        }} className="personal-data">
                            <div className="tab-content row">
                                {
                                    step === 1 ? <div className="col-12 col-md-12 tab-pane show active" id="information">
                                        <div className="tab-headline">{t("Account Confirmation")}</div>
                                        <div className="row personal-row">
                                            <div className="col-12 d-none d-md-flex">
                                                <div className="form-title">{t("Information")}</div>
                                            </div>


                                            {/*<div className="col-12 col-md-6">
                                                <div style={{display:'flex',width:"100%"}}>
                                                    <div id="verif_prefix" data-text={t('Optional')} style={{width:"100px",marginRight: '10px'}}>
                                                        <SelectBox
                                                            id={"prefix"}
                                                            search={true}
                                                            data={mobileCode}
                                                            value={infoData.mobilePrefix}
                                                            placeholder={t("Prefix")}
                                                            onSelect={(e)=> (!readOnly && infoData?.mobileConfirmed !==1)?setInfoData({...infoData,mobilePrefix:e.id}):''}
                                                        />
                                                    </div>
                                                    <div id="verif_mob" data-text={t('Optional')} className={`input-label-border`} style={{flex:1,position: "relative"}}>
                                                        <input
                                                            type="number"
                                                            name="mobile"
                                                            id="mobile"
                                                            className="for-confirm"
                                                            value={infoData.mobile}
                                                            onChange={e => (!readOnly && infoData?.mobileConfirmed !==1)?setInfoData({...infoData,mobile:e.target.value}):''}
                                                        />
                                                        <label htmlFor="phone">{t("Phone")}</label>
                                                        {
                                                            infoData?.mobileConfirmed===1?<span className="confirmed">{t("Confirmed")}</span>: null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div  className={`input-label-border ${error("email")}`}>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="for-confirm"
                                                        value={infoData.email}
                                                        onChange={e => (!readOnly && infoData?.emailConfirmed !==1)?setInfoData({...infoData,email:e.target.value}):''}
                                                    />
                                                    <label htmlFor="email">{t('Email')}</label>
                                                    {
                                                        infoData?.emailConfirmed===1?<span className="confirmed">{t('Confirmed')}</span>: null
                                                    }
                                                </div>
                                            </div>*/}
                                            <div className="col-12 col-md-6">
                                                <div  className={`input-label-border ${error("firstName")}`}>
                                                    <input onChange={e => !readOnly?setInfoData({...infoData,firstName:e.target.value}):''} value={infoData.firstName} type="text" name="name" id="name"/>
                                                    <label htmlFor="name">{t("Name")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("lastName")}`}>
                                                    <input onChange={e => !readOnly?setInfoData({...infoData,lastName:e.target.value}):''} value={infoData.lastName} type="text" name="surname" id="surname"/>
                                                    <label htmlFor="surname">{t("Surname")}</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`${error("gender")}`}>
                                                <SelectBox
                                                    data={gender[i18n.language]}
                                                    value={infoData.gender}
                                                    placeholder={t("Sex")}
                                                    id={'gender'}
                                                    error={error("gender")}
                                                    onSelect={(e)=> !readOnly?setInfoData({...infoData,gender:e.id}):''}
                                                />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("dob")}`}>
                                                    <input onChange={e => !readOnly?setInfoData({...infoData,dob:e.target.value}):''} value={infoData.dob} type="date" name="dob" id="dob"
                                                           max={moment(new Date(),"YYYY-MM-DD").subtract(18,"year").format("YYYY-MM-DD")}/>
                                                    <label htmlFor="dob">{t("Date of birth")}</label>
                                                </div>
                                            </div>
                                            {/*<div className="col-12 col-md-6">
                                                <div className={`input-label-border ${error("username")}`}>
                                                    <input onChange={e => setInfoData({...infoData,username:e.target.value})} value={infoData.username} type="text" name="username" id="username"/>
                                                    <label htmlFor="username">{t("Username")}</label>
                                                </div>
                                            </div>*/}
                                            <div className="col-12 col-md-6">
                                                <div className={`${error("nationality")}`} style={{position:'relative'}}>
                                                    <SelectBox
                                                        search={true}
                                                        data={countries}
                                                        value={infoData.nationality}
                                                        placeholder={t("Nationality")}
                                                        error={error("nationality")}
                                                        onSelect={(e)=> !readOnly?setInfoData({...infoData,nationality:e.id}):''}
                                                    />

                                                    {inputLoader && <div className="loader-wrap"><SvgDot className="inputLoader" contentStyle={{fill: '#d6dbeb', height: '34px'}}/></div>}

                                                </div>
                                            </div>
                                            {/*<div className="col-12 col-md-6">
                                                <div className={`input-label-border`}>
                                                    <input value={currency[0].title} type="text" name="currency" id="currency"/>
                                                    <label htmlFor="currency">{t("currency")}</label>
                                                </div>
                                            </div>*/}
                                            {/*<div className="col-12 col-md-6">
                                                <div className={`${error("currency")}`}>
                                                <SelectBox
                                                        data={currency}
                                                        value={infoData.currency}
                                                        placeholder={t("Currency")}
                                                        error={error("currency")}
                                                        onSelect={(e)=> setInfoData({...infoData,currency:e.id})}
                                                />
                                                </div>
                                            </div>*/}

                                        </div>
                                    </div>:null
                                }
                                {
                                    step===2? <div className="col-12 col-md-12">
                                        <div className="tab-headline" style={{cursor:'pointer'}} onClick={()=>setStep(1)}><img src={arrowLeftBack} alt=""/> {t("Account Confirmation")}</div>
                                        <div className="row personal-row">
                                            <div className="col-12 order-3 order-md-2">
                                                <div className="row step2" style={{marginTop:'20px'}}>

                                                    <div className="col-12 col-md-6">
                                                        <SelectBox
                                                            data={passportType[i18n.language]}
                                                            placeholder={t('Document Type')}
                                                            value={documents.passportType}
                                                            error={error("passportType")}
                                                            onSelect={(e)=> setDocuments({...documents,passportType:e.id})}

                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <SelectBox
                                                            search={true}
                                                            data={countries}
                                                            value={documents.country}
                                                            placeholder={t("Nationality")}
                                                            error={error("country")}
                                                            onSelect={(e)=> setDocuments({...documents,country:e.id})}
                                                        />
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className={`input-label-border ${error("docNumber")}`}>
                                                            <input type="text" name="docNumber" id="docNumber" value={documents.docNumber} onChange={event => setDocuments({...documents,docNumber:event.target.value})}/>
                                                            <label htmlFor="phone">{t("Document Number")}</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6">
                                                        <div className={`input-label-border ${error("doc_expire_date")}`}>
                                                            <input
                                                                    onChange={e => setDocuments({...documents,doc_expire_date:e.target.value})}
                                                                    value={documents.doc_expire_date}
                                                                    type="date" name="dob"
                                                                    id="dob"
                                                                    min={moment(new Date(),"YYYY-MM-DD").add(1,"days").format("YYYY-MM-DD")}/>
                                                            <label htmlFor="dob">{t("Document Expire Date")}</label>
                                                        </div>
                                                    </div>

                                                    {
                                                        documents.passportType !== "" && (
                                                            <>
                                                                <div className={`col-12 col-md-6 ${error("front")}`}>
                                                                    <UploadDoc
                                                                        id={"front"}
                                                                        onSelect={e=>setDocuments({...documents,front:e})}
                                                                        title={`${documents.passportType === "passport"? t('Upload a copy of your passport (color image)'):t('Upload the front image of the ID Card/Passport (color image)')}`}
                                                                    />

                                                                </div>
                                                                {
                                                                    documents.passportType !== "passport" && (
                                                                        <div className={`col-12 col-md-6 ${error("front")}`}>
                                                                            <UploadDoc
                                                                                id={"back"}
                                                                                onSelect={e=>setDocuments({...documents,back:e})}
                                                                                title={t('Upload the back image of the ID Card/Passport (color image)')}
                                                                            />
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }

                                                    {/*<div className={"error-text"}>{t("error")}</div>*/}

                                                </div>

                                            </div>
                                        </div>
                                    </div>:null
                                }

                            </div>
                        </form>
                        {
                            readOnly === false &&
                            <div className="col-12 col-md-4">
                                <div style={{color:`${status.status ==="success"? 'green':'red'}`}}>{status.msg}</div>
                                {
                                    (rawInfo?.hasUserRequestedVerify === true && rawInfo?.verifyRequest?.result === -1)?
                                        ''
                                        :
                                        <button type="submit" style={{width:'100%',position:'relative',overflow:'hidden'}} className="btn-primary" onClick={()=>{
                                            if(step===1){
                                                nextStep();
                                            }else{
                                                finishStep();
                                            }
                                        }}>
                                            {loader && <div className="loader-wrap"><SvgDot contentStyle={{backgroundColor: '#ffbc00'}}/></div>}
                                            {t("Confirm And Continue")}
                                        </button>
                                }

                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmation;
