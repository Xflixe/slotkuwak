import React, {useEffect, useMemo, useRef, useState} from 'react';

import {Footer, Header, NewSWP, ShowMore, SlotCard, Swp, PromoList} from "../../components";
import "../../assets/styles/_select2.scss"
import "./slotsScreen.scss"
import {Actions, useTranslation} from "../../core";
import _ from "lodash"
import {useCount} from "../../core/hooks/useCount";
import {
    icon61,
    icon70,
    icon71,
    icon55,
    icon57,
    icon72,
    icon73,
    icon74,
    icon59,
    icon60,
    icon80,
    icon76,
    icon47,
    icon79,
    icon58,
    icon65,
    icon49,
    icon86,
    icon77,
    icon56,
    icon63,
    icon90,
    icon8,
    icon123,
    icon89,
    icon50
} from "../../assets/img/slot-nav/icon";



import {useParams} from "react-router-dom";

import img_desk_wb_en from "../../assets/img/slide/wb_en.png";
import img_desk_wb_ru from "../../assets/img/slide/wb_ru.png";
import desk_casino_en from "../../assets/img/slide/casino/desktop/3en.png";
import desk_casino_ru from "../../assets/img/slide/casino/desktop/3ru.png";
import desk_sl_en from "../../assets/img/slide/slots/desktop/2en.png";
import desk_sl_ru from "../../assets/img/slide/slots/desktop/2ru.png";
import desk_sp_en from "../../assets/img/slide/sport/desktop/2en.png";
import desk_sp_ru from "../../assets/img/slide/sport/desktop/2ru.png";


import img_mob_wb_ru from "../../assets/img/slide/wb_mob_ru.png";
import img_mob_wb_en from "../../assets/img/slide/wb_mob_en.png";
import mob_casino_en from "../../assets/img/slide/casino/mobile/3en.png";
import mob_casino_ru from "../../assets/img/slide/casino/mobile/3ru.png";
import mob_sl_en from "../../assets/img/slide/slots/mobile/2en.png";
import mob_sl_ru from "../../assets/img/slide/slots/mobile/2ru.png";
import mob_sp_en from "../../assets/img/slide/sport/mobile/2en.png";
import mob_sp_ru from "../../assets/img/slide/sport/mobile/2ru.png";
import {useNavigation} from "../../core/hooks/useNavigation";
import {useUser} from "../../core/hooks/useUser";

import banner1web from "../../assets/img/slide/main/w/banner1.png";
import banner1mob from "../../assets/img/slide/main/m/banner1.png";
import {UseEvent} from "../../core/hooks/useEvent"
const slIcon = {
    '61':icon61,
    '70':icon70,
    '71':icon71,
    '55':icon55,
    '57':icon57,
    '72':icon72,
    '73':icon73,
    '74':icon74,
    '59':icon59,
    '60':icon60,
    '80':icon80,
    '76':icon76,
    '47':icon47,
    '79':icon79,
    '58':icon58,
    '65':icon65,
    '49':icon49,
    '86':icon86,
    '77':icon77,
    '56':icon56,
    '63':icon63,
    '90':icon90,
    '8':icon8,
    '123':icon123,
    '89':icon89,
    '50':icon50
}

