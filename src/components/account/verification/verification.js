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


const currency = [
    /*{  id:'USD',title:"US Dollar" },*/
    {  id:'EUR',title:"Euro" },
    /*{  id:'GEL',title:"Lari" },
    {  id:'RUB',title:"Russian Ruble" }*/
]


const passportType= [
    {id: "id_card", title: "ID Card"},
    {id: "passport",title: "Passport"},
    {id: "resident_identification",title: "Resident Identification"},
]

const gender = [
    { id:"F",title:"Female",},
    { id:"M",title:"Male",}
]

const Confirmation = () => {
    const {t} = useTranslation();
    const {lang} = useParams()
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
        //getInfo();
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
                setMobileCode(_.map(response.data, (v,k)=> {
                    return _.map(v,(val) => {return {id:val.code,title:val.title,code:val.iso3} })
                })[0])
            }
        })
    }

    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){
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

    const nextStep = ()=>{
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
            Actions.User.verificationStep1({data:{
                    ...infoData
                },loader:setLoader}).then(response=>{
                if(response.status){
                    setInfoData({...infoData,requestId:response.data.data})

                    setStep(2)
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
        if(error.length>0){
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
                                history.push(`/${lang}/account/info`)
                            }else{
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
                                            <div className="col-12 col-md-6">
                                                <div style={{display:'flex',width:"100%"}}>
                                                    <div style={{width:"100px",marginRight: '10px'}}>
                                                        <SelectBox
                                                            id={"prefix"}
                                                            search={true}
                                                            data={mobileCode}
                                                            value={infoData.mobilePrefix}
                                                            placeholder={t("Prefix")}
                                                            //plData={''} plName={t("Choose Sex")}
                                                            onSelect={(e)=> !readOnly?setInfoData({...infoData,mobilePrefix:e.id}):''}
                                                        />
                                                    </div>
                                                    <div className={`input-label-border`} style={{flex:1,position: "relative"}}>
                                                        <input
                                                            type="number"
                                                            name="mobile"
                                                            id="mobile"
                                                            className="for-confirm"
                                                            value={infoData.mobile}
                                                            onChange={e => !readOnly?setInfoData({...infoData,mobile:e.target.value}):''}
                                                        />
                                                        <label htmlFor="phone">{t("Phone")}</label>
                                                        {
                                                            infoData?.mobileConfirmed===1?<span className="confirmed">{t("Confirmed")}</span>: null
                                                                /*<button
                                                                    type="button"
                                                                    className="btn-confirm"
                                                                    onClick={()=>{
                                                                        if(infoData?.mobile === ''){
                                                                            window.pushEvent(t("Fill Mobile"),"error");
                                                                            return;
                                                                        }
                                                                        if(infoData?.mobile.trim().length>0){
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
                                                                </button>*/
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
                                                        onChange={e => !readOnly?setInfoData({...infoData,email:e.target.value}):''}
                                                    />
                                                    <label htmlFor="email">Email</label>
                                                    {
                                                        infoData?.emailConfirmed===1?<span className="confirmed">Confirmed</span>: null
                                                            /*<button
                                                                onClick={()=>{
                                                                    if(infoData.email.trim().length>0){
                                                                        EMAIL({
                                                                                email:infoData.email,
                                                                                send:"/os/v1/api/secured/otp/profile-verification-email",
                                                                                verify:"/os/v1/api/secured/otp/profile-verification-email",
                                                                                save:e=>{
                                                                                    if(e){
                                                                                        window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                        setInfoData({...infoData,emailConfirmed:1});
                                                                                        CLOSE()
                                                                                    }
                                                                                }
                                                                        })
                                                                    }
                                                                }}
                                                                type="button"
                                                                className="btn-confirm"
                                                            >
                                                                {t("Confirm")}
                                                            </button>*/
                                                    }
                                                </div>
                                            </div>
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
                                                    data={gender}
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
                                                            data={passportType}
                                                            placeholder={"Document Type"}
                                                            value={documents.passportType}
                                                            error={error("passportType")}
                                                            onSelect={(e)=> setDocuments({...documents,passportType:e.id})}

                                                        />
                                                       {/* <Select data={passportType} value={documents.passportType} label={t("Document Type")}
                                                                plData={''} plName={t("Choose type")}
                                                                id={'passportType'}
                                                                error={error("passportType")}
                                                                onSelect={(e)=> setDocuments({...documents,passportType:e})}
                                                        />*/}
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
                                                    <div className={`col-12 col-md-6 ${error("front")}`}>
                                                        <UploadDoc
                                                            id={"front"}
                                                            onSelect={e=>setDocuments({...documents,front:e})}
                                                            title={"Upload a photo of the first spread or passport/ID card front side."}
                                                        />

                                                    </div>
                                                    <div className={`col-12 col-md-6 ${error("front")}`}>
                                                        <UploadDoc
                                                            id={"back"}
                                                            onSelect={e=>setDocuments({...documents,back:e})}
                                                            title={"Upload a photo of the first spread or passport/ID card front side."}
                                                        />
                                                    </div>

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
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmation;
