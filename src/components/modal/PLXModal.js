import React, {useEffect, useState} from "react";
import {close} from "../../assets/img/icons/icons";
import PropTypes from "prop-types";

const PLXModal = ({children,title,footer,onClickBackDrop,closeButton,onClose,contentStyle,dialogStyle,className,parentIdName,banner})=>{
    const [devWidth,setDevWidth]=useState(false)
    const [st,setSt]=useState({
        ...dialogStyle,
        width: `calc(${devWidth? banner?.width:'0px'} + ${dialogStyle?.width})`
    })
    useEffect(()=>{
        calcStyle();
    },[])

    //let timeout = '';
    const calcStyle=()=>{
        if(window.innerWidth > 700 && banner?.width){
            //clearTimeout(timeout)
            let wid = 500 - parseInt(banner?.width);
            setSt({
                ...dialogStyle,
                width: `calc(${banner?.width? banner?.width:'0px'} + ${dialogStyle?.width ?dialogStyle?.width:'0px'})`,
                maxWidth:`calc(500px + ${wid+'px'})`
            })

            setDevWidth(true);
        }else{
            setSt({
                ...dialogStyle
            })
        }
    }

    //window.addEventListener('resize', calcStyle)

    return  (

            <div id={parentIdName} className="custom-modal" onClick={()=>onClickBackDrop()}>
                <div className={`modal-dialog modal-dialog-centered auth-modal ${className}`} style={st}>
                    <div className={`${devWidth?'has_banner':''}`}>
                        {
                            devWidth?<div className="banner_box" style={{minWidth:`${banner?.width}`,background:`url(${banner?.url})`,backgroundColor:"#1d2438"}}/>:''
                        }

                        <div className="modal-cont">
                            <div className="modal-content" style={{...contentStyle,minWidth:contentStyle?.maxWidth}}>
                                <div className="modal-head mb-0">
                                    {
                                        closeButton && <button className="close" data-bs-dismiss="modal" onClick={()=>onClose()}>
                                            <img src={close} alt="Close modal"/>
                                        </button>
                                    }
                                    <div className="modal-title">{title}</div>
                                </div>
                                { children }
                            </div>
                            <div className={'modal-footer'}>
                                { footer }
                            </div>
                        </div>
                    </div>

                </div>
            </div>


    )
}
PLXModal.propTypes={
    title:PropTypes.string,
    closeButton:PropTypes.bool,
    onClickBackDrop:PropTypes.func,
    onClose:PropTypes.func,
    contentStyle:PropTypes.object
}
PLXModal.defaultProps={
    title:"",
    closeButton:true,
    onClickBackDrop:()=>console.log("backdrop click"),
    onClose:()=>console.log("onClose"),
    contentStyle:{}
}

export default PLXModal;