const SlotsScreen = () =>{
    const {t,i18n} = useTranslation()
    const {count} = useCount()
    const ev = UseEvent();
    const {User,checkSession} = useUser();
    const [page,setPage]=useState(1)
    const [providers,setProviders]=useState([])
    const [filters,setFilters]=useState([])
    const [searchText, setSearchText] = useState("")
    const [list,setList]=useState([])
    const [selectedFilters,setSelectedFilters] = useState([])
    const [slMobNav,setSlMobNav] = useState(false)
    const [selectedProvider,setSelectedProvider]=useState({name:'All Providers'})
    const nav  = useNavigation();
    const [freeSpin, setFreeSpin] = useState(null);

    let params = useParams();
    const [tab,setTab] = useState('all')

    const slideData = window.innerWidth > 767 ? {
            ru: [
                {id:1, icon:banner1web, method:()=>slide1Action()},
                {id: 2, icon: desk_casino_ru, url: `/ru/casino`},
                {id: 4, icon: desk_sp_ru, url: `/ru/sport`},
                {id: 5, icon: img_desk_wb_ru, url: `/ru/promotions/welcome_bonus`},
            ],
            en: [
                {id:1, icon:banner1web, method:()=>slide1Action()},
                {id: 2, icon: desk_casino_en, url: `/en/casino`},
                {id: 4, icon: desk_sp_en, url: `/en/sport`},
                {id: 5, icon: img_desk_wb_en, url: `/en/promotions/welcome_bonus`},
            ],
            es: [
                {id:1, icon:banner1web, method:()=>slide1Action()},
                {id: 2, icon: desk_casino_en, url: `/es/casino`},
                {id: 4, icon: desk_sp_en, url: `/es/sport`},
                {id: 5, icon: img_desk_wb_en, url: `/es/promotions/welcome_bonus`},
            ]

        } : {
            ru: [
                {id:1, icon:banner1mob, method:()=>slide1Action()},
                {id: 2, icon: mob_casino_ru, url: `/ru/casino`},
                {id: 4, icon: mob_sp_ru, url: `/ru/sport`},
                {id: 5, icon: img_mob_wb_ru, url: `/ru/promotions/welcome_bonus`},
            ],
            en: [
                {id:1, icon:banner1mob, method:()=>slide1Action()},
                {id: 2, icon: mob_casino_en, url: `/en/casino`},
                {id: 4, icon: mob_sp_en, url: `/en/sport`},
                {id: 5, icon: img_mob_wb_en, url: `/en/promotions/welcome_bonus`},
            ],
            es: [
                {id:1, icon:banner1mob, method:()=>slide1Action()},
                {id: 2, icon: mob_casino_en, url: `/es/casino`},
                {id: 4, icon: mob_sp_en, url: `/es/sport`},
                {id: 5, icon: img_mob_wb_en, url: `/es/promotions/welcome_bonus`},
            ],

        }

    useEffect(()=>{
        if(selectedProvider?.length>0 || selectedFilters?.length>0){
            //setPage(_.size(filteredSlotList)/20 + 1)
            setPage(1)
        }else{
            setPage(1)
        }
    },[selectedProvider,selectedFilters,searchText])

    useEffect(()=>{
        setSelectedProvider(_.filter(providers,v=>v?.checked))
    },[providers])
    const slide1Action = () =>{
        checkSession().then(response=>{
            if(response.status){
                ev.emit('depositModal', true)
            }else{
                ev.emit('signUp', {
                    show:true,
                    onSuccess:function (e){
                        console.log("success login",e)
                    }
                })
            }
        })
    }
    const filteredSlotList = useMemo(()=>{
        let filtered =list;
        if(searchText.trim()?.length>0){
            filtered =  _.filter(filtered,v=>v.name.toLowerCase().indexOf(searchText.toLowerCase())>-1)
        }
        if(_.size(selectedProvider)>0){

            filtered = _.filter(filtered, slot=>{
                return  _.intersection([slot.slotProviderId], _.map(selectedProvider,v=>v.id))?.length>0
            })
        }
        if(_.size(selectedFilters)>0){
            filtered = _.filter(filtered, slot=>{
                return  _.intersection(_.map(slot.filterGroups,v=>v.id), _.map(selectedFilters,v=>v.id))?.length>0
            })
        }

        return filtered;
    },[list,selectedProvider,selectedFilters,searchText])

    useEffect(()=>{
        if(filteredSlotList){
            let counter = 1;
            setPage(counter)
            window.addEventListener("scroll",e=>{
                if(page * count()<filteredSlotList.length){
                    counter++;
                    setPage(counter)
                }
            })
        }

    },[filteredSlotList])

    const loadProvider = () => {
        Actions.Slot.list({webPageId:1}).then(response=> {
            //if(response.status){
            //    setSelectedProvider(response.data.data.providers[0]);
            //}
            setProviders(response.status?response.data.data.providers:[]);
            setFilters(response.status?response.data.data.filterGroups:[]);
        }).catch(reason => {})
    }
    const loadSlotList =()=>{
        Actions.Slot.listByPage(1).then((response)=>{
            setList(response.status?response.data.data:[])
        })
    }
    // const loadSlots = (id) => {
    //     Actions.Slot.listByProvider(id,"1").then(response=>setList(response.status?response.data.data:[]))
    // }
    const getSlotList=()=> {
        return _.filter(filteredSlotList,(v,k)=>k<page*count());
    }
    const getFreeSpin = ()=>{
        Actions.User.getFreeSpin().then(response=>{
            if(response.status){
                setFreeSpin(response.data.data)
            }
        })
    }

    useEffect(()=>{
        loadProvider();
        loadSlotList();
        getFreeSpin();
    },[])

    useEffect(()=>{
        if(params?.params && params?.params === "freespin"){
            setTab('freeSpin')
        }
    },[params])

    const [searchC,setSearchC] = useState(false)
    const searchClass =()=>{
        if(window.innerWidth < 992){
            setSearchC(!searchC)
        }
    }
    return (
        <>
            <Header page={"slots"}/>

            <div className="container slider-container" style={{margin:'10px auto',borderRadius:'6px'}}>
                <NewSWP data={slideData[i18n.language]} />
            </div>


            <main className="main" style={{minHeight:'300px'}}>
                <div className="container wrapper">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center slot-new-filter">
                            <button className={`${tab==="all"?'active':''}`} onClick={()=>{
                                setTab('all')
                                setProviders([..._.map(providers,(v,k)=>{
                                    v.checked=false;
                                    return v;
                                })])
                            }}>{t("All")}</button>
                            {User.isLogged && _.size(freeSpin)>0 && <button className={`${tab==="freeSpin"?'active':''}`} data-new="new" onClick={()=>setTab('freeSpin')}>{t("Free Spin")}</button>}
                            {/*<button onClick={()=>setTab('favourite')}>{t("Favourite")}</button>*/}
                            {/*<button onClick={()=>setTab('trending')}>{t("Trending")}</button>*/}
                            {/*<button onClick={()=>setTab('like')}>{t("Most Liked")}</button>*/}
                            {/*<button onClick={()=>setTab('game')}>{t("Table Game")}</button>*/}
                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className={`search ${searchC?'active':''}`}
                                    placeholder={t("Search")}
                                    value={searchText}
                                    onChange={e=>{
                                        setSearchText(e.target.value)
                                        setTab('search')
                                    }}
                                />
                                <div className="search_clear" onClick={()=>{
                                    setSearchText('');
                                    setSearchC(!searchC);
                                }}>X</div>
                                <span className="btn-search" onClick={()=> searchClass()}/>
                            </div>
                        </div>
                        {
                            tab === "freeSpin"? '':(
                                <>
                                    <div className={`col-12 d-flex align-items-center slot-nav ${slMobNav?'dropdown':''}`}>
                                        <ul>
                                            {
                                                //console.log(providers)
                                                _.map(providers,(p,index)=>{
                                                    return  <li key={index} className={`${p.checked?'active':""}`} onClick={()=>{
                                                        setProviders([..._.map(providers,(v,k)=>{
                                                            v.checked=(k===index);
                                                            return v;
                                                        })])
                                                    }}><img src={slIcon[p.id]}/> {p.name}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className={`col-12 d-flex align-items-center slot-nav-mob ${slMobNav?'active':''} `}>
                                        <button onClick={()=>{
                                            setSlMobNav(!slMobNav)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>
                                        </button>
                                    </div>
                                </>
                            )
                        }

                        {/*<div className={`col-12 d-flex align-items-center slot-nav-mob ${slMobNav?'active':'hide'} `}>
                            <ul>
                                {
                                    _.map(providers,(p,index)=>{
                                        return  <li key={index} className={`${p.checked?'active':""}`} onClick={()=>{
                                            setProviders([..._.map(providers,(v,k)=>{
                                                v.checked=(k===index);
                                                return v;
                                            })])
                                            //setSlMobNav(!slMobNav)
                                        }}><img src={slIcon[p.id]}/> {p.name}</li>
                                    })
                                }
                            </ul>
                            <button onClick={()=>{
                                setSlMobNav(!slMobNav)
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"/></svg>
                            </button>
                        </div>*/}
                    </div>
                    <div className="row">
                        {/*<div className="col-12 d-flex align-items-center main-filter slot">
                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder={t("Search")}
                                    value={searchText}
                                    onChange={e=>setSearchText(e.target.value)}
                                />
                                <span className="btn-search"></span>
                            </div>
                            <div className="select-label d-none d-lg-flex me-0" style={{paddingRight:'10px'}}>
                                <CustomDropdown label={t("Filters")} data={filters} onSelect={setSelectedFilters} open={filtersFilter}  setOpen={()=>{
                                    setFiltersFilter(!filtersFilter)
                                    setProviderFilter(false)
                                }}/>
                            </div>

                            <div className="select-label  d-lg-flex me-0  filter-label">
                                <CustomDropdown type={"filter"} label={t("Provider")} data={providers} onSelect={setSelectedProvider} open={providerFilter} setOpen={()=>{
                                    setFiltersFilter(false)
                                    setProviderFilter(!providerFilter)
                                }}/>
                            </div>
                        </div>*/}

                        {/*<div className={"custom-filter-mobile d-lg-none"}>
                            <CustomDropdown label={t("Provider")}  filters={filters} setFilters={setSelectedFilters} showFilter={true} data={providers} onSelect={setSelected} open={showMobileFilter} setOpen={()=>{
                                setShowMobileFilter(!showMobileFilter)
                            }} />
                        </div>*/}
                        {/*<div className="col-12 section-head">
                            <div className="sl_nav">
                                <div className="sl_item sl_home" onClick={()=> homeClick()}/>
                                {
                                    _.map(providers,provider=><div className="sl_item" key={provider.id} onClick={()=>{
                                        setSelectedProvider(provider);
                                        setPage(1)
                                    }}>{provider.name}</div>)
                                }
                            </div>
                            <div className="sl_filter">
                                <ul>
                                    {
                                        _.map(filters,filter => <li key={filter.id} onClick={()=>getFilteredSlots(filter.id)}>{filter.name}  <i>{filter?.options?.itemsCount}</i></li>)
                                    }
                                </ul>
                            </div>
                        </div>*/}
                        <div className="col-12 d-flex align-items-center section-head"></div>
                        {
                            selectedProvider?.name &&
                            <div className="col-12 d-flex align-items-center section-head">
                                <a href="#">
                                    <div className="section-heading">{selectedProvider?.name}</div>
                                </a>
                            </div>
                        }
                        {
                            tab === "freeSpin"? (
                              <PromoList data={freeSpin}/>
                            ):(
                                <>
                                    <div className="col-12">
                                        <div className="row casino-list">
                                            <SlotCard  data={getSlotList()} />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <ShowMore page={page} count={count()} length={filteredSlotList?.length} setPage={setPage}/>
                                    </div>
                                </>
                            )
                        }


                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default SlotsScreen
