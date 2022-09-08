import './newSWP.scss';


// Import Swiper React components
//import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import '../../../node_modules/swiper/swiper.scss'; // core Swiper
import '../../../node_modules/swiper/modules/autoplay/autoplay.scss';
import '../../../node_modules/swiper/modules/navigation/navigation.scss'; // Navigation module
import '../../../node_modules/swiper/modules/pagination/pagination.scss'; // Pagination module
import '../../../node_modules/swiper/modules/scrollbar/scrollbar.scss'; // Pagination module
import {Swiper, SwiperSlide} from "../../../node_modules/swiper/react/swiper-react";
import _ from "lodash";
import {useEffect, useState} from "react";
import {Autoplay, Navigation, Pagination} from 'swiper';
import {Link} from "react-router-dom";

const NewSWP = (props) =>{
    const [data,setData]= useState(props.data)
    useEffect(()=>{
        //console.log(props.data)
        setData(props.data)
    },[props.data])
    return (
        <Swiper
            modules={[Autoplay,Pagination,Navigation]}
            spaceBetween={5}
            slidesPerView={1}
            //onSlideChange={() => console.log('slide change')}
            //onSwiper={(swiper) => console.log(swiper)}
            navigation
            loop
            pagination={{ clickable: true }}
            autoplay={{
                delay:3000
            }}
            //scrollbar={{ draggable: true }}
            //Autoplay={1000}
            //loop={true}
            //pagination={{ clickable: true }}
        >

            {
                _.map(data, (v,index)=>{
                    return  (
                        <SwiperSlide key={index}>
                            {
                                v?.method ?
                                    <a  onClick={()=>v.method()}>
                                        <div className="sl_img" style={{background: `url(${v.icon})`,cursor:'pointer'}}/>
                                    </a>
                                   :
                                    <Link to={v?.url}>
                                        <div className="sl_img" style={{background: `url(${v.icon})`}} />
                                        {/*<img src={v.icon} alt="Bitcoin" />*/}
                                    </Link>
                            }
                        </SwiperSlide>
                    )
                })
            }

            {/*<SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>
            <SwiperSlide>{slide}</SwiperSlide>*/}
        </Swiper>
    );
};

export default NewSWP;
