import React, {useEffect, useState} from 'react';
import {logoM, sl2} from "../../assets/img/images";
import {useUser} from "../../core/hooks/useUser";
import {
    account,
    logo2,
    user_ico,
    refresh
} from '../../assets/img/icons/icons';
import {Link, Redirect, useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import {Actions, useTranslation} from "../../core";
import ChangeLagunge from "../languages/ChangeLagunge";
import {UseEvent} from "../../core/hooks/useEvent";
import {useDispatch} from "react-redux";
import UserDropDawn from "../user/userDropdawn";
const Header = ({page}) =>{
    const dispatch = useDispatch();
    const {t,i18n} = useTranslation();
    const ev = UseEvent();
    const {User,checkSession} = useUser();
    const {lang} = useParams();
    const [loaded,setLoaded]=useState(false);
    const [rotate,setRotate]=useState(false);
    const [showUserDropDown,setShowUserDropDown]=useState(false);
    let rot ='';
    //useEffect(()=>{
    //    console.log(User)
    //},[page])

    useEffect(()=>{
        rot = setTimeout(function() {
            setRotate(false);
        }, 2000);
    },[rotate])

    const pingBal =  async () => {
        clearTimeout(rot);
        setRotate(true);
        setLoaded(await dispatch(Actions.User.ping()));
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md flex-column">
                <div className="navbar-head">
                    <div className="container">
                        <div className="d-flex justify-content-between" style={{position:'relative'}}>
                            <Link className="navbar-brand d-none d-lg-flex" to="/">
                                <img src={logo2} alt=""/>
                            </Link>
                            <Link className="navbar-brand w-auto h-auto d-lg-none" to="/">
                                <img src={logoM} alt=""/>
                            </Link>
                            <div className="authorization-interface d-flex align-items-center">
                                {
                                    User.isLogged? <>
                                            {/*<div className="user-information">
                                                <div data-user>{User.data.username}</div>
                                                <div data-pin>id: {User.data.id}</div>
                                            </div>*/}
                                            <div className="header-amount-box">

                                                <Link to={`/${i18n.language}/account`} className="navbar-balance d-flex flex-column">
                                                    <span className="currency">{User?.data?.accounts?.main?.currency?.iso3}</span>
                                                    <span className="current-balance">{User?.data?.accounts?.main?.amount.toFixed(2)}</span>
                                                </Link>
                                                <span onClick={()=>!rotate?pingBal():''}><img className={rotate?'rotate':''} src={refresh} alt=""/></span>

                                            </div>

                                            <div onClick={()=>{

                                                checkSession().then(response=>{
                                                    console.log(response)
                                                    if(response.status){

                                                        if(response?.data?.data?.verifyStatus===0){
                                                            ev.emit('withdrawModal', true)
                                                        }else{
                                                            ev.emit('notify', {
                                                                show:true,
                                                                text:'Oops, Unfortunately you can not withdraw money. Please verify your profile first.',
                                                                type:'error',
                                                                title:'Withdraw',
                                                                button:{
                                                                    name:'Verify Account',
                                                                    url: `/${i18n.language}/account/verification`
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }} className="withdraw-link">{t("withdraw")}</div>
                                            <div onClick={()=>{
                                                checkSession().then(response=>{
                                                    if(response){
                                                        ev.emit('depositModal', true)
                                                    }
                                                })
                                            }} className="deposit-link">{t("deposit")}</div>
                                            <div className="account-link" id="account-dropdown-link">
                                                <img src={user_ico} alt="" id="account-dropdown-link"/>
                                            </div>

                                            {/*<Link  to={`/${i18n.language}/account`} className="account-link"><img src={user_ico} alt=""/></Link>*/}
                                        {/*

                                        ev.emit('notify', {
                            show:true,
                            text:'specified username or password is incorrect',
                            type:'error',
                            title:'Log In Error'
                        })

                                        <button
                                            className="navbar-toggler"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#navbarSupportedContent"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false"
                                            aria-label="Toggle navigation"
                                        >
                                            <span className="navbar-toggler-icon"/>
                                        </button>*/}

                                        {/*<div className="btn-primary text-capitalize">
                                            {User.data.firstName}

                                        </div>
                                            &nbsp;&nbsp;
                                            <button
                                                className="btn-text text-capitalize"
                                                onClick={()=>signOut()}
                                            >
                                                SignOut
                                            </button>*/}

                                    </>:
                                    <>
                                        <button
                                            className="btn-text text-capitalize"
                                            id={"signIn-btn"}
                                            onClick={()=>ev.emit('signIn',true)}
                                        >
                                            {t('Log In')}
                                        </button>
                                        <button
                                            className="btn-primary text-capitalize"
                                            onClick={()=>ev.emit('signUp',true)}
                                            id={"signUp-btn"}
                                        >
                                            {t("Sign Up")}
                                        </button>
                                    </>
                                }
                                <div className="account-link" id="account-lang"><ChangeLagunge style={User.isLogged? {}:{marginLeft:'20px'}}/></div>

                            </div>
                            {User.isLogged?<UserDropDawn onClose={()=>setShowUserDropDown(false)}/>:''}

                        </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <div className="container">
                        <ul className="navbar-nav">
                            <li className="nav-item d-none d-md-flex">
                                <Link to={`/${i18n.language}/main`} className={`nav-link  home ${page==='main'? 'active':''}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            id="Interface-Essential_Home_house-entrance"
                                            data-name="Interface-Essential / Home / house-entrance"
                                            transform="translate(-275 -117)"
                                        >
                                            <g id="Group_13">
                                                <g id="house-entrance">
                                                    <path
                                                        id="Shape_15"
                                                        d="M299,126.5a1,1,0,0,0-.389-.791l-11-8.5a1,1,0,0,0-1.224,0l-11,8.5a1,1,0,0,0-.387.791V140a1,1,0,0,0,1,1h8a.5.5,0,0,0,.5-.5V136a2.5,2.5,0,0,1,5,0v4.5a.5.5,0,0,0,.5.5h8a1,1,0,0,0,1-1Z"
                                                    />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/${i18n.language}/sport`} className={`nav-link ${page==='sport'? 'active':''}`}>{t("Sport")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link  className={`nav-link ${page==='live'? 'active':''}`} to={`/${i18n.language}/live`}>{t("Live")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/${i18n.language}/virtuals`}  className={`nav-link ${page==='virtuals'? 'active':''}`} >{t("Virtuals")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/${i18n.language}/casino`}  className={`nav-link ${page==='casino'? 'active':''}`}>{t("Live Casino")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/${i18n.language}/slots`}  className={`nav-link ${page==='slots'? 'active':''}`}>{t("Slot")}</Link>
                            </li>
                            <li className="nav-item">
                                <Link  to={`/${i18n.language}/promotions`}  className={`nav-link ${page==='promo'? 'active':''}`}>{t("Welcome Bonus")}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/*<div className="header.bkp-slider">
                    <HeaderCarousel count={3}  data={[
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 },
                        {id:1, icon:slider1 }
                    ]} />
                </div>*/}
        </header>
    )
}
Header.propTypes={
    page:PropTypes.string
}
Header.defaultProps={
    page:'main'
}
export default Header;
