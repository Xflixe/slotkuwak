import React, {useEffect, useState} from 'react';
import { sl2} from '../../assets/img/images';
import { Footer, Header,SlotCard, Swp} from "../../components";

import {filter} from "../../assets/img/icons/icons"
import "../../assets/styles/_select2.scss"
import {CustomDropdown} from "../../components/dropdown/dropDown";
import {Actions} from "../../core";
import _ from "lodash"

const SlotsScreen = () =>{
    const [show,setShow]=useState(20);
    const [providers,setProviders]=useState([])
    const [list,setList]=useState([])


    useEffect(()=>{
        loadProvider();
    },[])

    const loadProvider =   () => {
        Actions.Slot.list().then(response=>setProviders(response.status?response.data.data:[]))
    }
    const loadSlots =   (id) => {
        Actions.Slot.listByProvider(id).then(response=>setList(response.status?response.data.data:[]))
    }

    return (
        <>
            <Header/>

            <div className="container slider">
                <Swp count={3}  data={[
                    {id:1, icon:sl2 },
                    {id:2, icon:sl2 },
                    {id:3, icon:sl2 },
                    {id:4, icon:sl2 },
                    {id:5, icon:sl2 },
                    {id:6, icon:sl2 },
                    {id:7, icon:sl2 }
                ]}/>
            </div>

            <main>
                <div className="container">

                    <div className="row">
                        <div className="col-12 d-flex align-items-center main-filter slot">
                            <div className="search">
                                <input
                                    type="text"
                                    name="search"
                                    className="search"
                                    placeholder="Search"
                                />
                                <span className="btn-search"></span>
                            </div>
                            <div className="select-label d-none d-lg-flex me-0">
                                <CustomDropdown label={"Provider"} data={[
                                    { id:1, name:"Evolution Gaming",checked:false},
                                    { id:2, name:"Pragmatic Play LC",checked:false},
                                    { id:3, name:"Pragmatic Play LC",checked:false},
                                    { id:4, name:"Evoplay Entertai...",checked:false},
                                    { id:5, name:"BetGames TV",checked:false},
                                    { id:6, name:"Authentic",checked:false},
                                    { id:7, name:"Playtech",checked:false},
                                ]}/>
                            </div>
                            <div className="filter-button d-lg-none" data-bs-toggle="modal"
                                 data-bs-target="#FilterModal">
                                <img src={filter} alt="Filter"/>
                            </div>
                        </div>

                        <div className="col-12 d-flex align-items-center section-head">
                            {
                                _.map(providers,provider=><div style={{marginLeft:"20px",color:"white"}}  key={provider.id} onClick={()=>loadSlots(provider.id)}>{provider.name}</div>)
                            }
                        </div>
                        <div className="col-12 d-flex align-items-center section-head">
                            <a href="#">
                                <div className="section-heading">all Provider</div>
                            </a>
                        </div>

                        <div className="col-12">
                            <div className="row casino-list">
                                <SlotCard  data={list} />
                            </div>
                        </div>

                        {
                            show !== list.length&&<div className="col-12">
                                <div className="show-more">
                                    <div className="show-info">You’ve viewed {show} of {list.length} games</div>
                                    <div className="show-more-btn" onClick={()=>setShow(list.length)}>show more</div>
                                </div>
                            </div>
                        }


                    </div>


                </div>
            </main>

            <Footer/>

        </>
    )
}

export default SlotsScreen