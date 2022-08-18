import React,{useEffect,useState,useRef} from 'react'
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, Virtual} from 'swiper';
//import { Swiper, SwiperSlide } from 'swiper/react';
import {Swiper, SwiperSlide} from "../../../node_modules/swiper/react/swiper-react";

import _ from 'lodash'
SwiperCore.use([Navigation,Virtual, Pagination, Scrollbar, A11y]);

const  HeaderCarousel = (props) =>{
    const [data,setData]= useState(props.data)
    const [count,setCount] = useState(props.count || 5)
    const ref = useRef(null);
    useEffect(()=> {
        setCount(props.count)
    },[props.count])
    useEffect(()=> {
        if(ref){
            (document.querySelector(".swiper-wrapper").setAttribute("class","swiper-wrapper d-flex align-items-center"));
        }
    },[ref])

    return (
        <Swiper
            ref={ref}
            spaceBetween={10}
            slidesPerView={count}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {}}
            onSlideChange={() => {}}
            loop={true}
            wrapperClass={"test"}
        >
            {
                _.map(data, (v,index)=>{
                    return  (
                        <SwiperSlide key={index}>
                            <a href="#" target="_blank">
                                <img src={v.icon} alt="Bitcoin" />
                            </a>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default HeaderCarousel;
