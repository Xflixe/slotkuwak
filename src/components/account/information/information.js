import React, {useEffect, useState} from 'react';
import './style.scss';
import {Actions, useTranslation} from "../../../core";
import _ from "lodash";
import {useOTP} from "../../../core/hooks/useOTP";
import ChangePassword from '../../account/changePassword/ChangePassword'
import SelectBox from "../../forms/select/NewSelect";
import {SvgDot} from "../../index";
import PLXModal from "../../modal/PLXModal";


const countries =[
    {id:"VGB",title:"British Virgin Islands"},
    {id:"BRN",title:"Brunei Darussalam"},
    {id:"BGR",title:"Bulgaria"},
    {id:"BFA",title:"Burkina Faso"},
    {id:"BDI",title:"Burundi"},

]
const currency = [
/*
    {  id:'USD',title:"US Dollar" },
*/
    {  id:'EUR',title:"Euro" },
   /* {  id:'GEL',title:"Lari" },
    {  id:'RUB',title:"Russian Ruble" }*/
]


const passportType= [
    {id: "id_card", title: "ID Card"},
    {id: "passport",title: "Passport"},
    {id: "resident_identification",title: "Resident Identification"},
]

const MobilePrefixList=[
    {id:1,title: "+1"},
    {id:673,title: "+673"},
    {id:359,title: "+359"},
    {id:226,title: "+226"},
    {id:257,title: "+257"}
]
const gender = [
    { id:"F",title:"Female",},
    { id:"M",title:"Male",}
]
/*
const securityQuestions = [
    { id:1,title:"What is your mother\'s maiden name?"},
    { id:2,title:"What was your first pet?"},
    { id:3,title:"What was the model of your first car?"},
    { id:4,title:"In what city were you born?"},
]
*/

