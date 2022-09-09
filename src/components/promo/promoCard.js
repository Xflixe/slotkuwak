import React,{useEffect,useState} from 'react'
import _ from 'lodash'
import {play} from "../../assets/img/icons/icons";
import {promo1} from "../../assets/img/images";
import {useTranslation} from "../../core";

const PromoCard =(props)=> {
    //const [data,setData]= useState(props.data)
    const [count,setCount] = useState(props.count || 5)
    const {t,i18n} = useTranslation()
    const [data,setData]= useState(props.data)

    useEffect(()=>{
        setData(props.data)
    },[props.data])

    return (
            _.map(data, (v,index)=>{
                return  (
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                        <div className="promo-card">
                            <img
                                src={v.icon}
                                alt={v.title}
                                className="promo-card-cover"
                            />
                            <div className="promo-card-body">
                                <div className="promo-card-title">{v.title}</div>
                                <p className="promo-card-paragraph">{v.text}</p>
                                <a href={`/${i18n.language}/${v.url}`} className="btn-dy">{t('read more')}</a>
                            </div>
                        </div>
                    </div>
                )
            })

    )
}
export default PromoCard;
