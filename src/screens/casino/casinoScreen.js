import React, {useEffect, useMemo, useState} from 'react';
import {sl2, w2} from '../../assets/img/images';
import {Footer, Header, NewSWP, ShowMore, SlotCard, Swp} from "../../components";
import "../../assets/styles/_select2.scss";
import "./casinoScreen.scss";
import {Actions, useTranslation} from "../../core";
import _ from "lodash"
import {useParams} from "react-router-dom";
import {CustomDropdown} from "../../components/dropdown/dropDown";
import {filter} from "../../assets/img/icons/icons";
import {useNav} from "../../core/hooks/useNav";
import {useCount} from "../../core/hooks/useCount";
import image_1 from "../../assets/img/slide/image_1.png";

import {
    arrow,
    betgames,
    betgames_img,
    evolution,
    evolution_img,
    vivogames,
    vivogames_img,
    evolution_gaming,
    vivo_gaming,
    bet_ames,
    pragmaticPlayCasino,
    EvolutionCasino,
    PragmaticPlayCasino,
    VivoCasino,
    BetGamesTvCasino
} from "../../assets/img/casino/images";

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

const CasinoScreen = () =>{
    const nav = useNav();
    const {count} = useCount()
    const {lang}=useParams();
    const {t,i18n} = useTranslation()
    const [page,setPage]=useState(1)
    const [providers,setProviders]=useState([])
    const [filters,setFilters]=useState([])
    const [list,setList]=useState([])
    const [selectedProvider,setSelectedProvider]=useState([])
    const [selectedFilters,setSelectedFilters] = useState([])
    const [providerFilter,setProviderFilter]=useState(false);
    const [filtersFilter,setFiltersFilter]=useState(false);
    const [searchText, setSearchText] = useState("")
    const [selected,setSelected] = useState([])
    const [showMobileFilter,setShowMobileFilter] = useState(false)
    const slideData =
        window.innerWidth > 767 ? {
            ru: [
                {id: 3, icon: desk_sl_ru, url: `/ru/slots`},
                {id: 5, icon: img_desk_wb_ru, url: `/ru/promotions/welcome_bonus`},
                {id: 4, icon: desk_sp_ru, url: `/ru/sport`},
            ],
            en: [
                {id: 3, icon: desk_sl_en, url: `/en/slots`},
                {id: 5, icon: img_desk_wb_en, url: `/en/promotions/welcome_bonus`},
                {id: 4, icon: desk_sp_en, url: `/en/sport`},
            ],
            es: [
                {id: 3, icon: desk_sl_en, url: `/es/slots`},
                {id: 5, icon: img_desk_wb_en, url: `/es/promotions/welcome_bonus`},
                {id: 4, icon: desk_sp_en, url: `/es/sport`},
            ]

        } : {
            ru: [
                {id: 3, icon: mob_sl_ru, url: `/ru/slots`},
                {id: 5, icon: img_mob_wb_ru, url: `/ru/promotions/welcome_bonus`},
                {id: 4, icon: mob_sp_ru, url: `/ru/sport`},
            ],
            en: [
                {id: 3, icon: mob_sl_en, url: `/en/slots`},
                {id: 5, icon: img_mob_wb_en, url: `/en/promotions/welcome_bonus`},
                {id: 4, icon: mob_sp_en, url: `/en/sport`},
            ],
            es: [
                {id: 3, icon: mob_sl_en, url: `/es/slots`},
                {id: 5, icon: img_mob_wb_en, url: `/es/promotions/welcome_bonus`},
                {id: 4, icon: mob_sp_en, url: `/es/sport`},
            ],

        }



    useEffect(()=>{
        loadSlotList()
        loadProvider()
    },[])

    useEffect(()=>{
        if(selectedProvider.length>0 || selectedFilters.length>0){
            //setPage(_.size(filteredSlotList)/20 + 1)
            setPage( 1)
        }else{
            setPage(1)
        }
    },[selectedProvider,selectedFilters,searchText])
    const homeClick = () => {
        setSelectedProvider(null);
        loadProvider();
    }
    const loadProvider = () => {
        Actions.Slot.list({webPageId:2}).then(response=> {
            if(response.status){
                setSelectedProvider(response.data.data.providers[0]);
            }
            setProviders(response.status?response.data.data.providers:[]);
            setFilters(response.status?response.data.data.filterGroups:[]);
        }).catch(reason => {})
    }

    const loadSlotList =()=>{
        Actions.Slot.listByPage({webPageId:2}).then((response)=>{
            setList(response.status?response.data.data:[])
        })
    }
    const filteredSlotList = useMemo(()=>{
        let filtered =list;
        if(searchText.trim().length>0){
            filtered =  _.filter(filtered,v=>v.name.toLowerCase().indexOf(searchText.toLowerCase())>-1)
        }
        if(_.size(selectedProvider)>0){

            filtered = _.filter(filtered, slot=>{
                return  _.intersection([slot.slotProviderId], _.map(selectedProvider,v=>v.id)).length>0
            })
        }
        if(_.size(selectedFilters)>0){
            filtered = _.filter(filtered, slot=>{
                return  _.intersection(_.map(slot.filterGroups,v=>v.id), _.map(selectedFilters,v=>v.id)).length>0
            })
        }

        return filtered;
    },[list,selectedProvider,selectedFilters,searchText])

    const getSlotList=()=> {
        return _.filter(filteredSlotList,(v,k)=>k<page*count());
    }


    return (
        <>
            <Header page={"casino"}/>

            <div className="container slider-container" style={{margin:'10px auto',borderRadius:'6px'}}>
                <NewSWP data={slideData[i18n.language]} />
            </div>

            <main className="main" style={{minHeight:'300px'}}>
                <div className="container">
                    <div className="casino-grid">
                        <div className="item-box" style={{cursor:'pointer'}} onClick={()=>window.open(`/${i18n.language}/playSlot?id=1106&gameId=105&gameType=casino`)}>
                            <img className="bg" src={EvolutionCasino}/>
                            <ul>
                                <li className="provider-logo">
                                    <div>Evolution Gaming</div>
                                    <div>400 Games</div>
                                </li>
                                <li className="arrow"><img src={arrow}/></li>
                            </ul>
                        </div>
                        <div className="item-box" style={{cursor:'pointer'}} onClick={()=>window.open(`/${i18n.language}/playSlot?id=11&gameId=e864e7d293376c830c58d7ddddf9983f8d852718&gameType=casino`)}>
                            <img className="bg" src={VivoCasino}/>
                            <ul>
                                <li className="provider-logo">
                                    <div>VivoGaming</div>
                                    <div>400 Games</div>
                                </li>
                                <li className="arrow"><img src={arrow}/></li>
                            </ul>
                        </div>
                        <div className="item-box" style={{cursor:'pointer'}} onClick={()=>window.open(`/${i18n.language}/playSlot?id=34&gameId=5687990baddbb934621c0b80b0f5f989f521d1a5&gameType=casino`)}>
                            <img className="bg" src={BetGamesTvCasino}/>
                            <ul>
                                <li className="provider-logo">
                                    <div>Betgames.tv</div>
                                    <div>400 Games</div>
                                </li>
                                <li className="arrow"><img src={arrow}/></li>
                            </ul>
                        </div>
                        <div className="item-box" style={{cursor:'pointer'}} onClick={()=>window.open(`/${i18n.language}/playSlot?id=2991&gameId=102&gameType=casino`)}>
                            <img className="bg" src={PragmaticPlayCasino}/>
                            <ul>
                                <li className="provider-logo">
                                    <div>PragmaticPlay Live</div>
                                    <div>400 Games</div>
                                </li>
                                <li className="arrow"><img src={arrow}/></li>
                            </ul>
                        </div>
                    </div>
                   {/* <div className="row">

                        <div className="col-12 d-flex align-items-center main-filter slot">
                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder={t("Search")}
                                    value={searchText}
                                    onChange={e=>setSearchText(e.target.value)}
                                />
                                <span className="btn-search"/>
                            </div>

                            <div className="select-label d-none d-lg-flex me-0" style={{paddingRight:'10px'}}>
                                <CustomDropdown label={t("Filters")} data={filters} onSelect={setSelectedFilters} open={filtersFilter}  setOpen={()=>{
                                    setFiltersFilter(!filtersFilter)
                                    setProviderFilter(false)
                                }}/>
                            </div>

                            <div className="select-label  d-lg-flex me-0  filter-label">
                                <CustomDropdown type={"filter"} label={t("Provider")} data={providers} onSelect={(e)=>{
                                    setSelectedProvider(e)
                                }} open={providerFilter} setOpen={()=>{
                                    setFiltersFilter(false)
                                    setProviderFilter(!providerFilter)
                                }}/>
                            </div>

                            <div className="filter-button d-lg-none" data-bs-toggle="modal"
                                 data-bs-target="#FilterModal" onClick={()=>setShowMobileFilter(!showMobileFilter)} >
                                <img src={filter} alt="Filter"/>
                            </div>
                        </div>

                        <div className={"custom-filter-mobile d-lg-none"}>
                            <CustomDropdown showFilter={true} type={'filter'}  filters={filters} setFilters={setSelectedFilters} label={t("Provider")} data={providers} onSelect={e=>{
                                setSelectedProvider(e)
                            }} open={showMobileFilter} setOpen={()=>{
                                setFiltersFilter(false)
                                setShowMobileFilter(!showMobileFilter)
                            }}/>
                        </div>

                        <div className="col-12 section-head">
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
                        </div>
                        <div className="col-12 d-flex align-items-center section-head">

                        </div>
                        {
                            selectedProvider?.name &&
                            <div className="col-12 d-flex align-items-center section-head">
                                <a href="#">
                                    <div className="section-heading">{selectedProvider?.name}</div>
                                </a>
                            </div>
                        }
                        <div className="col-12">
                            <div className="row casino-list">
                                <SlotCard  data={getSlotList()} />
                            </div>
                        </div>
                        {
                            <div className="col-12">
                                <ShowMore page={page} count={count()} length={filteredSlotList.length} setPage={setPage}/>
                            </div>
                        }
                    </div>*/}
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default CasinoScreen