const Information = () => {
    const {t} = useTranslation();
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [infoData, setInfoData] = useState({
        firstName:'',
        email:'',
        mobile:'',
        gender:'',
        lastName:'',
        username:'',
        currency: "EUR",
        country:"",
        mobileConfirmed:0,
        emailConfirmed:0,
        mobilePrefix:"1",
        hasUserRequestedVerify:null,
        verifyStatus:null,

    });
    const [questions, setQuestions] = useState({
        question1:'',
        answer1:'',
        question2:'',
        answer2:''

    });
    const  [loader,setLoader]=useState(false)
    const  [securityQuestionsLoader,setSecurityQuestionsLoader]=useState(false)
    const [status,setStatus]=useState({
        status:"",
        msg:""
    })
    const [errors,setErrors]=useState([])
    const [openChangePass,setOpenChangePass]=useState(false);
    const [openSecretQuestion,setOpenSecretQuestion]=useState(false);
    const [securityQuestions,setSecurityQuestions]=useState([]);
    const [open2FA,setOpen2FA]=useState(false);
    const [dat2FA,setDat2FA]=useState(false);
    useEffect(()=>{
        getInfo()

    },[])
    useEffect(()=>{
        if(openSecretQuestion && securityQuestions.length===0){
            Actions.User.getSecurityQuestion({loader:setSecurityQuestionsLoader})
                .then((response)=>{
                    setSecurityQuestions((response.status && response.data?response.data?.data:[]))
                })
        }
    },[openSecretQuestion])
    const getInfo = ()=>{
        Actions.User.info().then(response=>{
            if(response.status){
                let res = response.data.data;
                console.log('res[\'mobile\']',res['mobile'])
                setInfoData(_.fromPairs(_.map(infoData, (v,k)=> {
                  switch (k){
                      default: return [k,res[k]];
                  }
                })))
            }
        })
    }


    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }

    const saveSecurityAnswers=()=>{
        let error = _.chain(questions).map((v,k)=>{ return  {key:k,value:v}}).filter(v=>!v.value).map(v=>v.key).value();
        if(error.length>0){
            setErrors([...error])
        }else{
            setErrors([])
            MULTI({
                title:t('Confirm Operation'),
                send:"/os/v1/api/secured/otp/profile-info-security-question",
                save:({code,sourceId})=>{
                    if(code){

                        Actions.User.saveSecurityQuestions({data:{
                                otp:code,
                                sourceId:sourceId,
                                ...questions
                            },loader:"verifyOtp"}).then(response=>{
                            if(response.status){
                                window.pushEvent(t("The operation was performed successfully"),"success");
                                setOpenSecretQuestion(false)
                                CLOSE();
                            }else{
                                console.log("catch")
                                ERROR({error:t("error")})
                            }
                        }).catch(e=>{
                            console.log("catch")
                            ERROR({error:t("error")})
                        })
                    }

                }
            })
        }
    }

    const save2faAuthentication =()=> {
        MULTI({
            title:t('Confirm Operation'),
            send:"/os/v1/api/secured/otp/profile-info-2fa-authentication",
            save:({code,sourceId})=>{
                if(code){

                    Actions.User.save2faAuthentication({data:{
                            otp:code,
                            sourceId:sourceId,
                            twoFA:dat2FA
                        },loader:"verifyOtp"}).then(response=>{
                        if(response.status){
                            window.pushEvent(t("The operation was performed successfully"),"success");
                            setOpenSecretQuestion(false)
                            CLOSE();
                        }else{
                            console.log("catch")
                            ERROR({error:t("error")})
                        }
                    }).catch(e=>{
                        console.log("catch")
                        ERROR({error:t("error")})
                    })
                }

            }
        })
    }

    const onUpdate = ()=>{

        let error = _.chain(infoData).map((v,k)=>{ return  {key:k,value:v}}).filter(v=>!v.value).map(v=>v.key).value();


        if(error.length>0){
            setErrors([...error])
            console.log('error',error)
        }else{
            Actions.User.updateInfo({data:infoData,loader:setLoader}).then(response=>{
                setTimeout(()=>{
                    setStatus({
                        ...status,
                        status:'',
                        msg:''
                    })
                },2000)

                if(response.status){
                    setStatus({
                        ...status,
                        status:'success',
                        msg:t('The information was successfully updated')
                    })
                }else {
                    setStatus({
                        ...status,
                        status:"error",
                        msg:t("An error occurred while updating the information")
                    })
                }
            })
        }

    }
    return (
        <>

            {
                infoData?.hasUserRequestedVerify === true && infoData?.verifyStatus !== 0 &&
                <div className="col-12">
                    <div className="user_verify_test">Your information has been submitted and Waiting for Review </div>
                </div>
            }
            <br/>
            <div className="tab-content" id="accountTabContent">
                <div
                    className="tab-pane fade show active"
                    id="personal"
                    role="tabpanel"
                    aria-labelledby="personal-tab"
                >
                    <div className="account-tab-inner">
                        <div className="tab-headline">{t("Personal Data")}</div>
                        <ul className="mb-sub-tabs nav nav-tabs d-md-none" id="myTab" role="tablist">
                            <li role="presentation">
                                <button
                                    className="item active"
                                    id="information-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#information"
                                    type="button"
                                    role="tab"
                                    aria-controls="information"
                                    aria-selected="true"
                                >
                                    {t("Information")}
                                </button>
                            </li>
                            <li role="presentation">
                                <button
                                    className="item"
                                    id="security-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#security"
                                    type="button"
                                    role="tab"
                                    aria-controls="security"
                                    aria-selected="false"
                                >
                                    {t("Security")}
                                </button>
                            </li>
                        </ul>

                        <form onSubmit={e=>{
                            e.preventDefault()

                            onUpdate();

                        }} className="personal-data">
                            <div className="tab-content row">
                                <div
                                    className="col-12 col-md-8 tab-pane show active"
                                    id="information"
                                    role="tabpanel"
                                    aria-labelledby="information-tab"
                                >
                                    <div className="row personal-row">
                                        <div className="col-12 d-none d-md-flex">
                                            <div className="form-title">{t("Information")}</div>
                                        </div>
                                        <div className="col-12">
                                                <div style={{display:"flex"}} >
                                                    <div className="input-select" style={{width:"100%",maxWidth:'150px'}}>
                                                        <SelectBox
                                                            data={MobilePrefixList}
                                                            id={"prefix"}
                                                            placeholder={t("Prefix")}
                                                            className=""
                                                                value={infoData.mobilePrefix}
                                                                onSelect={e => setInfoData({...infoData,mobilePrefix:e.id})}
                                                        />
                                                    </div>

                                                    <div className={`input-label-border ${error("mobile")}`} style={{width:"100%",marginLeft:'10px'}}>
                                                        <input
                                                            type="number"
                                                            name="mobile"
                                                            id="mobile"
                                                            className="for-confirm"
                                                            value={infoData.mobile}
                                                            onChange={e => setInfoData({...infoData,mobile:e.target.value})}
                                                        />
                                                        <label htmlFor="phone">{t("Phone")}</label>
                                                        {
                                                            infoData?.mobileConfirmed===1?<span className="confirmed">{t("Confirmed")}</span>:
                                                                <button
                                                                    type="button"
                                                                    className="btn-confirm"
                                                                    onClick={()=>{
                                                                        if(infoData.mobile.trim().length>0){
                                                                            PHONE({
                                                                                prefix:infoData.mobilePrefix,
                                                                                number:infoData.mobile,
                                                                                //send:"/us/v2/api/secured/personal/info/otp/get",
                                                                                send:"/os/v1/api/secured/otp/profile-info-mobile",
                                                                                verify:"/os/v1/api/secured/otp/profile-info-mobile",
                                                                                permitAll:false,
                                                                                save:e=>{
                                                                                    if(e){
                                                                                        //CLOSE()
                                                                                        MULTI({
                                                                                            title:t('Confirm Operation'),
                                                                                            email:infoData.email,
                                                                                            send:"/os/v1/api/secured/otp/profile-info-mobile",
                                                                                            additionalParams:{'email':infoData.email},
                                                                                            save:({code,sourceId})=>{
                                                                                                if(code){
                                                                                                    Actions.User.verification_phone({data:{
                                                                                                            otp:code,
                                                                                                            sourceId:sourceId,
                                                                                                            mobile:infoData.mobile,
                                                                                                            mobilePrefix:infoData.mobilePrefix

                                                                                                        },loader:"verifyOtp"}).then(response=>{
                                                                                                        if(response.status){
                                                                                                            window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                                            getInfo();
                                                                                                            CLOSE();
                                                                                                            //history.push(`/${lang}/account/info`)
                                                                                                        }else{
                                                                                                            console.log("catch")
                                                                                                            ERROR({error:t("error")})
                                                                                                        }
                                                                                                    }).catch(e=>{
                                                                                                        console.log("catch")
                                                                                                        ERROR({error:t("error")})
                                                                                                    })
                                                                                                }

                                                                                            }
                                                                                        })
                                                                                    }

                                                                                }
                                                                            })
                                                                        }
                                                                    }}
                                                                >
                                                                    {t("Confirm")}
                                                                </button>
                                                        }
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="col-12">
                                            <div  className={`input-label-border ${error("email")}`}>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="for-confirm"
                                                    value={infoData.email}
                                                    onChange={e => setInfoData({...infoData,email:e.target.value})}
                                                />
                                                <label htmlFor="email">Email</label>
                                                {
                                                    infoData?.emailConfirmed===1?<span className="confirmed">Confirmed</span>:
                                                        <button
                                                            onClick={()=>{
                                                                if(infoData.email.trim().length>0){
                                                                    EMAIL({
                                                                        email:infoData.email,
                                                                        send:"/os/v1/api/secured/otp/profile-info-email",
                                                                        verify:"/os/v1/api/secured/otp/profile-info-email",
                                                                        permitAll:false,
                                                                        save:e=>{
                                                                            if(e){
                                                                                //setInfoData({...infoData,emailConfirmed:1});
                                                                                //CLOSE();
                                                                                MULTI({
                                                                                    title:t('Confirm Operation'),
                                                                                    email:infoData.email,
                                                                                    send:"/os/v1/api/secured/otp/profile-info-email",
                                                                                    additionalParams:{'email':infoData.email},
                                                                                    save:({code,sourceId})=>{
                                                                                        if(code){
                                                                                            Actions.User.verification_email({data:{
                                                                                                    otp:code,
                                                                                                    sourceId:sourceId,
                                                                                                    email:infoData.email

                                                                                                },loader:"verifyOtp"}).then(response=>{
                                                                                                if(response.status){
                                                                                                    window.pushEvent(t("The operation was performed successfully"),"success");
                                                                                                    getInfo();
                                                                                                    CLOSE();
                                                                                                    //history.push(`/${lang}/account/info`)
                                                                                                }else{
                                                                                                    console.log("catch")
                                                                                                    ERROR({error:t("error")})
                                                                                                }
                                                                                            }).catch(e=>{
                                                                                                console.log("catch")
                                                                                                ERROR({error:t("error")})
                                                                                            })
                                                                                        }

                                                                                    }
                                                                                })

                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                            }}
                                                            type="button"
                                                            className="btn-confirm"
                                                        >
                                                            {t("Confirm")}
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div  className={`input-label-border ${error("firstName")}`}>
                                                <input onChange={e => setInfoData({...infoData,firstName:e.target.value})} value={infoData.firstName} type="text" name="name" id="name"/>
                                                <label htmlFor="name">{t("Name")}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border ${error("lastName")}`}>
                                                <input onChange={e => setInfoData({...infoData,lastName:e.target.value})} value={infoData.lastName} type="text" name="surname" id="surname"/>
                                                <label htmlFor="surname">{t("Surname")}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border ${error("dob")}`}>
                                                <input onChange={e => setInfoData({...infoData,dob:e.target.value})} value={infoData.dob} type="date" name="dob" id="dob"/>
                                                <label htmlFor="dob">{t("Date of birth")}</label>
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className={`${error("gender")}`}>
                                            <SelectBox
                                                data={gender}
                                                value={infoData.gender}
                                                placeholder={t("Choose Sex")}
                                                id={'gender'}
                                                onSelect={(e)=> setInfoData({...infoData,gender:e.id})}
                                            />
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border ${error("username")}`}>
                                                <input onChange={e => setInfoData({...infoData,username:e.target.value})} value={infoData.username} type="text" name="username" id="username" />
                                                <label htmlFor="username">{t("Username")}</label>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <SelectBox
                                                    data={countries}
                                                    value={infoData.country}
                                                    placeholder={t("Choose Country")}
                                                    id={'countries'}
                                                    onSelect={(e)=> setInfoData({...infoData,country:e.id})}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className={`input-label-border ${error("username")}`}>
                                                <input value={currency[0].title} type="text" name="currency" id="currency" placeholder="currency"/>
                                                <label htmlFor="currency">{t("currency")}</label>
                                            </div>
                                            {/*<SelectBox
                                                data={currency}
                                                value={infoData.currency}
                                                placeholder={t("Currency")}
                                                id={'currency'}
                                                onSelect={(e)=> setInfoData({...infoData,currency:e.id})}
                                            />*/}
                                        </div>

                                    </div>
                                </div>
                                <div
                                    className="col-12 col-md-4 tab-pane"
                                    id="security"
                                    role="tabpanel"
                                    aria-labelledby="security-tab"
                                >
                                    <div className="row personal-row">
                                        <div className="col-12 d-none d-md-flex">
                                            <div className="form-title">{t("Security")}</div>
                                        </div>
                                        {/*<div className="col-12 order-2 order-md-1">
                                            <SelectBox data={questions} value={infoData.question} placeholder={t("Secret question")}
                                                    id={'question1'}
                                                    onSelect={(e)=> setInfoData({...infoData,question:e.id})}
                                            />
                                        </div>
                                        <div className="col-12 order-3 order-md-2">
                                            <div className="input-label-border">
                                                <input onChange={e => setInfoData({...infoData,answer:e.target.value})} value={infoData.answer} type="text" name="secret-answer" id="secretAnswer"/>
                                                <label htmlFor="secretAnswer">{t("Secret answer")}</label>
                                            </div>
                                        </div>*/}
                                        <div className="col-12 order-1 order-md-3">
                                            <button
                                                className="btn-change-password"
                                                type="button"
                                                onClick={()=>setOpenSecretQuestion(true)}
                                            >
                                                {t("Secret Question")}
                                            </button>
                                        </div>
                                        <div className="col-12 order-1 order-md-3">
                                            <button
                                                className="btn-change-password"
                                                type="button"
                                                onClick={()=>setOpen2FA(true)}
                                            >
                                                {t("2FA Autorization")}
                                            </button>
                                        </div>
                                        <div className="col-12 order-1 order-md-3">
                                            <button
                                                className="btn-change-password"
                                                type="button"
                                                onClick={()=>setOpenChangePass(true)}
                                            >
                                                {t("Change Password")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{color:`${status.status ==="success"? 'green':'red'}`}}>{status.msg}</div>
                            <button type="submit" className="btn-primary" style={{position:'relative',overflow:'hidden'}}>
                                {loader? <SvgDot/>:t("Save")}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {
                openChangePass && <ChangePassword
                title={t("Change Password")}
                onClose={setOpenChangePass}
                />
            }
            {
                open2FA && (
                    <PLXModal title={t('Set 2FA Autorization')} onClose={()=>setOpen2FA(false)} dialogStyle={{maxWidth:'360px'}} >
                        <form onSubmit={e=>{
                            e.preventDefault();
                            save2faAuthentication();
                        }} className="confirm-form aut-2fa">

                            <div className="row">
                                <div  className="col-12" style={{marginBottom:'0'}}>
                                    <br/>
                                    <p>you can turn on/off 2FA autorization here</p>
                                    <p style={{fontSize:'14px',lineHeight:'14px',color:'#707c9b'}}>2fa is used for additional security during authentication</p>
                                    <div className="out-2fa-box">
                                        <div style={{color:'#707c9b'}}>USE 2FA:</div>
                                        <div onClick={()=>setDat2FA(!dat2FA)} className={`btn-2fa ${dat2FA?'active':'disable'}`}>
                                            <i/>
                                        </div>
                                    </div>
                                    <br/>
                                    <p style={{fontSize:'14px',lineHeight:'14px',color:'#707c9b',marginBottom:'0'}}>After saving the change, you must press the save</p>
                                </div>
                            </div>


                            <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden',marginLeft:'0'}}>
                                {loader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                                {t("Save")}
                            </button>
                        </form>
                    </PLXModal>
                )
            }
            {
                openSecretQuestion && (
                    <PLXModal title={t('Secret Question')} onClose={()=>setOpenSecretQuestion(false)} dialogStyle={{maxWidth:'360px'}} >
                        <form onSubmit={e=>{
                            e.preventDefault();
                            console.log(questions)
                            //changePassword();
                            saveSecurityAnswers()
                        }} className="confirm-form password-change">

                            <div className="row">
                                <h6 style={{color: '#727fa4'}}>{t("Question")} 1</h6>
                                <div  className={`input-select-border col-12 ${error("question1")}`}>
                                    <SelectBox data={securityQuestions.filter(v=>questions.question2 !==v.id)} value={questions.question1} placeholder={t("Secret question")}
                                               id={'question1'}
                                               onSelect={(e)=> setQuestions({...questions,question1:e.id})}
                                    />
                                </div>
                                <div className="col-12">
                                    <div className={`input-label-border ${error("answer1")}`}>
                                        <input onChange={e => setQuestions({...questions,answer1:e.target.value})} value={questions.answer1} type="text" name="secret-answer" id="secretAnswer"/>
                                        <label htmlFor="secretAnswer">{t("Secret answer")}</label>
                                    </div>
                                </div>


                                <h6 style={{color: '#727fa4'}}>{t("Question")} 2</h6>
                                <div  className={`input-select-border col-12 ${error("question2")}`}>
                                    <SelectBox data={securityQuestions.filter(v=>questions.question1 !==v.id)} value={questions.question2} placeholder={t("Secret question")}
                                               id={'question2'}
                                               onSelect={(e)=> setQuestions({...questions,question2:e.id})}
                                    />
                                </div>
                                <div className="col-12">
                                    <div className={`input-label-border ${error("answer2")}`}>
                                        <input onChange={e => setQuestions({...questions,answer2:e.target.value})} value={questions.answer2} type="text" name="secret-answer" id="secretAnswer"/>
                                        <label htmlFor="secretAnswer">{t("Secret answer")}</label>
                                    </div>
                                </div>

                            </div>

                            <button type="submit" className="btn-dep justify-content-center px-0" style={{position:'relative',overflow:'hidden'}}>
                                {securityQuestionsLoader? (<SvgDot contentStyle={{background:'#00984a'}}/> ) : ''}
                                {t("Save")}
                            </button>
                        </form>
                    </PLXModal>
                )
            }
        </>
    )
}

export default Information;
