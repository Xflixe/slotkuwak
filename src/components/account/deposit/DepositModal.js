import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import {logoM, logoM_jpg} from "../../../assets/img/images"
import './Deposit.scss';
import {QRCode} from "react-qrcode-logo";
import {NewModal, SvgDot} from "../../index";
import SelectBox from "../../forms/select/NewSelect";
import {copy} from "../../../assets/img/icons/icons"
import lendingBanner from "../../../assets/img/lending.jpg";
import {useUser} from "../../../core/hooks/useUser"
import {UseEvent} from "../../../core/hooks/useEvent"
window.reSendInterval=null;

const currencyList = [
    { id:"BTC",title:"BTC",name:"Bitcoin"},
    { id:"LTC",title:"LTC",name:"Litecoin"},
    { id:"ETH",title:"ETH",name:"Ethereum"},
    { id:"BNB",title:"BNB",name:"Binance Coin"},
    { id:"BUSD",title:"BUSD",name:"Binance USD"},
    { id:"USDTE",title:"USDTE",name:"Tether USD ERC20"},
    { id:"USDTT",title:"USDTT",name:"Tether USD TRC20"},
    { id:"DOGE",title:"DOGE",name:"Dogecoin"},
    { id:"NEO",title:"NEO",name:"Neo"},
    { id:"ADA",title:"ADA",name:"Cardano"},
    { id:"TRX",title:"TRX",name:"TRON"},
    { id:"USDC",title:"USDC",name:"USD Coin"},
    { id:"USDT",title:"USDT",name:"Tether* USD"},
    //{ id:"XRP",title:"XRP",name:"Ripple"},
    //{ id:"BCH",title:"BCH",name:"Bitcoin cash"},
    //{ id:"ERC20",title:"ERC20",name:"ERC20"},
    //{ id:"EURS",title:"EURS",name:"STASIS EURS"},
    //{ id:"XED",title:"XED",name:"Exeedme ERC20 tok"},
    //{ id:"DAI",title:"DAI",name:"Dai ERC20 Stablec"},
    //{ id:"MRX",title:"MRX",name:"Metrix Coin"},
    //{ id:"WBTC",title:"WBTC",name:"Wrapped Bitcoin"},
    //{ id:"CPD",title:"CPD",name:"CoinsPaid token"},
]


const DepositModal = ({onClose})=>{
    const {t} = useTranslation();
    const ev = UseEvent();
    const [loader,setLoader]=useState(false)
    const [qr,setQr] = useState(true)
    const [qrData,setQrData] = useState({})
    const [selectedCurrency,setSelectedCurrency] = useState({id:"BTC",title:"BTC",name:"Bitcoin"});
    const [copyText,setCopyText] = useState(false);
    const [crypto,setCrypto]=useState('');
    const [deposit,setDeposit]=useState({amount:'', address:""});
    const {User,checkSession} = useUser();
    const [local,setLocal] = useState(true)
    useEffect(()=>{
        if(qr){
            getCurrencyCourse();
            setQrData({...qrData,url:''})
        }
    },[selectedCurrency,qr])

    const getCurrencyCourse=()=>{
        //Actions.Deposit.getCoinRate({currency:selectedCurrency,loader:setLoader})
        Actions.Deposit.getCoinSpaidOrder({currency:selectedCurrency.id,loader:setLoader})
            .then(response=>{
                if(response.status){
                    setQrData(response?.data?.data);
                }else{
                    window.pushEvent(response.error?.message,"error")
                }
            }).catch((reason)=>{
        })
    }


    return local && (
            <NewModal title={t("Deposit QR")} onClose={()=>onClose(false)} className={'deposit-modal-new'}
                  dialogStyle={{width:'350px'}}
                  contentStyle={{width:'350px'}}
                  banner={{
                      width:'300px',
                      url:lendingBanner,
                      //mobUrl:lendingMobBanner
                  }}
            >

                <SelectBox
                    data={currencyList}
                    id={"crypto-currency"}
                    placeholder={t("Currency")}
                    className="crypto-currency"
                    value={selectedCurrency.id}
                    onSelect={e => {
                        checkSession().then(response=>{
                            if(response.status){
                                setSelectedCurrency(e)
                            }else{
                                onClose()
                                ev.emit('signIn', {
                                    show:true,
                                    onSuccess:(e)=>{
                                        console.log("success login")
                                        //setLocal(true)
                                    }
                                })
                            }
                        })

                    }}
                />
                <div className="dep-wrap" >
                {
                    (qrData?.url) ? (
                        <>
                            <p style={{color:'#8594c1',fontSize:'12px',margin:'4px 3px'}}>{qrData?.exchangeRate?.rateFrom} {qrData.currency}  ~ {qrData?.exchangeRate?.rateTo} {qrData.toCurrency}</p>
                            <p style={{color:'#8594c1',fontSize:'12px',margin:'4px 3px'}}>{t("Min deposit")}:  {qrData?.exchangeRate?.minAmountFrom} {qrData.currency}</p>

                            <div className="new-input-label">
                                <div className="input-box">
                                    <input type={"number"} name="Amount" id="amount" value={crypto} onChange={event => {
                                        setCrypto(event.target.value);
                                        setDeposit({deposit,amount: (event.target.value / qrData?.exchangeRate?.rateTo)});
                                    }}
                                    />
                                    <label htmlFor="amount">{qrData.toCurrency}</label>
                                </div>
                            </div>

                            <div className="new-input-label">
                                <div className="input-box">
                                    <input type={"number"} name="Amount" id="amount" value={deposit?.amount} onChange={event => {
                                        setDeposit({...deposit,amount:event.target.value});
                                        setCrypto(event.target.value * qrData?.exchangeRate?.rateTo);
                                    }}
                                    />
                                    <label htmlFor="amount">{qrData.currency}</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12" style={{marginBottom:'0'}}>
                                    <div  className={`input-label-border qr-address`}>
                                        <input  value={qrData?.url} type="text" name="name" id="qrUrl"/>
                                        <label htmlFor="qrUrl">{selectedCurrency.name+' '+t("Address")}</label>
                                        <i onClick={()=> {
                                            window.navigator.clipboard.writeText(qrData?.url);
                                            setCopyText(true);
                                            setTimeout(function(){
                                                setCopyText(false)
                                            },3000);
                                        }}><img src={copy}/></i>
                                        <span data-show={copyText}>{t("copied")}</span>

                                    </div>
                                </div>
                            </div>
                            <br/>
                            <a href={qr?.url} target={"_blank"} style={{textAlign:'center',borderRadius:'3px',padding:'5px 0 10px'}}>
                                <QRCode value={qrData?.url} fgColor={"black"} size={150} logoImage={logoM_jpg} />
                            </a>

                        </>
                    ):(
                        <div style={{height:"150px"}}>
                            {loader && <div className="loader-wrap"><SvgDot/></div>}
                        </div>
                    )
                }
            </div>

        </NewModal>

    )



}
export default DepositModal;




