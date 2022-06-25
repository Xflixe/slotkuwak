import React, {useEffect, useState} from "react";
import {close} from "../../assets/img/icons/icons";
import PropTypes from "prop-types";
import './NewModal.scss';

const NewModal = ({children,title,footer,onClickBackDrop,closeButton,onClose,contentStyle,dialogStyle,className,parentIdName,banner})=>{

    return  (

            <div id={parentIdName} className="new-custom-modal" onClick={()=>onClickBackDrop()}>
                <div className={`wrapper`} >
                    {
                        banner?.url?<div className="banner_box" style={{minWidth:`${banner?.width}`,background:`url(${banner?.url})`,backgroundColor:"#1d2438"}}/>:''
                    }
                    <div className="modal-box" style={contentStyle}>
                        <div className="modal-head">
                            {
                                closeButton && <button className="close" data-bs-dismiss="modal" onClick={()=>onClose()}>
                                    <img src={close} alt="Close modal"/>
                                </button>
                            }
                            <div className="modal-title">{title}</div>
                        </div>
                        {
                            banner?.mobUrl !== undefined? <div className="banner_box_mobile" style={{background:`url(${banner?.url})`}}/>:''
                        }
                        <div className="content">
                            { children }
                        </div>
                    </div>

                    {/*<div className={`modal-main-wrap ${banner?.url?'has_banner':''}`}>
                        {
                            banner?.url?<div className="banner_box" style={{minWidth:`${banner?.width}`,background:`url(${banner?.url})`,backgroundColor:"#1d2438"}}/>:''
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
                                {
                                    banner?.mobUrl !== undefined? <div className="banner_box_mobile" style={{background:`url(${banner?.url})`}}/>:''
                                }
                                { children }
                            </div>
                            <div className={'modal-footer'}>
                                { footer }
                            </div>
                        </div>
                    </div>*/}

                </div>
            </div>


    )
}
NewModal.propTypes={
    title:PropTypes.string,
    closeButton:PropTypes.bool,
    onClickBackDrop:PropTypes.func,
    onClose:PropTypes.func,
    contentStyle:PropTypes.object
}
NewModal.defaultProps={
    title:"",
    closeButton:true,
    onClickBackDrop:()=>console.log("backdrop click"),
    onClose:()=>console.log("onClose"),
    contentStyle:{}
}

export default NewModal;
