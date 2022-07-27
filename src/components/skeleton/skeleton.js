import React, {useEffect, useState} from 'react';
import {logoM, sl2} from "../../assets/img/images";
import {useUser} from "../../core/hooks/useUser";
import {Link, Redirect, useParams} from "react-router-dom";
import PropTypes from 'prop-types';
import {Actions, useTranslation} from "../../core";

import {UseEvent} from "../../core/hooks/useEvent";
import {useDispatch} from "react-redux";
import './skeleton.scss';

const Skeleton = () =>{
    const dispatch = useDispatch();
    const {t,i18n} = useTranslation();
    const ev = UseEvent();
    const {User,checkSession} = useUser();
    const {lang} = useParams();
    const [loaded,setLoaded]=useState(false);

    useEffect(()=>{

    },[])

    return (
        <div className="skeleton">
            <div className="container">
                <div className="sk_head">
                    <button/>
                    <button/>
                </div>
                <div className="sk_nav"/>
                <div className="sk_slider"/>
                <div className="sk_cars">
                    <div className="sk_item"/>
                    <div className="sk_item"/>
                    <div className="sk_item"/>
                    <div className="sk_item"/>
                </div>
                <div className="sk_footer" />
            </div>
        </div>
    )
}

export default Skeleton;
