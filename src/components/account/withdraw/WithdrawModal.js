import React, {useEffect, useState} from "react";
import {Actions, useTranslation} from "../../../core";
import PLXModal from "../../modal/PLXModal";
import {Balance, SvgDot} from "../../index";

import {useOTP} from "../../../core/hooks/useOTP";
import _ from "lodash";
import './Withdraw.scss';

import SelectBox from "../../forms/select/NewSelect";
import {UseEvent} from "../../../core/hooks/useEvent";
import WithdrawIcon from "./icons/widthdraw-icon.png"
import WithdrawCopyIcon from "./icons/withdraw-copy.png"
import {useUser} from "../../../core/hooks/useUser"

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

const Withdraw = ({onClose})=>{
    const {i18n,t} = useTranslation();
    const {User} = useUser()
    const {otp, PHONE,EMAIL,CLOSE,ERROR,MULTI} = useOTP();
    const [withdraw,setWithdraw]=useState({amount:'', address:""});
    const [crypto,setCrypto]=useState('');
    const [selectedCurrency,setSelectedCurrency] = useState({ id:"BTC",title:"BTC",name:"Bitcoin"});
    const [exRate,setExRate]=useState(null)
    const [loader,setLoader]=useState(false)
    const [errors,setErrors]=useState([])
    const [disableBtn,setDisableBtn]= useState(null)
    const [feeError,setFeeError]=useState(null)
    const ev = UseEvent()

    useEffect(()=>{
        if(selectedCurrency){
            setExRate(null)
            getExchangeRate(selectedCurrency?.id)
        }
    },[selectedCurrency])

    //useEffect(()=>{
    //    setExRate(null)
    //    getExchangeRate(selectedCurrency?.id)
    //},[])



    const withdrawHandler=()=> {

        setErrors([])
        let error =  _.chain(withdraw).map((v,k)=>{
            return {key:k,value:v}
        }).filter(v=>!v.value).map(v=>v.key).value();

        if(error.length>0){
            setErrors([...error])
        }else{
            MULTI({
                send:"/os/v1/api/secured/otp/withdraw-coinspaid",
                title:t('Confirm Operation'),
                save:({code,sourceId})=>{
                    if(code){
                        Actions.User.withdraw_coinsPaid({data:{
                                otp:code,
                                amount:withdraw?.amount,
                                address:withdraw?.address,
                                sourceId:sourceId,
                                currency: selectedCurrency.id
                            },loader:"verifyOtp"}).then(response=>{
                            if(response.status){
                                CLOSE();
                                setSelectedCurrency(null);
                                window.pushEvent(t("The operation was performed successfully"),"success")
                            }else{

                                if(response?.error && response?.error?.resultCode === 2){
                                    CLOSE();
                                    ev.emit('notify', {
                                        show:true,
                                        text:'Oops, Unfortunately you can not withdraw money. Please verify your profile first.',
                                        type:'error',
                                        title:'Withdraw Error',
                                        button:{
                                            name:'Verify Account',
                                            url: `/${i18n.language}/account/verification`
                                        }
                                    })
                                }

                                ERROR({error:t("error")})
                            }
                        }).catch(e=>{
                            console.log("catch")
                            ERROR({error:t("error")})
                        })
                    }

                }
            })
            //if(withdraw?.amount > 0 && withdraw?.address !== ''){
            //}else{
            //    window.pushEvent('Please fill fields','error');
            //}
        }

    }

    const getExchangeRate = (currency)=>{
        Actions.Deposit.getCoinExchangeRate({currency:currency,loader:setLoader})
            .then(response=>{
                if(response.status){
                    setExRate(response.data.data)
                }else{
                    setExRate(null)
                    window.pushEvent(response.error?.message,"error")
                }
            })
    }
    const error=(key)=>{
        return errors.indexOf(key)>-1?"error":""
    }

    return (
        <div className="row withdraw-content" style={{}}>
            {
                <PLXModal
                    title={t("Withdraw")}
                  onClose={()=>onClose(false)}
                  contentStyle={{width:'400px',maxWidth:'100%' }}
                  dialogStyle={{width:"400px",maxWidth:'100%'}}
                  className={"withdraw-modal"}
                    preTitle={<img src={WithdrawIcon} width='26' height='24' style={{marginRight:'10px'}} />}
                >
                    <div style={{minWidth:'200px'}}>
                        <form onSubmit={e=>{
                            e.preventDefault()
                        }} className="personal-data">
                            <br/>

                            <div className="new-input-label" style={{marginBottom:'0px'}}>
                                <SelectBox
                                    data={currencyList}
                                    id={"crypto-currency"}
                                    placeholder={t("currency")}
                                    className="crypto-currency"
                                    value={selectedCurrency.id}
                                    onSelect={e => setSelectedCurrency(e)}
                                />
                                {
                                    exRate? <p style={{color:'#899194',fontSize:'12px',margin:'10px 5px 40px 5px'}}>
                                        {exRate?.exchangeRate?.rateFrom} {exRate.currency} ~ {exRate?.exchangeRate?.rateTo} {exRate.toCurrency}
                                    </p>:''

                                }

                            </div>
                            {
                                exRate? <>
                                        <div className={`new-input-label ${feeError ? 'withdraw-error' : ''}`} >
                                            <div className="input-box" >
                                                <input type={"number"} name="Amount" id="amount" value={withdraw?.amount} onChange={event => {
                                                    setWithdraw({...withdraw,amount:event.target.value});
                                                    setCrypto(event.target.value * exRate?.exchangeRate?.rateTo);
                                                    if(parseFloat((event.target.value * 1.02).toFixed(2))> User?.data?.accounts?.main?.amount*1 ){
                                                        setFeeError(t(`Insufficient balance: you can withdraw max {{max}}EUR (Fee {{fee}}EUR /{{percent}}%)`,{percent:2,max:(User?.data?.accounts?.main?.amount*1/1.02).toFixed(2),fee:(User?.data?.accounts?.main?.amount * 0.02).toFixed(2)}))
                                                        return;
                                                    }else if(event.target.value<20){
                                                        setFeeError(t(`You can withdraw min 20EUR (Fee 0.4EUR /2%)`))
                                                        return;
                                                    }else{
                                                        setFeeError(null)
                                                    }

                                                }}
                                                />
                                                <label htmlFor="amount">{t("EUR")}</label>
                                                <div className="withdraw_max" onClick={()=>{

                                                }}>{t('MAX')}</div>
                                                {/*{t("Money")}*/}
                                            </div>
                                            <p style={{color:'#899194',fontSize:'0.8rem',margin:'4px 3px'}}> {feeError?feeError:t(`MIN - {{min}} EUR`,{min:exRate?.exchangeRate?.minAmountFrom})}  </p>
                                        </div>


                                        <div className={`new-input-label ${error("amount")}  ` }  >
                                            <div className="input-box">
                                                <input type={"number"} name="Amount" id="amount" value={crypto} onChange={event => {
                                                    setCrypto(event.target.value);
                                                    setWithdraw({...withdraw,amount: (event.target.value / exRate?.exchangeRate?.rateTo)});
                                                }}
                                                />
                                                <label htmlFor="amount" >{ exRate.toCurrency}</label>
                                            </div>
                                        </div>

                                        <div className={`new-input-label`}  >
                                            <div className="input-box" style={{position:'relative'}}>
                                                <input type="text" name="account" id="account"
                                                       value={withdraw?.address} onChange={event => {

                                                            setWithdraw({...withdraw,address:event.target.value})
                                                       }}
                                                />
                                                <label htmlFor="account">{t("Address")}</label>
                                                <img src={WithdrawCopyIcon} width='20' style={{position:'absolute',right:'10px',top:'15px'}}/>

                                            </div>

                                        </div>
                                        <div className="new-input-label withdraw-button-container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'3rem',marginBottom:"0px !important"}} >

                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                <div style={{
                                                    height: '24px',
                                                    fontSize: '1rem',
                                                    color:'white'
                                                }}>{(withdraw.amount * 1.02).toFixed(2)} {t("EUR")}</div>
                                                <div
                                                    style={{
                                                        height: '24px',
                                                        fontSize: '0.8rem',
                                                        color:'#A5AAAC'
                                                    }}
                                                >{t("Fee")}: {(withdraw.amount * 0.02).toFixed(2)} {t("EUR")} (2%)</div>
                                            </div>

                                            <button  onClick={()=> feeError? console.log():withdrawHandler()} className={`btn-primary withdraw-btn ${feeError? 'disabled':''}`}
                                                     id="withdraw-tab" type="submit" style={{width:"100%",maxWidth:"100%",marginTop:0}}>
                                                <span>{t("Withdraw")}</span>
                                            </button>
                                        </div>
                                    </>:
                                    <div style={{height:"150px",position:'relative'}}>
                                        {loader && <div className="loader-wrap"><SvgDot/></div>}
                                    </div>
                            }

                        </form>
                    </div>
                </PLXModal>

            }
        </div>

    )

}
export default Withdraw;
