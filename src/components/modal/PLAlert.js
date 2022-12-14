import {close} from "../../assets/img/icons/icons";
import PropTypes from "prop-types";
import './PLAlert.scss';
import {useEffect} from "react";



const PLAlert = ({data,children,title,footer,onClickBackDrop,closeButton,onClose,contentStyle,dialogStyle,className})=>{

    useEffect(() => {
        const keyDownHandler = event => {
            //console.log('User pressed: ', event.key);
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose()
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        // 👇️ clean up event listener
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return  (
        <div className="custom-modal" onClick={()=>onClickBackDrop()}>
            <div className={`modal-dialog modal-dialog-centered pl_alert ${className}`} style={{...dialogStyle}}>
                <div className="modal-content" style={{...contentStyle}}>
                    <div className="modal-head mb-0">
                        {
                            closeButton && <button className="close" data-bs-dismiss="modal" onClick={()=>onClose()}>
                                <img src={close} alt="Close modal"/>
                            </button>
                        }
                        <div className="modal-title">{title}</div>
                    </div>
                    { children }

                    <div className={'modal-footer'}>
                        {
                            data?.button? <a href={data?.button?.url} className="link">{data?.button?.name}</a> : footer
                        }
                    </div>
                </div>

            </div>
        </div>
    )

}

PLAlert.propTypes={
    title:PropTypes.string,
    closeButton:PropTypes.bool,
    onClickBackDrop:PropTypes.func,
    onClose:PropTypes.func,
    contentStyle:PropTypes.object
}
PLAlert.defaultProps={
    title:"",
    closeButton:true,
    onClickBackDrop:()=>{},
    onClose:()=>{},
    contentStyle:{}
}

export default PLAlert;
